import { Controller, Get, Param, ParseIntPipe, Query } from "@nestjs/common";
import { ChartsService } from "./charts.service";
import { GetUser } from "../auth/decorator";
import { User } from "@prisma/client";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Charts controller")
@Controller("charts")
export class ChartsController {
  constructor(private readonly chartsService: ChartsService) {}

  @Get("filters/:accountId")
  getFilters(
    @GetUser() user: User,
    @Param("accountId", ParseIntPipe) accountId: number,
  ) {
    return this.chartsService.getFiltersForChart(user.id, accountId);
  }

  @Get()
  getChartData(
    @GetUser() user: User,
    @Query("year", ParseIntPipe) year: number,
    @Query("month", ParseIntPipe) month: number,
    @Query("view") view: "year" | "month" = "month",
  ) {
    return this.chartsService.getChartDataYear(user.id, year, month, view);
  }
}
