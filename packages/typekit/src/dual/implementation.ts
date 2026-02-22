type AnyFn = (...args: any[]) => any;

export function dual<DataFirst extends AnyFn, DataLast extends AnyFn>(
  arity: number,
  body: AnyFn,
): DataFirst & DataLast {
  if (arity === 2) {
    return function (a: any, b: any) {
      if (arguments.length === 2) {
        return body(a, b);
      }

      return (b: any) => body(b, a);
    } as any;
  }

  return function (...args: any[]) {
    if (args.length >= arity) {
      return body(...args);
    }

    return (a: any) => body(a, ...args);
  } as any;
}
