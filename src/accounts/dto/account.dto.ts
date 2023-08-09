import { ApiProperty } from "@nestjs/swagger";

export class AccountDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  value: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  expenses: number;

  @ApiProperty()
  income: number;
}
