import { PartialType } from "@nestjs/mapped-types";
import { CreateDepthDto } from "./create-depth.dto";
import { IsNotEmpty, IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateDepthDto extends PartialType(CreateDepthDto) {}

export class PayDepthDto {
  @ApiProperty({
    description: "Id of account from which you gonna pay the dept",
  })
  @IsNotEmpty()
  @IsNumber()
  accountId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  value: number;
}
