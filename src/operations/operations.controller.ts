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
import { OperationsService } from "./operations.service";
import { CreateOperationDto } from "./dto/create-operation.dto";
import { UpdateOperationDto } from "./dto/update-operation.dto";
import { GetUser } from "../auth/decorator";
import { User } from "@prisma/client";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { OperationDto } from "./dto/operation.dto";

@ApiTags("Transactions controller")
@Controller("transactions")
export class OperationsController {
  constructor(private readonly operationsService: OperationsService) {}

  @Post()
  create(
    @Body() createOperationDto: CreateOperationDto,
    @GetUser() user: User,
  ) {
    return this.operationsService.create(createOperationDto, user.id);
  }

  @Get()
  findAll(@GetUser() user: User) {
    return this.operationsService.findAll(user.id);
  }

  @ApiOperation({ summary: "Get all operations for account" })
  @ApiResponse({ type: [OperationDto] })
  @Get("account/:accountId")
  findAllForAccount(@Param("accountId", ParseIntPipe) accountId: number) {
    return this.operationsService.findAllForAccount(accountId);
  }

  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.operationsService.findOne(id);
  }

  @Patch(":id")
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateOperationDto: UpdateOperationDto,
  ) {
    return this.operationsService.update(id, updateOperationDto);
  }

  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.operationsService.remove(id);
  }
}

/**
 * Listen, is not that at all. I'm absolutely not lonely, I just don't feel it.
 * You know I love being alone, it doesn't bother me at all and I even enjoy it.
 * And I don't rush into relationships, I just don't need it. If I wanted that, I would be having someone so far.
 * I don't want relationships myself, but fun thing is that with you, I want to love, you know. I want to share my energy, take care and all those things.
 * The point is that you are special for me. The most special one.
 * I love and appreciate it. And you know that I love you not just as friend. You knew I was loving you as a girl all that time. And I am very serious about everything im saying.
 * I do want to be your friend. But only when we also more than just friends. I can't be JUST your friend.
 * However, it wouldn't change anything at all anyway. It doesn't add some new duties, any limits or something. We would literally keep talking as we used to talk.
 */
