import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from "@nestjs/common";
import { User } from "@prisma/client";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AccountsService } from "./accounts.service";
import { CreateAccountDto } from "./dto/create-account.dto";
import { UpdateAccountDto } from "./dto/update-account.dto";
import { GetUser } from "../auth/decorator";
import { AccountDto } from "./dto/account.dto";

@ApiTags("Accounts")
@Controller("accounts")
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @ApiOperation({ summary: "Create an account" })
  @ApiBody({ type: CreateAccountDto })
  @ApiResponse({ type: AccountDto })
  @Post("new")
  create(@Body() body: CreateAccountDto, @GetUser() user: User) {
    // console.log(user);
    return this.accountsService.create(user.id, body);
  }

  @Get()
  findAll(@GetUser() user: User) {
    return this.accountsService.findAll(user.id);
  }

  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.accountsService.findOne(id);
  }

  @ApiOperation({ summary: "Update account" })
  @ApiBody({ type: UpdateAccountDto })
  @ApiResponse({ type: AccountDto })
  @Patch(":id")
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateAccountDto: UpdateAccountDto,
  ) {
    return this.accountsService.update(id, updateAccountDto);
  }

  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.accountsService.remove(id);
  }
}
