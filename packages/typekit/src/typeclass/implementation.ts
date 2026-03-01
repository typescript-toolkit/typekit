import { HKT } from "~/hkt";

export interface Functor<F extends HKT.HKT> {
  map: <T, U>(fa: HKT.Kind<F, T>, f: (a: T) => U) => HKT.Kind<F, U>;
}

export interface Apply<F extends HKT.HKT> extends Functor<F> {
  ap: <T, U>(fa: HKT.Kind<F, T>, ffa: (fa: HKT.Kind<F, T>) => HKT.Kind<F, U>) => HKT.Kind<F, U>;
}

export interface Applicative<F extends HKT.HKT> extends Apply<F> {
  pure: <T>(a: T) => HKT.Kind<F, T>;
}

export interface Monad<F extends HKT.HKT> extends Applicative<F> {
  flatMap: <T, U>(fa: HKT.Kind<F, T>, f: (a: T) => HKT.Kind<F, U>) => HKT.Kind<F, U>;
}
export interface BiFunctor<F extends HKT.HKT> {
  mapLeft: <L1, R, L2>(fa: HKT.Kind2<F, L1, R>, f: (l1: L1) => L2) => HKT.Kind2<F, L2, R>;
  mapRight: <L, R1, R2>(fa: HKT.Kind2<F, L, R1>, f: (r1: R1) => R2) => HKT.Kind2<F, L, R2>;
  biMap: <L1, R1, L2, R2>(
    fa: HKT.Kind2<F, L1, R1>,
    f: {
      onLeft: (l1: L1) => L2;
      onRight: (r1: R1) => R2;
    },
  ) => HKT.Kind2<F, L2, R2>;
}
