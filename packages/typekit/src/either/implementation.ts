import { dual } from "~/dual";
import { Pipe, pipeable } from "~/pipe";
import { Tagged, tagged } from "~/tagged";

export interface Left<L> extends Tagged.Tagged<"left">, Pipe.Pipeable {
  left: L;
}

export interface Right<R> extends Tagged.Tagged<"right">, Pipe.Pipeable {
  right: R;
}

export type Either<L, R> = Left<L> | Right<R>;

export function left<L = unknown, R = never>(value: L): Either<L, R> {
  return pipeable(tagged({ left: value }, "left"));
}

export function right<L = never, R = unknown>(value: R): Either<L, R> {
  return pipeable(tagged({ right: value }, "right"));
}

export function isLeft<L, R>(either: Either<L, R>): either is Left<L> {
  return either._tag === "left";
}

export function isRight<L, R>(either: Either<L, R>): either is Right<R> {
  return either._tag === "right";
}

export function unwrapLeft<L, R>(either: Either<L, R>): L {
  if (either._tag === "right") {
    throw new Error(`Cannot unwrapLeft right value: ${String(either.right)}`);
  }

  return either.left;
}

export const unwrapLeftOr: {
  <L, R>(either: Either<L, R>, defaultValue: L): L;
  <L>(defaultValue: L): <R>(either: Either<L, R>) => L;
} = dual(2, function <L, R>(either: Either<L, R>, defaultValue: L): L {
  return either._tag === "left" ? either.left : defaultValue;
});

export function unwrapRight<L, R>(either: Either<L, R>): R {
  if (either._tag === "left") {
    throw new Error(`Cannot unwrapRight left value: ${String(either.left)}`);
  }

  return either.right;
}

export const unwrapRightOr: {
  <L, R>(either: Either<L, R>, defaultValue: R): R;
  <R>(defaultValue: R): <L>(either: Either<L, R>) => R;
} = dual(2, function <L, R>(either: Either<L, R>, defaultValue: R): R {
  return either._tag === "left" ? defaultValue : either.right;
});

// export function flattenLeft<L, R>(either: Either<Either<L, R>, R>) {
//   return either._tag === "left" ? either.left : either;
// }

export function flatten<L, R>(either: Either<L, Either<L, R>>): Either<L, R> {
  return either._tag === "left" ? either : either.right;
}

export function flatten2<L, R>(either: Either<Either<L, R>, Either<L, R>>): Either<L, R> {
  return either._tag === "left" ? either.left : either.right;
}

export const mapLeft: {
  <L1, R, L2>(either: Either<L1, R>, onLeft: (value: L1) => L2): Either<L2, R>;
  <L1, L2>(onLeft: (value: L1) => L2): <R>(either: Either<L1, R>) => Either<L2, R>;
} = dual(2, function <L1, R, L2>(either: Either<L1, R>, onLeft: (value: L1) => L2): Either<L2, R> {
  return either._tag === "left" ? left(onLeft(either.left)) : either;
});

export const mapRight: {
  <L, R1, R2>(either: Either<L, R1>, onRight: (value: R1) => R2): Either<L, R2>;
  <R1, R2>(onRight: (value: R1) => R2): <L>(either: Either<L, R1>) => Either<L, R2>;
} = dual(2, function <L, R1, R2>(either: Either<L, R1>, onRight: (value: R1) => R2): Either<L, R2> {
  return either._tag === "left" ? either : right(onRight(either.right));
});

export const biMap: {
  <L1, R1, L2, R2>(
    either: Either<L1, R1>,
    func: {
      onLeft: (value: L1) => L2;
      onRight: (value: R1) => R2;
    },
  ): Either<L2, R2>;
  <L1, R1, L2, R2>(func: {
    onLeft: (value: L1) => L2;
    onRight: (value: R1) => R2;
  }): (either: Either<L1, R1>) => Either<L2, R2>;
} = dual(
  2,
  function <L1, R1, L2, R2>(
    either: Either<L1, R1>,
    func: {
      onLeft: (value: L1) => L2;
      onRight: (value: R1) => R2;
    },
  ): Either<L2, R2> {
    return either._tag === "left" ? left(func.onLeft(either.left)) : right(func.onRight(either.right));
  },
);

export const flatMapLeft: {
  <L1, R, L2>(either: Either<L1, R>, onLeft: (value: L1) => Either<L2, R>): Either<L2, R>;
  <L1, R, L2>(onLeft: (value: L1) => Either<L2, R>): (either: Either<L1, R>) => Either<L2, R>;
} = dual(2, function <L1, R, L2>(either: Either<L1, R>, onLeft: (value: L1) => Either<L2, R>): Either<L2, R> {
  return either._tag === "left" ? onLeft(either.left) : either;
});

export const flatMapRight: {
  <L, R1, R2>(either: Either<L, R1>, onRight: (value: R1) => Either<L, R2>): Either<L, R2>;
  <L, R1, R2>(onRight: (value: R1) => Either<L, R2>): (either: Either<L, R1>) => Either<L, R2>;
} = dual(2, function <L, R1, R2>(either: Either<L, R1>, onRight: (value: R1) => Either<L, R2>): Either<L, R2> {
  return either._tag === "left" ? either : onRight(either.right);
});

export const biFlatMap: {
  <L1, R1, L2, R2>(
    either: Either<L1, R1>,
    func: {
      onLeft: (value: L1) => Either<L2, R2>;
      onRight: (value: R1) => Either<L2, R2>;
    },
  ): Either<L2, R2>;
  <L1, R1, L2, R2>(func: {
    onLeft: (value: L1) => Either<L2, R2>;
    onRight: (value: R1) => Either<L2, R2>;
  }): (either: Either<L1, R1>) => Either<L2, R2>;
} = dual(
  2,
  function <L1, R1, L2, R2>(
    either: Either<L1, R1>,
    func: {
      onLeft: (value: L1) => Either<L2, R2>;
      onRight: (value: R1) => Either<L2, R2>;
    },
  ): Either<L2, R2> {
    return either._tag === "left" ? func.onLeft(either.left) : func.onRight(either.right);
  },
);
