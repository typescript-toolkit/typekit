import { describe, expect, test } from "bun:test";

import { pipe } from "~/pipe";

import { Dual } from ".";

describe("dual", () => {
  test("basic dual function", () => {
    const sum: {
      (a: number, b: number): number;
      (b: number): (a: number) => number;
    } = Dual.dual(2, (a: number, b: number): number => a + b);

    const value1 = sum(1, 2);

    expect(value1).toBe(3);

    const value2 = pipe(1, sum(2));

    expect(value2).toBe(3);
  });
});
