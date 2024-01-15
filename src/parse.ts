import * as M from './molecube.js';
import { Vec4 } from './geom.ts';
import { PI } from './utils.ts';

export function parseNumAttr(s: string | null): number | null {
  if (s === null) return null;
  return parseFloat(s);
}

export function parseAngleAttr(s: string | null): number | null {
  if (s === null) return null;
  return (parseFloat(s) * PI) / 180;
}

export function parseDirAttr(s: string | null): Vec4 | null {
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

const alphabet: Record<string, number> = {
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
export function parseColorAttr(s: string | null): number[] | null {
  if (s === null) return null;
  const res: number[] = [];
  for (let i = 0; i < s.length; i++) {
    const x = alphabet[s.charAt(i)];
    if (x !== undefined) {
      res.push(x);
    }
  }
  return res;
}
