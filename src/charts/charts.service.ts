import { Injectable } from "@nestjs/common";
import { OperationsService } from "../operations/operations.service";
import { PrismaService } from "../prisma/prisma.service";
import { endOfMonth, endOfYear, startOfMonth, startOfYear } from "date-fns";
import {
  processTransactionsToChartData,
  processTransactionsToChartFilters,
} from "../utils/charts";
import { ChartDataDto } from "./dto/chart-data.dto";
import { ChartFiltersDto } from "./dto/chart-filters.dto";

@Injectable()
export class ChartsService {
  constructor(
    private operationsService: OperationsService,
    private db: PrismaService,
  ) {}

  async getFiltersForChart(
    userId: number,
    accountId: number,
  ): Promise<ChartFiltersDto> {
    const transactions = await this.db.operation.findMany({
      where: {
        userId,
        accountId,
      },
    });
    const filter = processTransactionsToChartFilters(transactions);
    return { data: filter };
  }

  async getChartDataYear(
    userId: number,
    accountId: number,
    year: number,
    month: number,
    view: "month" | "year",
  ): Promise<ChartDataDto> {
    const date = new Date(year, month),
      start = view === "year" ? startOfYear(date) : startOfMonth(date),
      end = view === "year" ? endOfYear(date) : endOfMonth(date);

    const incomes = await this.operationsService
      .getIncomes(accountId, start, end)
      .then(processTransactionsToChartData(view));
    const expenses = await this.operationsService
      .getExpenses(accountId, start, end)
      .then(processTransactionsToChartData(view));

    return {
      chartLines: [
        {
          lineKey: "incomes",
          lineData: incomes,
        },
        {
          lineKey: "expenses",
          lineData: expenses,
        },
      ],
    };
  }
}
