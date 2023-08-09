import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateOperationDto } from "./dto/create-operation.dto";
import { UpdateOperationDto } from "./dto/update-operation.dto";
import { PrismaService } from "../prisma/prisma.service";
import { paginate } from "../utils/paginate";
import { Operation, OperationType } from "@prisma/client";
import { decimalPlaces } from "../utils/etc";

@Injectable()
export class OperationsService {
  constructor(private db: PrismaService) {}

  async create(
    { accountId, ...createOperationDto }: CreateOperationDto,
    userId: number,
  ) {
    // вычесть значение, если это трата, прибавить, если доход
    const account = await this.db.account.findUnique({
      where: {
        id: accountId,
      },
    });
    const newAccountValue =
      createOperationDto.type === OperationType.INCOME
        ? account.value + createOperationDto.value
        : account.value - createOperationDto.value;

    const newAccountIncome =
      createOperationDto.type === OperationType.INCOME
        ? account.income + createOperationDto.value
        : account.income;
    const newAccountExpenses =
      createOperationDto.type === OperationType.EXPENSE
        ? account.expenses + createOperationDto.value
        : account.expenses;

    const updateAccountValue = this.db.account.update({
      where: {
        id: accountId,
      },
      data: {
        value: decimalPlaces(newAccountValue, 2),
        expenses: decimalPlaces(newAccountExpenses, 2),
        income: decimalPlaces(newAccountIncome, 2),
      },
    });

    const createOperation = this.db.operation.create({
      data: {
        account: {
          connect: {
            id: accountId,
          },
        },
        user: {
          connect: {
            id: userId,
          },
        },
        ...createOperationDto,
      },
    });

    return this.db.$transaction([updateAccountValue, createOperation]);
  }

  async findAll(userId: number, page = 1, limit = 10) {
    const operations = await this.db.operation.findMany({
      where: {
        userId,
      },
    });
    const pagable = paginate<Operation>(operations, limit);
    if (page < pagable.length) {
      return pagable[page];
    } else {
      throw new NotFoundException("");
    }
  }

  async findAllForAccount(accountId: number, page = 1, limit = 10) {
    const operations = await this.db.operation.findMany({
      where: {
        accountId,
      },
      orderBy: {
        created_at: "desc",
      },
    });
    const pageble = paginate(operations, limit);
    if (page <= pageble.length) {
      return pageble[page - 1];
    } else {
      throw new NotFoundException("");
    }
  }

  findOne(id: number) {
    return this.db.operation.findUnique({
      where: {
        id,
      },
    });
  }

  update(id: number, updateOperationDto: UpdateOperationDto) {
    return this.db.operation.update({
      where: {
        id,
      },
      data: updateOperationDto,
    });
  }

  remove(id: number) {
    return this.db.operation.delete({
      where: {
        id,
      },
    });
  }

  getIncomes(accountId: number, startDate: Date, endDate: Date) {
    return this.db.operation.findMany({
      where: {
        accountId,
        created_at: {
          gte: startDate,
          lte: endDate,
        },
        type: OperationType.INCOME,
      },
    });
  }

  getExpenses(accountId: number, startDate: Date, endDate: Date) {
    return this.db.operation.findMany({
      where: {
        accountId,
        created_at: {
          gte: startDate,
          lte: endDate,
        },
        type: OperationType.EXPENSE,
      },
    });
  }
}
