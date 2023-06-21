import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto, RegisterDto } from "src/dto/auth";
import { Tokens } from "src/types";
import { GetUser, Public } from "./decorator";
import { User } from "@prisma/client";
import { RefreshGuard } from "./guard";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post("login")
  login(@Body() body: AuthDto): Promise<Tokens> {
    return this.authService.login(body);
  }

  @Public()
  @HttpCode(HttpStatus.CREATED)
  @Post("register")
  register(@Body() body: RegisterDto): Promise<Tokens> {
    return this.authService.register(body);
  }

  @HttpCode(HttpStatus.OK)
  @Post("logout")
  logout(@GetUser() user: User) {
    return this.authService.logout(user.id);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @UseGuards(RefreshGuard)
  @Post("refresh")
  refreshTokens(@GetUser() user: User) {
    return this.authService.refreshTokens({ sub: user.id, email: user.email });
  }
}
