import './hexagon.css';
import { Vec4, addv4, ey4, mulmv4, mulv4, normv4, rotzm4, subv4, zerov4 } from './geom.ts';
import { PI, TAU, expected, range } from './utils.ts';
import * as M from './molecube.ts';
import { parseColorAttr } from './parse.ts';

const rot135a = rotzm4(0.75 * PI);
const rot135b = rotzm4(-0.75 * PI);

const points: Vec4[] = range(6).map((i) => mulmv4(rotzm4(((1 - i) * TAU) / 6), ey4));

// prettier-ignore
const edges: [number, number][] = [
  [ 0, -1], [ 5,  4], [ 1,  2], [-1,  3], // x axis
  [ 0,  5], [-1,  4], [ 1, -1], [ 2,  3], // y axis
  [ 0,  1], [-1,  2], [ 5, -1], [ 4,  3], // z axis
];

class HexagonCanvas extends HTMLElement {
  canvas: HTMLCanvasElement;

  constructor() {
    super();

    this.canvas = document.createElement('canvas');
    this.canvas.setAttribute('width', '1');
    this.canvas.setAttribute('height', '1');
    this.appendChild(this.canvas);
  }

  connectedCallback() {
    const rect = this.canvas.getBoundingClientRect();
    this.canvas.setAttribute('width', `${rect.width}`);
    this.canvas.setAttribute('height', `${rect.height}`);
    this.requestAnimationFrame();

    // horrible iOS safari hack
    setTimeout(() => {
      this.requestAnimationFrame();
    }, 100 + Math.random() * 100);
  }

  frame() {
    const { width: w, height: h } = this.canvas.getBoundingClientRect();
    this.canvas.setAttribute('width', `${w}`);
    this.canvas.setAttribute('height', `${h}`);

    const g: CanvasRenderingContext2D = expected(this.canvas.getContext('2d', { alpha: false }));

    g.resetTransform();

    g.fillStyle = '#fff';
    g.fillRect(0, 0, w, h);

    g.translate(w / 2, h / 2);
    g.scale(h * 0.4, -h * 0.4);

    const edgeColors = parseColorAttr(this.getAttribute('edges'));
    for (let i = 0; i < 12; i++) {
      const [a, b] = edges[i];
      const p0 = points[a] ?? zerov4;
      const p1 = points[b] ?? zerov4;
      const color = edgeColors?.[i] ?? M.xx;
      g.lineCap = 'round';
      g.beginPath();
      g.moveTo(p0.x, p0.y);
      g.lineTo(p1.x, p1.y);
      if (color !== M.xx) {
        if (color === M.Cw) {
          g.lineWidth = 0.13;
          g.strokeStyle = '#000';
          g.stroke();
        }
        g.lineWidth = 0.1;
        g.strokeStyle = M.palette[color];
        g.stroke();
      } else {
        g.lineWidth = 0.03;
        g.strokeStyle = '#888';
        g.stroke();
      }
    }

    const arrows = parseArrowAttr(this.getAttribute('arrows')) ?? [];
    for (let i = 0; i < 6; i++) {
      const arr = arrows[i] ?? -1;
      if (arr === -1) continue;
      const towards =
        arr === 0
          ? points[(i + 1) % 6]
          : arr === 1
          ? zerov4
          : arr === 2
          ? points[(i + 5) % 6]
          : null;
      if (towards === null) continue;
      const start = points[i];
      const dir = normv4(subv4(towards, start));
      const end = addv4(start, mulv4(dir, 0.7));
      const tip1 = addv4(end, mulv4(mulmv4(rot135a, dir), 0.2));
      const tip2 = addv4(end, mulv4(mulmv4(rot135b, dir), 0.2));
      g.strokeStyle = '#000';
      g.lineWidth = 0.1;
      g.beginPath();
      g.moveTo(start.x, start.y);
      g.lineTo(end.x, end.y);
      g.moveTo(tip1.x, tip1.y);
      g.lineTo(end.x, end.y);
      g.lineTo(tip2.x, tip2.y);
      g.stroke();
    }

    const vertexColors = parseColorAttr(this.getAttribute('vertices'));
    g.strokeStyle = '#000';
    g.lineWidth = 0.03;
    for (let i = 0; i < 6; i++) {
      const color = vertexColors?.[i] ?? M.xx;
      if (color === M.xx) continue;
      g.beginPath();
      g.fillStyle = M.palette[color];
      g.ellipse(points[i].x, points[i].y, 0.15, 0.15, 0, 0, TAU);
      g.fill();
      g.stroke();
    }
  }

  requestAnimationFrame() {
    window.requestAnimationFrame(this.frame.bind(this));
  }
}

function parseArrowAttr(s: string | null): number[] | null {
  if (s === null) return null;
  const res: number[] = [];
  for (let i = 0; i < 6; i++) {
    const c = s.charAt(i);
    res.push(c === '' || c === 'x' ? -1 : parseInt(c));
  }
  return res;
}

export function setup() {
  customElements.define('hexagon-canvas', HexagonCanvas);
}
