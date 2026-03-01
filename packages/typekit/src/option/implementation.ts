import { dual } from "~/dual";
import { HKT } from "~/hkt";
import { type Pipeable, pipeable } from "~/pipe";
import { tagged } from "~/tagged";
import { TypeClass } from "~/typeclass";

export interface Some<T> extends Pipeable {
  _tag: "some";
  value: T;
}

export interface None extends Pipeable {
  _tag: "none";
}

export type Option<T> = Some<T> | None;

interface OptionHKT extends HKT.HKT {
  return: Option<HKT.Arg0<this>>;
}

const optionMonad: TypeClass.Monad<OptionHKT> = {
  pure: <T>(value: T) => pipeable(tagged({ value }, "some")),
  ap: (option, f) => f(option),
  map: (option, onSome) => (option._tag === "some" ? optionMonad.pure(onSome(option.value)) : option),
  flatMap: (option, onSome) => (option._tag === "some" ? onSome(option.value) : option),
};

export const some = optionMonad.pure;

export function none<T>(): Option<T> {
  return pipeable(tagged({}, "none"));
}

export const ap: {
  <T1, T2>(option: Option<T1>, apply: (option: Option<T1>) => Option<T2>): Option<T2>;
  <T1, T2>(apply: (option: Option<T1>) => Option<T2>): (option: Option<T1>) => Option<T2>;
} = dual(2, optionMonad.ap);

export const map: {
  <T1, T2>(option: Option<T1>, onSome: (value: T1) => T2): Option<T2>;
  <T1, T2>(onSome: (value: T1) => T2): (option: Option<T1>) => Option<T2>;
} = dual(2, optionMonad.map);

export const flatMap: {
  <T1, T2>(option: Option<T1>, onSome: (value: T1) => Option<T2>): Option<T2>;
  <T1, T2>(onSome: (value: T1) => Option<T2>): (option: Option<T1>) => Option<T2>;
} = dual(2, optionMonad.flatMap);
