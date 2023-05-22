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

@Controller("operations")
export class OperationsController {
  constructor(private readonly operationsService: OperationsService) {}

  @Post()
  create(
    @Body() createOperationDto: CreateOperationDto,
    @GetUser() user: User,
  ) {
    /** todo expense
     * const accountValue = account.value
     * const newAccountValue = accountValue - incomingValue
     *
     * -  нужно от значения счета вычесть сумму
     * - затем округлить значение счета до ближайшего меньшего числа
     *
     * const finalAccountValue = Math.floor(newAccountValue)
     * const diff = newAccountValue - finalAccountValue
     *
     * записать diff, finalAccountValue, incomingValue в копилку, значение аккаунта, и операцию соответственно
     */

    /** todo income
     * const accountValue = account.value
     * - получить 10% от дохода
     * const percents = incomingValue / 100 * 10
     * const newAccountValue = accountValue + incomingValue
     * - записать newAccountValue incomingValue в базу
     * - создать операцию expense со значением percents для перевода в копилку
     */
    return this.operationsService.create(createOperationDto, user.id);
  }

  @Get()
  findAll(@GetUser() user: User) {
    return this.operationsService.findAll(user.id);
  }

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
