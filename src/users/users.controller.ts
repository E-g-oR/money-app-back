import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { GetUser } from "src/auth/decorator";
import { User } from "@prisma/client";

@Controller("users")
export class UsersController {
  @Get("me")
  getMe(@GetUser() user: User) {
    // console.log(user);
    return user;
  }
}
