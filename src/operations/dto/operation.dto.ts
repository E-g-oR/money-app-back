import { OperationType } from "@prisma/client";
import { ApiProperty } from "@nestjs/swagger";

export class OperationDto {
  @ApiProperty()
  accountId: number;

  @ApiProperty()
  created_at: string;

  @ApiProperty({ required: false })
  description: string;

  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  type: OperationType;

  @ApiProperty()
  updated_at: string;

  @ApiProperty()
  userId: number;

  @ApiProperty()
  value: number;
}
