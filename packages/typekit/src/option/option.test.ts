import { describe, expect, test } from "bun:test";

import { Option } from ".";

describe("option", () => {
  test("some()", () => {
    const someValue = Option.some(1);

    expect(someValue._tag).toBe("some");
  });

  test("none()", () => {
    const noneValue = Option.none<number>();

    expect(noneValue._tag).toBe("none");
  });

  test("ap() - data first", () => {
    const someValue = Option.some(1);
    const noneValue = Option.none<number>();

    const apFn = (option: Option.Option<number>) =>
      option._tag === "some" ? Option.some(option.value + 1) : Option.none<number>();

    const appliedSome = Option.ap(someValue, apFn);
    const appliedNone = Option.ap(noneValue, apFn);

    expect(appliedSome._tag).toBe("some");
    if (appliedSome._tag === "some") {
      expect(appliedSome.value).toBe(2);
    }

    expect(appliedNone._tag).toBe("none");
  });

  test("ap() - data last", () => {
    const someValue = Option.some(1);
    const noneValue = Option.none<number>();

    const apFn = Option.ap((option: Option.Option<number>) =>
      option._tag === "some" ? Option.some(option.value + 1) : Option.none<number>(),
    );

    const appliedSome = apFn(someValue);
    const appliedNone = apFn(noneValue);

    expect(appliedSome._tag).toBe("some");
    if (appliedSome._tag === "some") {
      expect(appliedSome.value).toBe(2);
    }

    expect(appliedNone._tag).toBe("none");
  });

  test("map() - data first", () => {
    const add1 = (value: number) => value + 1;
    const someValue = Option.some(1);
    const noneValue = Option.none<number>();

    const mappedSome = Option.map(someValue, add1);
    const mappedNone = Option.map(noneValue, add1);

    expect(mappedSome._tag).toBe("some");
    if (mappedSome._tag === "some") {
      expect(mappedSome.value).toBe(2);
    }
    expect(mappedNone).toBe(noneValue);
  });

  test("map() - data last", () => {
    const add1 = (value: number) => value + 1;
    const someValue = Option.some(1);
    const noneValue = Option.none<number>();

    const mappedSome = Option.map(add1)(someValue);
    const mappedNone = Option.map(add1)(noneValue);

    expect(mappedSome._tag).toBe("some");
    if (mappedSome._tag === "some") {
      expect(mappedSome.value).toBe(2);
    }
    expect(mappedNone).toBe(noneValue);
  });

  test("flatMap() - data first", () => {
    const someValue = Option.some(2);
    const noneValue = Option.none<number>();

    const flatMapFn = (value: number) => Option.some(value * 2);

    const mappedSome = Option.flatMap(someValue, flatMapFn);
    const mappedNone = Option.flatMap(noneValue, flatMapFn);

    expect(mappedSome._tag).toBe("some");
    if (mappedSome._tag === "some") {
      expect(mappedSome.value).toBe(4);
    }
    expect(mappedNone).toBe(noneValue);
  });

  test("flatMap() - data last", () => {
    const someValue = Option.some(2);
    const noneValue = Option.none<number>();

    const flatMapFn = Option.flatMap((value: number) => Option.some(value * 2));

    const mappedSome = flatMapFn(someValue);
    const mappedNone = flatMapFn(noneValue);

    expect(mappedSome._tag).toBe("some");
    if (mappedSome._tag === "some") {
      expect(mappedSome.value).toBe(4);
    }
    expect(mappedNone).toBe(noneValue);
  });
});
