import { range, evens, odds } from './utils.ts';

/* A "move" is a permutation specified as a set of disjoint cycles, e.g. [[5, 8]]
 * is a permutation swapping 5 and 8, [[1, 2, 3]] is a 3-cycle of 1 2 and 3, and
 * [[5, 8], [1, 2, 3]] is the combination of these.
 *
 * A "perm" is a permutation specified by an array where a value j at index i
 * specifies that element i is moved to j in the permutation. In other words, a
 * permutation of N elements is a shuffling of the numbers 0 through N-1. For
 * example, [0, 4, 2, 3, 1] is a permutation swapping elements 1 and 4.
 *
 * "tr" is a permutation specified as a concatenation of transpositions. Note
 * that the earliest permutations should be applied last, i.e. transpositions
 * should be applied from right to left, as is common in group theory
 * literature.
 */

export type Cycle = number[];
export type Transposition = [number, number];

export type Move = Cycle[];
export type Perm = number[];
export type Tr = Transposition[];

export type Alphabet = (x: number) => string;
const defaultAlphabet = (x: number) => `${x}`;

export function fmtmove(move: Move, alphabet: Alphabet = defaultAlphabet): string {
  return move.map((c) => '(' + c.map(alphabet).join(' ') + ')').join('');
}
export function normmove(move: Move, alphabet: Alphabet = defaultAlphabet): Move {
  const res: Move = [];
  const seen: Set<number> = new Set();
  for (const cycle of move) {
    if (cycle.length < 2) {
      continue;
    }
    const x = Math.min(...cycle);
    const i = cycle.indexOf(x);
    const m = cycle.length;
    const next = [];
    for (let j = 0; j < m; j++) {
      const y = cycle[(i + j) % m];
      if (seen.has(y)) {
        throw new Error(`${alphabet(y)} appears multiple times in ${fmtmove(move, alphabet)}`);
      }
      seen.add(y);
      next.push(cycle[(i + j) % m]);
    }
    res.push(next);
  }
  res.sort((a, b) => a[0] - b[0]);
  return res;
}
export function invmove(move: Move): Move {
  return move.map((x) => [...x].reverse()).reverse();
}
export function dblcycle(cycle: Cycle): Move {
  const n = cycle.length;
  if (n <= 2) return [];
  if (n % 2 === 0) return [evens(cycle), odds(cycle)];
  return [cycle.map((_, i) => cycle[(i * 2) % n])];
}
export function dblmove(move: Move): Move {
  return move.flatMap(dblcycle);
}

export function invperm(perm: Perm): Perm {
  return range(perm.length).map((j) => perm.indexOf(j));
}
export function catperm(...perms: Perm[]): Perm {
  const n = perms[0].length;
  let res = range(n);
  for (const perm of perms) {
    const next = range(n);
    perm.forEach((j, i) => (next[j] = res[i]));
    res = next;
  }
  return res;
}

export function perm2move(perm: Perm): Move {
  const n = perm.length;
  const move = [];
  const seen = new Set();
  for (let k = 0; k < n; k++) {
    if (perm[k] === k || seen.has(k)) {
      continue;
    }
    let j = k;
    const cycle = [];
    do {
      seen.add(j);
      cycle.push(j);
      j = perm[j];
    } while (j !== k);
    move.push(cycle);
  }
  return move;
}
export function perm2tr(perm: Perm): Tr {
  return move2tr(perm2move(perm));
}

export function move2perm(move: Move, n: number): Perm {
  const perm = range(n);
  for (const cycle of move) {
    const m = cycle.length;
    for (let i = 0; i < m; i++) {
      perm[cycle[i]] = cycle[(i + 1) % m];
    }
  }
  return perm;
}
export function move2tr(move: Move): Tr {
  const tr: Tr = [];
  for (const cycle of move) {
    for (let i = cycle.length - 1; i > 0; i--) {
      tr.push([cycle[0], cycle[i]]);
    }
  }
  return tr;
}

export function tr2perm(tr: Tr, n: number): Perm {
  const perm = range(n);
  for (const [a, b] of tr) {
    const x = perm[a];
    perm[a] = perm[b];
    perm[b] = x;
  }
  return perm;
}
export function tr2move(tr: Tr): Move {
  return perm2move(tr2perm(tr, Math.max(...tr.flat()) + 1));
}

/* The cube's orientation in space is represented as an element of S4, where the
 * items being permuted are the diagonals of the cube. Although this
 * representation of orientation is somewhat awkward, every group element (and
 * therefore factorizations into transpositions, and so on) is a valid change of
 * orientation. There are only 6 transpositions, making certain kinds of work
 * easier.
 *
 * Each element permutes the diagonals between corners, which are arbitrarily
 * given the following order:
 *   0 = FUL--BDR
 *   1 = FUR--BDL
 *   2 = FDL--BUR
 *   3 = FDR--BUL
 *
 * Transpositions are 180-degree flips along diagonals between edges, which are
 * arbitrarily given the following order:
 *   0 = (0 1) = FU--BD
 *   1 = (0 2) = FL--BR
 *   2 = (0 3) = UL--DR
 *   3 = (1 2) = UR--DL
 *   4 = (1 3) = FR--BL
 *   5 = (2 3) = FD--BU
 *
 * The function perm2flips can take an element of S4 specified as a perm and
 * convert it into an array of such transposition indices. Note that the
 * transpositions in the returned array should be applied in order from least to
 * greatest index, i.e. left to right, not right to left as is commonly used in
 * group theory literature. This function can be used to convert elements of S4
 * into elements of other groups that have S4 as a subgroup, e.g. SL(3)
 */

export type S4Flip = 0 | 1 | 2 | 3 | 4 | 5;

// prettier-ignore
export const
  S4x = [3, 2, 0, 1],
  S4y = [3, 0, 1, 2],
  S4z = [1, 3, 0, 2];

export function perm2S4Flips(perm: Perm): S4Flip[] {
  if (perm.length !== 4) throw new Error('not an element of S4');
  const tr = move2tr(perm2move(perm)).reverse();
  const flips: S4Flip[] = [];
  for (const [a, b] of tr) {
    const i = Math.min(a, b);
    const j = Math.max(a, b);
    if (i === 0 && j === 1) flips.push(0);
    else if (i === 0 && j === 2) flips.push(1);
    else if (i === 0 && j === 3) flips.push(2);
    else if (i === 1 && j === 2) flips.push(3);
    else if (i === 1 && j === 3) flips.push(4);
    else if (i === 2 && j === 3) flips.push(5);
    else throw new Error(`bad transposition: (${a} ${b})`);
  }
  return flips;
}

// F  B  U  D  L  R
export const S6 = [
  [2, 3, 0, 1, 5, 4], // FU--BD
  [4, 5, 3, 2, 0, 1], // FL--BR
  [1, 0, 4, 5, 2, 3], // UL--DR
  [1, 0, 5, 4, 3, 2], // UR--DL
  [5, 4, 3, 2, 1, 0], // FR--BL
  [3, 2, 1, 0, 5, 4], // FD--BU
];
export function formatS6(perm: Perm): string {
  const faces = 'FBUDLR';
  return perm2move(perm)
    .map((cycle) => '(' + cycle.map((i) => faces.charAt(i)).join(' ') + ')')
    .join('');
}

/* Cube data is stored in a sparse array, in row-major order if looking at the
 * front of the cube, as follows:
 *
 *          (18)
 *      _(9)    (19)
 *   (0)_   (10)    (20)
 *    |  (1)_   (11)  |
 *   (3)     (2)    (23)
 *    |  (4)  | (14)  |
 *   (6)_    (5)    (26)
 *       (7)_ | (17)
 *           (8)
 *
 * 7 indices are not used (4, 10, 12, 13, 14, 16, 22) but coordinate-related
 * math is much simpler this way.
 *
 * Positions 10, 4, and 14 are white, blue, and yellow.
 *
 * Movements of the pieces are represented as "moves", i.e. sets of disjoint
 * cycles.
 */

// prettier-ignore
export const
  xx = -1,

  // Colors
  Cg = 0,
  Ck = 1,
  Cw = 2,
  Cy = 3,
  Co = 4,
  Cb = 5,
  Cc = 6,
  Cr = 7,
  Cp = 8,

  // Corners
  FUL = 0,
  FUR = 2,
  FDL = 6,
  FDR = 8,
  BUL = 18,
  BUR = 20,
  BDL = 24,
  BDR = 26,

  // Edges
  FU = 1,
  FL = 3,
  FR = 5,
  FD = 7,
  UL = 9,
  UR = 11,
  DL = 15,
  DR = 17,
  BU = 19,
  BL = 21,
  BR = 23,
  BD = 25,

  // Moves (disjoint cycles)
  F = [[FUL, FUR, FDR, FDL], [FU, FR, FD, FL]] satisfies Move,
  B = [[BUL, BDL, BDR, BUR], [BU, BL, BD, BR]] satisfies Move,
  U = [[FUL, BUL, BUR, FUR], [FU, UL, BU, UR]] satisfies Move,
  D = [[FDL, FDR, BDR, BDL], [FD, DR, BD, DL]] satisfies Move,
  L = [[FUL, FDL, BDL, BUL], [UL, FL, DL, BL]] satisfies Move,
  R = [[FUR, BUR, BDR, FDR], [UR, BR, DR, FR]] satisfies Move,
  Fi = invmove(F),
  Bi = invmove(B),
  Ui = invmove(U),
  Di = invmove(D),
  Li = invmove(L),
  Ri = invmove(R),
  F2 = dblmove(F),
  B2 = dblmove(B),
  U2 = dblmove(U),
  D2 = dblmove(D),
  L2 = dblmove(L),
  R2 = dblmove(R),

  initial = [
    Cy, Co, Cg,
    Cr, Cb, Ck,
    Cc, Cp, Cw,
    Cp, Cw, Cc,
    Co, xx, Cy,
    Cb, Ck, Cr,
    Ck, Cr, Cb,
    Cw, Cc, Cp,
    Cg, Cy, Co,
  ];

export class Molecube {
  constructor(public data: number[]) {}

  static initial(): Molecube {
    return new Molecube([...initial]);
  }
}
