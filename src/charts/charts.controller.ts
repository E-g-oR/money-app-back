import { Controller, Get, Param, ParseIntPipe, Query } from "@nestjs/common";
import { ChartsService } from "./charts.service";
import { GetUser } from "../auth/decorator";
import { User } from "@prisma/client";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { OperationDto } from "../operations/dto/operation.dto";
import { ChartDataDto } from "./dto/chart-data.dto";
import { ChartFiltersDto } from "./dto/chart-filters.dto";

@ApiTags("Charts controller")
@Controller("charts")
export class ChartsController {
  constructor(private readonly chartsService: ChartsService) {}

  @ApiOperation({ summary: "Get chart data" })
  @ApiResponse({ type: ChartFiltersDto })
  @Get("filters/:accountId")
  getFilters(
    @GetUser() user: User,
    @Param("accountId", ParseIntPipe) accountId: number,
  ) {
    return this.chartsService.getFiltersForChart(user.id, accountId);
  }

  @ApiOperation({ summary: "Get chart data" })
  @ApiResponse({ type: ChartDataDto })
  @Get(":accountId")
  getChartData(
    @GetUser() user: User,
    @Param("accountId", ParseIntPipe) accountId: number,
    @Query("year", ParseIntPipe) year: number,
    @Query("month", ParseIntPipe) month: number,
    @Query("view") view: "year" | "month" = "month",
  ) {
    return this.chartsService.getChartDataYear(
      user.id,
      accountId,
      year,
      month,
      view,
    );
  }
}
