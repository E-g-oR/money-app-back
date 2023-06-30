import { PartialType } from "@nestjs/mapped-types";
import { CreateDepthDto } from "./create-depth.dto";
import { IsNotEmpty, IsNumber } from "class-validator";

export class UpdateDepthDto extends PartialType(CreateDepthDto) {}

export class PayDepthDto {
  @IsNotEmpty()
  @IsNumber()
  accountId: number;

  @IsNotEmpty()
  @IsNumber()
  value: number;
}
