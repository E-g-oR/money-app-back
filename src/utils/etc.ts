import { pipe } from "fp-ts/function";
import { match } from "ts-pattern";
// import { match } from "ts-pattern";

const multiplyBy10pow = (power: number) => (value: number) =>
  value * Math.pow(10, power);
const divideBy10pow = (power: number) => (value: number) =>
  value / Math.pow(10, power);

export const decimalPlaces = (value: number, precision: number) =>
  match(precision)
    .with(0, () => Math.round(value))
    .when(
      (a) => a < 0,
      () => pipe(value, divideBy10pow(precision), Math.round),
    )
    .otherwise(() =>
      pipe(
        value,
        multiplyBy10pow(precision),
        Math.round,
        divideBy10pow(precision),
      ),
    );
