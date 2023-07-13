import { Operation } from "@prisma/client";
import { flow } from "fp-ts/function";
import * as O from "fp-ts/Option";
import * as RNEA from "fp-ts/ReadonlyNonEmptyArray";
import * as RR from "fp-ts/ReadonlyRecord";
import * as A from "fp-ts/ReadonlyArray";

/**
 * Function gets date of the transaction without time, in order to group them all by the day
 * @param transaction every operation in the list
 */
const groupByDay = (transaction: Operation) =>
  transaction.created_at.toISOString().split("T")[0];

/**
 * Function calculates sum of all transactions for the day
 * @param acc accumulator value
 * @param transaction every operation in the list
 *
 * @returns number
 */
const reduceValuesForDay = (acc: number, transaction: Operation) =>
  acc + transaction.value;

const processTransactions = flow(
  RNEA.groupBy(groupByDay),
  RR.map(A.reduce(0, reduceValuesForDay)),
);

type ChartLine = Record<string, number>;
type ProcessTransactionsToChartDataType = (
  transactions: ReadonlyArray<Operation>,
) => ChartLine | null;
/**
 * Function processes list of transactions, groups them by the day and calculates the sum of transactions for the day
 */
export const processTransactionsToChartData: ProcessTransactionsToChartDataType =
  flow(
    RNEA.fromReadonlyArray<Operation>,
    O.fold(() => null, processTransactions),
  );
