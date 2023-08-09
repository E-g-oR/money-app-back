import { ApiProperty } from "@nestjs/swagger";

export class ChartPointDto {
  @ApiProperty()
  date: string;

  @ApiProperty()
  value: number;
}

export class ChartLineDto {
  @ApiProperty()
  lineKey: string;
  @ApiProperty({ required: false, type: [ChartPointDto] })
  lineData: ReadonlyArray<ChartPointDto>;
}

export class ChartDataDto {
  @ApiProperty({ type: [ChartLineDto] })
  chartLines: ReadonlyArray<ChartLineDto>;
}
