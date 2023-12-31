import { ApiProperty } from "@nestjs/swagger";

enum OperationType {
  INCOME = "INCOME",
  EXPENSE = "EXPENSE",
}

export class CreateOperationDto {
  @ApiProperty()
  accountId: number;

  @ApiProperty()
  value: number;

  @ApiProperty()
  type: OperationType;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description?: string;
}
