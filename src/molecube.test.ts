import { describe, it, expect } from 'vitest';
import * as m from './molecube.ts';

describe('normmove', () => {
  const normalized = [
    [0, 1],
    [2, 3, 4],
  ];
  it('fails if cycles are not disjoint', () => {
    expect(() =>
      m.normmove([
        [0, 1],
        [1, 2],
      ])
    ).toThrowError('1 appears multiple times in (0 1)(1 2)');
  });
  it('drops identity cycles', () => {
    expect(m.normmove([[0, 1], [], [2, 3, 4]])).toStrictEqual(normalized);
    expect(m.normmove([[0, 1], [5], [2, 3, 4]])).toStrictEqual(normalized);
  });
  it('sorts cycles by first index', () => {
    expect(
      m.normmove([
        [2, 3, 4],
        [0, 1],
      ])
    ).toStrictEqual(normalized);
  });
  it('rotates cycles to smallest index', () => {
    expect(
      m.normmove([
        [1, 0],
        [4, 2, 3],
      ])
    ).toStrictEqual(normalized);
  });
  it('does all of these', () => {
    expect(m.normmove([[4, 2, 3], [], [5], [1, 0]])).toStrictEqual(normalized);
  });
});

describe('moves', () => {
  it('invmove', () => {
    expect(
      m.normmove(
        m.invmove([
          [0, 1],
          [2, 3, 4],
        ])
      )
    ).toStrictEqual([
      [0, 1],
      [2, 4, 3],
    ]);
  });
  it('dblmove', () => {
    expect(m.normmove(m.dblmove([[]]))).toStrictEqual([]);
    expect(m.normmove(m.dblmove([[0]]))).toStrictEqual([]);
    expect(m.normmove(m.dblmove([[0, 1]]))).toStrictEqual([]);
    expect(m.normmove(m.dblmove([[0, 1, 2]]))).toStrictEqual([[0, 2, 1]]);
    expect(m.normmove(m.dblmove([[0, 1, 2, 3]]))).toStrictEqual([
      [0, 2],
      [1, 3],
    ]);
    expect(m.normmove(m.dblmove([[0, 1, 2, 3, 4]]))).toStrictEqual([[0, 2, 4, 1, 3]]);
  });
});

describe('permutations', () => {
  it('invperm', () => {
    expect(m.invperm([0, 1, 3, 4, 2, 5])).toStrictEqual([0, 1, 4, 2, 3, 5]);
  });
  it('catperm', () => {
    expect(m.catperm([1, 2, 0, 3, 4, 5], [0, 2, 3, 1, 4, 5], [0, 1, 2, 3, 5, 4])).toStrictEqual([
      2, 3, 0, 1, 5, 4,
    ]);
  });
});

describe('conversions', () => {
  const perm = [0, 2, 3, 1, 5, 4];
  const move = [
    [1, 2, 3],
    [4, 5],
  ];
  const tr: m.Tr = [
    [1, 3],
    [1, 2],
    [4, 5],
  ];
  it('perm2move', () => {
    expect(m.normmove(m.perm2move(perm))).toStrictEqual(move);
  });
  it('perm2tr', () => {
    expect(m.perm2tr(perm)).toStrictEqual(tr);
  });
  it('move2perm', () => {
    expect(m.move2perm(move, 6)).toStrictEqual(perm);
  });
  it('move2tr', () => {
    expect(m.move2tr(move)).toStrictEqual(tr);
  });
  it('tr2perm', () => {
    expect(m.tr2perm(tr, 6)).toStrictEqual(perm);
  });
  it('tr2move', () => {
    expect(m.normmove(m.tr2move(tr))).toStrictEqual(move);
  });
});

describe('S4 perm2S4Flips', () => {
  it('empty array for identity', () => {
    expect(m.perm2S4Flips([0, 1, 2, 3])).toStrictEqual([]);
  });
  it('single element for 2-cycles', () => {
    expect(m.perm2S4Flips([1, 0, 2, 3])).toStrictEqual([0]);
    expect(m.perm2S4Flips([2, 1, 0, 3])).toStrictEqual([1]);
    expect(m.perm2S4Flips([3, 1, 2, 0])).toStrictEqual([2]);
    expect(m.perm2S4Flips([0, 2, 1, 3])).toStrictEqual([3]);
    expect(m.perm2S4Flips([0, 3, 2, 1])).toStrictEqual([4]);
    expect(m.perm2S4Flips([0, 1, 3, 2])).toStrictEqual([5]);
  });
  it('two elements for 3-cycles', () => {
    expect(m.perm2S4Flips([1, 2, 0, 3])).toStrictEqual([0, 1]);
    expect(m.perm2S4Flips([2, 0, 1, 3])).toStrictEqual([1, 0]);
    expect(m.perm2S4Flips([1, 3, 2, 0])).toStrictEqual([0, 2]);
    expect(m.perm2S4Flips([3, 0, 2, 1])).toStrictEqual([2, 0]);
    expect(m.perm2S4Flips([2, 1, 3, 0])).toStrictEqual([1, 2]);
    expect(m.perm2S4Flips([3, 1, 0, 2])).toStrictEqual([2, 1]);
    expect(m.perm2S4Flips([0, 2, 3, 1])).toStrictEqual([3, 4]);
    expect(m.perm2S4Flips([0, 3, 1, 2])).toStrictEqual([4, 3]);
  });
  it('two elements for disjoint pairs of 2-cycles', () => {
    expect(m.perm2S4Flips([1, 0, 3, 2])).toStrictEqual([5, 0]);
    expect(m.perm2S4Flips([2, 3, 0, 1])).toStrictEqual([4, 1]);
    expect(m.perm2S4Flips([3, 2, 1, 0])).toStrictEqual([3, 2]);
  });
  it('three elements for 4-cycles', () => {
    expect(m.perm2S4Flips([1, 2, 3, 0])).toStrictEqual([0, 1, 2]);
    expect(m.perm2S4Flips([1, 3, 0, 2])).toStrictEqual([0, 2, 1]);
    expect(m.perm2S4Flips([2, 3, 1, 0])).toStrictEqual([1, 0, 2]);
    expect(m.perm2S4Flips([2, 0, 3, 1])).toStrictEqual([1, 2, 0]);
    expect(m.perm2S4Flips([3, 2, 0, 1])).toStrictEqual([2, 0, 1]);
    expect(m.perm2S4Flips([3, 0, 1, 2])).toStrictEqual([2, 1, 0]);
  });
});
