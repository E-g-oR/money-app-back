import { ApiProperty } from "@nestjs/swagger";

export class DeptDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  value: number;

  @ApiProperty()
  valueCovered: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  deadline: string;
}
