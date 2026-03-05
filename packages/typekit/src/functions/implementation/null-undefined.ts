import type { RemoveNull, RemoveNullOrUndefined, RemoveUndefined } from "~/type";

export function isNotNull<T>(value: T): value is RemoveNull<T> {
  return value !== null;
}

export function isNotUndefined<T>(value: T): value is RemoveUndefined<T> {
  return value !== undefined;
}

export function isNotNullOrUndefined<T>(value: T): value is RemoveNullOrUndefined<T> {
  return value !== null && value !== undefined;
}
