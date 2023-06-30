import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";

export class CreateDepthDto {
  @IsNotEmpty()
  @IsNumber()
  value: number;

  @IsNumber()
  @IsOptional()
  valueCovered?: number;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsDateString()
  @IsNotEmpty()
  deadline: Date;
}
