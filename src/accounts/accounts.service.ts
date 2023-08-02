import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateAccountDto } from "./dto/create-account.dto";
import { UpdateAccountDto } from "./dto/update-account.dto";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class AccountsService {
  constructor(private db: PrismaService) {}

  async create(userId: number, createAccountDto: CreateAccountDto) {
    const newAccount = await this.db.account.create({
      data: {
        ...createAccountDto,
        userId,
      },
    });
    return newAccount;
  }

  findAll(userId: number) {
    return this.db.account.findMany({
      where: {
        userId,
      },
      select: {
        id: true,
        name: true,
        value: true,
        income: true,
        expenses: true,
      },
      orderBy: {
        updated_at: "desc",
      },
    });
  }

  async findOne(id: number) {
    const account = await this.db.account.findUnique({
      where: {
        id,
      },
    });
    if (!account) {
      throw new NotFoundException("No account with given id " + id);
    }
    return account;
  }

  update(id: number, updateAccountDto: UpdateAccountDto) {
    return this.db.account.update({
      where: {
        id,
      },
      data: updateAccountDto,
    });
  }

  async remove(id: number) {
    return this.db.account.delete({
      where: { id },
    });
  }
}
