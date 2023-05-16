import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class AuthDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

export class RegisterDto extends AuthDto {
  @IsString()
  firstName?: string;

  @IsString()
  lastName?: string;
}
