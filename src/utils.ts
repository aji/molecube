export class AssertionError extends Error {}

export function assert(cond: boolean, msg: string = 'assertion failed'): asserts cond {
  if (!cond) {
    throw new AssertionError(msg);
  }
}

export function expected<T>(
  value: T | undefined | null,
  msg: string = 'expected a defined value'
): T {
  assert(value !== undefined && value !== null, msg);
  return value;
}

export function clamp(lo: number, hi: number, val: number): number {
  return Math.min(Math.max(lo, val), hi);
}

export function range(n: number): number[] {
  return [...Array(n).keys()];
}

export function evens(xs: number[]): number[] {
  return xs.filter((_, i) => i % 2 === 0);
}
export function odds(xs: number[]): number[] {
  return xs.filter((_, i) => i % 2 !== 0);
}
