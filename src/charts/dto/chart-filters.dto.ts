import { ApiProperty } from "@nestjs/swagger";

export class ChartFiltersDto {
  @ApiProperty({
    type: "object",
    additionalProperties: { type: "array", items: { type: "number" } },
  })
  data: Record<number, number[]>;
}
