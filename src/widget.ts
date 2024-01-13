import './widget.css';
import * as M from './molecube.js';
import {
  Mat4,
  Vec4,
  addv4,
  divv4,
  dotv4,
  mulmm4,
  mulmv4,
  mulv4,
  normv4,
  origv4,
  pt4,
  rotxm4,
  rotym4,
  subv4,
  transm4,
} from './geom.js';
import { clamp, expected } from './utils.js';

const palette: Record<number, string> = {
  [M.Cb]: '#00f',
  [M.Cc]: '#0ff',
  [M.Cg]: '#080',
  [M.Ck]: '#000',
  [M.Co]: '#f80',
  [M.Cp]: '#f0f',
  [M.Cr]: '#f00',
  [M.Cw]: '#fff',
  [M.Cy]: '#ff0',
  [M.xx]: '#888',
};

type Camera = {
  dist: number;
  az: number;
  alt: number;
};

type SceneSphere = { t: 'sphere'; at: Vec4; radius: number; color: number | undefined };
type SceneLine = { t: 'line'; start: Vec4; end: Vec4; color: number | undefined };
type SceneObject = SceneSphere | SceneLine;

function clipScene(input: SceneObject[]): SceneObject[] {
  const res: SceneObject[] = [];
  const spheres: SceneSphere[] = [];
  const lines: SceneLine[] = [];
  for (const obj of input) {
    switch (obj.t) {
      case 'sphere':
        res.push(obj);
        spheres.push(obj);
        break;
      case 'line':
        lines.push(obj);
        break;
    }
  }
  for (const line of lines) {
    let clipped: SceneLine[] = [line];
    for (const sphere of spheres) {
      clipped = clipped.flatMap((l) => clipLineToSphere(l, sphere));
    }
    res.push(...clipped);
  }
  return res;
}

function clipLineToSphere(line: SceneLine, sphere: SceneSphere): SceneLine[] {
  const res: SceneLine[] = [];
  const [a, b] = lineSphereIntersection(line, sphere) ?? [-1, -1];
  if (0 < a) res.push(remapLine(line, 0, Math.min(1, a)));
  if (b < 1) res.push(remapLine(line, Math.max(0, b), 1));
  return res;
}

function lineSphereIntersection(
  line: SceneLine,
  sphere: SceneSphere
): [number, number] | undefined {
  // courtesy of wikipedia...
  const u = subv4(line.end, line.start);
  const p = subv4(line.start, sphere.at);
  const r = sphere.radius;

  const a = dotv4(u, u);
  const b = 2 * dotv4(u, p);
  const c = dotv4(p, p) - r * r;

  const disc = b * b - 4 * a * c;
  if (disc <= 0) return undefined;

  const soln1 = (-b + Math.sqrt(disc)) / (2 * a);
  const soln2 = (-b - Math.sqrt(disc)) / (2 * a);
  return [Math.min(soln1, soln2), Math.max(soln1, soln2)];
}

function remapLine(line: SceneLine, t0: number, t1: number): SceneLine {
  const { start: x0, end: x1 } = line;
  const dx = subv4(x1, x0);
  return { ...line, start: addv4(x0, mulv4(dx, t0)), end: addv4(x0, mulv4(dx, t1)) };
}

function mulmo4(a: Mat4, obj: SceneObject): SceneObject {
  switch (obj.t) {
    case 'line':
      return { ...obj, start: mulmv4(a, obj.start), end: mulmv4(a, obj.end) };
    case 'sphere':
      return { ...obj, at: mulmv4(a, obj.at) };
  }
}

function depthOf(obj: SceneObject): number {
  switch (obj.t) {
    case 'line':
      return divv4(addv4(obj.start, obj.end), 2).z;
    case 'sphere':
      return obj.at.z;
  }
}

function drawObj(g: CanvasRenderingContext2D, obj: SceneObject): void {
  switch (obj.t) {
    case 'line':
      g.strokeStyle = palette[obj.color ?? M.Ck];

      g.beginPath();
      g.moveTo(-obj.start.x / obj.start.z, -obj.start.y / obj.start.z);
      g.lineTo(-obj.end.x / obj.end.z, -obj.end.y / obj.end.z);
      g.stroke();
      break;
    case 'sphere': {
      const f = -1 / obj.at.z;
      g.strokeStyle = '#000';
      g.fillStyle = palette[obj.color ?? M.xx];
      g.beginPath();
      g.ellipse(f * obj.at.x, f * obj.at.y, f * obj.radius, f * obj.radius, 0, 0, 2 * Math.PI);
      g.fill();
      g.stroke();
      g.restore();
      break;
    }
  }
}

class WidgetCanvas extends HTMLElement {
  static activeWidget: WidgetCanvas | undefined;

  cube: M.Molecube;
  camera: Camera;

  canvas: HTMLCanvasElement;

  constructor() {
    super();

    this.cube = M.Molecube.initial();
    this.camera = { dist: 10, az: Math.PI / 4, alt: Math.PI / 5 };

    this.canvas = document.createElement('canvas');
    this.canvas.setAttribute('width', '1');
    this.canvas.setAttribute('height', '1');
    this.appendChild(this.canvas);

    this.addEventListener('mousedown', this.onMouseDown.bind(this));
    document.addEventListener('mousemove', this.onMouseMove.bind(this));
    document.addEventListener('mouseup', this.onMouseUp.bind(this));
  }

  connectedCallback() {
    const rect = this.canvas.getBoundingClientRect();
    this.canvas.setAttribute('width', `${rect.width}`);
    this.canvas.setAttribute('height', `${rect.height}`);

    this.requestAnimationFrame();
  }

  frame() {
    const g: CanvasRenderingContext2D = expected(this.canvas.getContext('2d', { alpha: false }));
    const { width: w, height: h } = this.canvas.getBoundingClientRect();

    g.reset();

    g.beginPath();
    g.fillStyle = '#fff';
    g.fillRect(0, 0, w, h);

    g.lineWidth = 0.005;
    g.translate(w / 2, h / 2);
    g.scale(h * 2, -h * 2);

    const cam = mulmm4(
      transm4(0, 0, -this.camera.dist),
      rotxm4(this.camera.alt),
      rotym4(-this.camera.az)
    );

    const objects: SceneObject[] = [];
    for (const child of this.children) {
      if (child instanceof Renderable)
        objects.push(...child.render().map((obj) => mulmo4(cam, obj)));
    }

    const draw: [number, SceneObject][] = [];
    for (const obj of clipScene(objects)) draw.push([depthOf(obj), obj]);
    draw.sort((a, b) => a[0] - b[0]);
    for (const [, obj] of draw) drawObj(g, obj);
  }

  requestAnimationFrame() {
    window.requestAnimationFrame(this.frame.bind(this));
  }

  onMouseDown(e: MouseEvent): void {
    if (WidgetCanvas.activeWidget === undefined) {
      WidgetCanvas.activeWidget = this;
      e.preventDefault();
    }
  }

  onMouseMove(e: MouseEvent): void {
    if (WidgetCanvas.activeWidget === this) {
      const { width: w, height: h } = this.canvas.getBoundingClientRect();
      if (e.buttons & 1) {
        this.camera.az -= (Math.PI * e.movementX) / w;
        this.camera.alt += (Math.PI * e.movementY) / h;
        this.camera.alt = clamp(-Math.PI / 2, Math.PI / 2, this.camera.alt);
        this.requestAnimationFrame();
      } else {
        WidgetCanvas.activeWidget = undefined;
      }
    }
  }

  onMouseUp(): void {
    if (WidgetCanvas.activeWidget === this) {
      WidgetCanvas.activeWidget = undefined;
      this.requestAnimationFrame();
    }
  }
}

abstract class Renderable extends HTMLElement {
  abstract render(): SceneObject[];
}

const alphabet: Record<string, number | undefined> = {
  B: M.Cb,
  C: M.Cc,
  G: M.Cg,
  K: M.Ck,
  O: M.Co,
  P: M.Cp,
  R: M.Cr,
  W: M.Cw,
  Y: M.Cy,
  x: M.xx,
};

class WidgetCube extends Renderable {
  cube: M.Molecube;

  constructor() {
    super();
    this.cube = M.Molecube.initial();
  }

  connectedCallback() {
    const init = this.getAttribute('data-init');
    if (init !== null) {
      let j = 0;
      for (let i = 0; i < init.length && j < 27; i++) {
        const x = alphabet[init.charAt(i)];
        if (x !== undefined) {
          this.cube.data[j++] = x;
        }
      }
    }
  }

  render(): SceneObject[] {
    const res: SceneObject[] = [];
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        for (let k = 0; k < 3; k++) {
          if (i === 1 && j === 1 && k === 1) continue;
          res.push({
            t: 'sphere',
            at: pt4(-1 + k, 1 - j, 1 - i),
            radius: 0.5,
            color: this.cube.data[i * 9 + j * 3 + k],
          });
        }
      }
    }
    return res;
  }
}

class WidgetAxis extends Renderable {
  render(): SceneObject[] {
    const dir = parseDirAttr(this.getAttribute('data-dir'));
    if (dir === null) return [];
    const dir1 = mulv4(normv4(dir), 3);
    const line: SceneLine = {
      t: 'line',
      start: addv4(origv4, dir1),
      end: addv4(origv4, mulv4(dir1, -1)),
      color: alphabet[this.getAttribute('data-color') ?? 'x'] ?? M.xx,
    };
    return [line];
  }
}

class WidgetTetrahedron extends Renderable {
  points: Vec4[];
  constructor() {
    super();
    const points = [pt4(-1, -1, -1), pt4(1, -1, 1), pt4(-1, 1, 1), pt4(1, 1, -1)];
    const orient = mulmm4(rotxm4(Math.atan(Math.SQRT2)), rotym4(Math.PI / 4));
    this.points = points.map((x) => mulmv4(orient, x));
  }
  render(): SceneObject[] {
    const [p0, p1, p2, p3] = this.points;
    return [
      { t: 'sphere', color: M.Cr, at: p0, radius: 0.2 },
      { t: 'sphere', color: M.Cy, at: p1, radius: 0.2 },
      { t: 'sphere', color: M.Cg, at: p2, radius: 0.2 },
      { t: 'sphere', color: M.Cb, at: p3, radius: 0.2 },
      { t: 'line', color: M.Ck, start: p0, end: p1 },
      { t: 'line', color: M.Ck, start: p0, end: p2 },
      { t: 'line', color: M.Ck, start: p0, end: p3 },
      { t: 'line', color: M.Ck, start: p1, end: p2 },
      { t: 'line', color: M.Ck, start: p1, end: p3 },
      { t: 'line', color: M.Ck, start: p2, end: p3 },
    ];
  }
}

function parseDirAttr(s: string | null): Vec4 | null {
  if (s === null) return null;
  const m = s.match(/^ *([-0-9.]+) +([-0-9.]+) +([-0-9.]+) *$/);
  if (m === null) return null;
  return {
    x: Number.parseFloat(m[1]),
    y: Number.parseFloat(m[2]),
    z: Number.parseFloat(m[3]),
    w: 0,
  };
}

export function setup() {
  customElements.define('widget-cube', WidgetCube);
  customElements.define('widget-axis', WidgetAxis);
  customElements.define('widget-tetrahedron', WidgetTetrahedron);
  customElements.define('widget-canvas', WidgetCanvas);
}
