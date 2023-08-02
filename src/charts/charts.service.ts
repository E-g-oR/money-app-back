import { Injectable, NotFoundException } from "@nestjs/common";
import { OperationsService } from "../operations/operations.service";
import { PrismaService } from "../prisma/prisma.service";
import { flow, pipe } from "fp-ts/function";
import * as RNEA from "fp-ts/ReadonlyNonEmptyArray";
import * as O from "fp-ts/Option";
import * as RR from "fp-ts/ReadonlyRecord";
import { Eq } from "fp-ts/string";
import { endOfMonth, endOfYear, startOfMonth, startOfYear } from "date-fns";
import { processTransactionsToChartData, ChartLine } from "../utils/charts";

@Injectable()
export class ChartsService {
  constructor(
    private operationsService: OperationsService,
    private db: PrismaService,
  ) {}

  async getFiltersForChart(userId: number, accountId: number) {
    const transactions = await this.db.operation.findMany({
      where: {
        userId,
        accountId,
      },
    });

    const filter = pipe(
      transactions,
      RNEA.fromArray,
      O.fold(
        () => null,
        flow(
          RNEA.map((item) => new Date(item.created_at)),
          RNEA.groupBy((item) => item.getUTCFullYear().toString()),
          RR.map(
            flow(
              RNEA.map((date) => date.getUTCMonth().toString()),
              RNEA.uniq(Eq),
            ),
          ),
        ),
      ),
    );
    console.log(filter);
    if (filter === null) {
      throw new NotFoundException("No transactions in that period");
    }
    return filter;
  }

  async getChartDataYear(
    userId: number,
    year: number,
    month: number,
    view: "month" | "year",
  ) {
    const date = new Date(year, month),
      start = view === "year" ? startOfYear(date) : startOfMonth(date),
      end = view === "year" ? endOfYear(date) : endOfMonth(date);

    const incomes = await this.operationsService
      .getIncomes(userId, start, end)
      .then(processTransactionsToChartData);
    const expenses = await this.operationsService
      .getExpenses(userId, start, end)
      .then(processTransactionsToChartData);

    return { incomes, expenses };
  }
}
