import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateAccountDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsNumber()
  value: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  description?: string;
}
