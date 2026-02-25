export type ListLike<T> = [] | readonly [] | T[] | readonly T[];

export type Tail<T extends ListLike<unknown>> = T extends []
  ? []
  : T extends readonly []
    ? readonly []
    : T extends [unknown]
      ? []
      : T extends readonly [unknown]
        ? []
        : T extends [unknown, ...infer Tail]
          ? Tail
          : T extends readonly [unknown, ...infer Tail]
            ? Tail
            : never;
