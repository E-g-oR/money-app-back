import {
  Body,
  Controller,
  Get,
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
import {
  ApiBody,
  ApiHeader,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";

@ApiTags("Authorization")
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: "Log in the application" })
  @ApiBody({ type: AuthDto })
  @ApiResponse({ type: Tokens })
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post("login")
  login(@Body() body: AuthDto): Promise<Tokens> {
    return this.authService.login(body);
  }

  @ApiOperation({ summary: "Register in the application" })
  @ApiBody({ type: RegisterDto })
  @ApiResponse({ type: Tokens })
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

  @ApiOperation({ description: "Refresh tokens" })
  @ApiResponse({ type: Tokens })
  @ApiHeader({
    name: "Authorization",
    description: "Bearer token",
    example: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6Ikp...",
  })
  @Public()
  @HttpCode(HttpStatus.OK)
  @UseGuards(RefreshGuard)
  @Get("refresh")
  refreshTokens(@GetUser() user: User) {
    return this.authService.refreshTokens({ sub: user.id, email: user.email });
  }
}
