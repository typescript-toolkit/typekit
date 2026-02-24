import { dual } from "~/dual";

export interface Tagged<Tag extends string> {
  readonly _tag: Tag;
}

export const taggedMutate: {
  <Tag extends string, T extends object>(object: T, tag: Tag): T & Tagged<Tag>;
  <Tag extends string>(tag: Tag): <T extends object>(object: T) => T & Tagged<Tag>;
} = dual(2, function <Tag extends string, T extends object>(object: T & { _tag?: never }, tag: Tag): T & Tagged<Tag> {
  if (!Object.isExtensible(object)) {
    throw new TypeError("tagged: object is not extensible");
  }
  if ("_tag" in object) {
    throw new TypeError("tagged: object already has '_tag'");
  }

  return Object.defineProperty(object, "_tag", {
    value: tag,
    writable: false,
    enumerable: true,
    configurable: false,
  }) as T & Tagged<Tag>;
});

export const tagged: {
  <Tag extends string, T extends object>(object: T, tag: Tag): T & Tagged<Tag>;
  <Tag extends string>(tag: Tag): <T extends object>(object: T) => T & Tagged<Tag>;
} = dual(2, function <Tag extends string, T extends object>(object: T & { _tag?: never }, tag: Tag): T & Tagged<Tag> {
  const newObject = Object.assign(Object.create(object), { _tag: tag });

  return newObject;
});
