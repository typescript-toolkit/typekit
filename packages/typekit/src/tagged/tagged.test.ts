import { describe, expect, test } from "bun:test";

import { Tagged } from ".";

describe("Tagged", () => {
  test("Tagged type", () => {
    interface TaggedType extends Tagged.Tagged<"Tagged"> {
      value: number;
    }

    const value = {
      _tag: "Tagged",
      value: 1,
    } satisfies TaggedType;

    expect(value._tag).toBe("Tagged");
    expect(value.value).toBe(1);
  });

  test("tagged() - data first", () => {
    type Tag = "Tagged";
    interface TaggedType extends Tagged.Tagged<Tag> {
      value: number;
    }

    const value: TaggedType = Tagged.tagged({ value: 1 }, "Tagged");

    expect(value._tag).toBe("Tagged");
    expect(value.value).toBe(1);
  });

  test("tagged() - data last", () => {
    type Tag = "Tagged";
    interface TaggedType extends Tagged.Tagged<Tag> {
      value: number;
    }

    // const value: TaggedType = Tagged.tagged("Tagged")({ value: 1 });
    const value: TaggedType = Tagged.tagged("Tagged")({
      value: 1,
    });

    expect(value._tag).toBe("Tagged");
    expect(value.value).toBe(1);
  });
});
