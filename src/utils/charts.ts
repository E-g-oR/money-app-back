import { Operation } from "@prisma/client";
import { flow } from "fp-ts/function";
import * as O from "fp-ts/Option";
import * as RNEA from "fp-ts/ReadonlyNonEmptyArray";
import * as RR from "fp-ts/ReadonlyRecord";
import * as A from "fp-ts/ReadonlyArray";
import { ChartPointDto } from "../charts/dto/chart-data.dto";
import { Eq } from "fp-ts/number";

/**
 * Function gets date of the transaction without time, in order to group them all by the day
 * @param transaction every operation in the list
 */
const groupByDay = (transaction: Operation) =>
  transaction.created_at.toISOString().split("T")[0];

/**
 *  Function gets month of the transaction for grouping them by month
 * @param transaction
 */
const groupByMonth = (transaction: Operation) =>
  transaction.created_at.getMonth().toString();

/**
 * Function calculates sum of all transactions for the day
 * @param acc accumulator value
 * @param transaction every operation in the list
 *
 * @returns number
 */
const reduceValues = (acc: number, transaction: Operation) =>
  acc + transaction.value;

const processTransactions = (view: "year" | "month") =>
  flow(
    RNEA.groupBy(view === "year" ? groupByMonth : groupByDay),
    RR.map(A.reduce(0, reduceValues)),
    RR.toEntries,
    A.map(([date, value]) => ({ date, value })),
  );

type ProcessTransactionsToChartDataType = (
  view: "year" | "month",
) => (
  transactions: ReadonlyArray<Operation>,
) => ReadonlyArray<ChartPointDto> | null;

/**
 * Function processes list of transactions, groups them by the day (month) and calculates the sum of transactions for the day (month)
 */
export const processTransactionsToChartData: ProcessTransactionsToChartDataType =
  (view: "year" | "month" = "month") =>
    flow(
      RNEA.fromReadonlyArray<Operation>,
      O.fold(() => null, processTransactions(view)),
    );

/**
 * Function processes list of transactions to ChartFiltersDto
 */
export const processTransactionsToChartFilters = flow(
  RNEA.fromArray,
  O.fold(
    () => null,
    flow(
      RNEA.map((item: Operation) => new Date(item.created_at)),
      RNEA.groupBy((item) => item.getUTCFullYear().toString()),
      RR.map(
        flow(
          RNEA.map((date) => date.getUTCMonth()),
          RNEA.uniq(Eq),
        ),
      ),
    ),
  ),
);
