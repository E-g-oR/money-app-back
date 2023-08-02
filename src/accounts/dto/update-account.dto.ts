import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class UpdateAccountDto {
  @ApiProperty({ required: false, example: "Salary" })
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty({
    required: false,
    example: "Main account where i get salary and pay for the groceries",
  })
  @IsString()
  @IsOptional()
  description?: string;
}
