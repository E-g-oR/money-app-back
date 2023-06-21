import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateAccountDto {
  @IsNotEmpty()
  @IsNumber()
  value: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;
}
