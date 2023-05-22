import { Injectable } from "@nestjs/common";
import { CreateOperationDto } from "./dto/create-operation.dto";
import { UpdateOperationDto } from "./dto/update-operation.dto";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class OperationsService {
  constructor(private db: PrismaService) {}

  create(
    { accountId, ...createOperationDto }: CreateOperationDto,
    userId: number,
  ) {
    return this.db.operation.create({
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
  }

  findAll(userId: number) {
    return this.db.operation.findMany({
      where: {
        userId,
      },
    });
  }

  findAllForAccount(accountId: number) {
    return this.db.operation.findMany({
      where: {
        accountId,
      },
    });
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
}
