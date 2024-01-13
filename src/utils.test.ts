import { describe, it, expect } from 'vitest';
import { range, evens, odds } from './utils.ts';

describe('range', () => {
  it('ranges', () => {
    expect(range(0)).toStrictEqual([]);
    expect(range(1)).toStrictEqual([0]);
    expect(range(2)).toStrictEqual([0, 1]);
    expect(range(3)).toStrictEqual([0, 1, 2]);
  });
});

describe('evens', () => {
  it('even indices', () => {
    expect(evens([])).toStrictEqual([]);
    expect(evens([10])).toStrictEqual([10]);
    expect(evens([10, 20])).toStrictEqual([10]);
    expect(evens([10, 20, 30])).toStrictEqual([10, 30]);
    expect(evens([10, 20, 30, 40])).toStrictEqual([10, 30]);
  });
});

describe('odds', () => {
  it('odd indices', () => {
    expect(odds([])).toStrictEqual([]);
    expect(odds([10])).toStrictEqual([]);
    expect(odds([10, 20])).toStrictEqual([20]);
    expect(odds([10, 20, 30])).toStrictEqual([20]);
    expect(odds([10, 20, 30, 40])).toStrictEqual([20, 40]);
  });
});
