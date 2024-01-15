export type Vec4 = {
  x: number;
  y: number;
  z: number;
  w: number;
};

export const ex4 = { x: 1, y: 0, z: 0, w: 0 };
export const ey4 = { x: 0, y: 1, z: 0, w: 0 };
export const ez4 = { x: 0, y: 0, z: 1, w: 0 };
export const ew4 = { x: 0, y: 0, z: 0, w: 1 };
export const zerov4 = { x: 0, y: 0, z: 0, w: 0 };
export const origv4 = { x: 0, y: 0, z: 0, w: 1 };

export function pt4(x: number, y: number, z: number): Vec4 {
  return { x, y, z, w: 1 };
}

export function addv4(...xs: Vec4[]): Vec4 {
  return xs.reduce((a, b) => ({ x: a.x + b.x, y: a.y + b.y, z: a.z + b.z, w: a.w + b.w }), zerov4);
}
export function subv4(a: Vec4, b: Vec4): Vec4 {
  return { x: a.x - b.x, y: a.y - b.y, z: a.z - b.z, w: a.w - b.w };
}
export function mulv4({ x, y, z, w }: Vec4, n: number): Vec4 {
  return { x: x * n, y: y * n, z: z * n, w: w * n };
}
export function divv4({ x, y, z, w }: Vec4, n: number): Vec4 {
  return { x: x / n, y: y / n, z: z / n, w: w / n };
}
export function dotv4(a: Vec4, b: Vec4): number {
  return a.x * b.x + a.y * b.y + a.z * b.z + a.w * b.w;
}
export function lenv4(a: Vec4): number {
  return Math.sqrt(dotv4(a, a));
}
export function normv4(a: Vec4): Vec4 {
  return divv4(a, lenv4(a));
}
export function projv4(x: Vec4, to: Vec4): Vec4 {
  return mulv4(to, dotv4(x, to) / dotv4(to, to));
}
export function oprojv4(x: Vec4, to: Vec4): Vec4 {
  return subv4(x, projv4(x, to));
}

/** Components are the column vectors */
export type Mat4 = { x: Vec4; y: Vec4; z: Vec4; w: Vec4 };

export const id4: Mat4 = { x: ex4, y: ey4, z: ez4, w: ew4 };
export const zerom4: Mat4 = { x: zerov4, y: zerov4, z: zerov4, w: zerov4 };

export function tlatem4(x: number, y: number, z: number): Mat4 {
  return {
    x: { x: 1, y: 0, z: 0, w: 0 },
    y: { x: 0, y: 1, z: 0, w: 0 },
    z: { x: 0, y: 0, z: 1, w: 0 },
    w: { x: x, y: y, z: z, w: 1 },
  };
}

export function rotxm4(th: number): Mat4 {
  return {
    x: ex4,
    y: { x: 0, y: Math.cos(th), z: Math.sin(th), w: 0 },
    z: { x: 0, y: -Math.sin(th), z: Math.cos(th), w: 0 },
    w: ew4,
  };
}
export function rotym4(th: number): Mat4 {
  return {
    x: { x: Math.cos(th), y: 0, z: -Math.sin(th), w: 0 },
    y: ey4,
    z: { x: Math.sin(th), y: 0, z: Math.cos(th), w: 0 },
    w: ew4,
  };
}
export function rotzm4(th: number): Mat4 {
  return {
    x: { x: Math.cos(th), y: Math.sin(th), z: 0, w: 0 },
    y: { x: -Math.sin(th), y: Math.cos(th), z: 0, w: 0 },
    z: ez4,
    w: ew4,
  };
}

export function scalem4(x: number, y: number, z: number): Mat4 {
  return {
    x: { x, y: 0, z: 0, w: 0 },
    y: { x: 0, y, z: 0, w: 0 },
    z: { x: 0, y: 0, z, w: 0 },
    w: ew4,
  };
}

export function crossm4({ x, y, z }: Vec4): Mat4 {
  return {
    x: { x: 0, y: z, z: -y, w: 0 },
    y: { x: -z, y: 0, z: x, w: 0 },
    z: { x: y, y: -x, z: 0, w: 0 },
    w: ew4,
  };
}

export function tposem4(a: Mat4): Mat4 {
  return {
    x: { x: a.x.x, y: a.y.x, z: a.z.x, w: a.w.x },
    y: { x: a.x.y, y: a.y.y, z: a.z.y, w: a.w.y },
    z: { x: a.x.z, y: a.y.z, z: a.z.z, w: a.w.z },
    w: { x: a.x.w, y: a.y.w, z: a.z.w, w: a.w.w },
  };
}

export function mulmv4(a: Mat4, { x, y, z, w }: Vec4): Vec4 {
  return addv4(mulv4(a.x, x), mulv4(a.y, y), mulv4(a.z, z), mulv4(a.w, w));
}
export function mulmm4(...as: Mat4[]): Mat4 {
  return as.reduce(
    (a, b) => ({
      x: mulmv4(a, b.x),
      y: mulmv4(a, b.y),
      z: mulmv4(a, b.z),
      w: mulmv4(a, b.w),
    }),
    id4
  );
}
