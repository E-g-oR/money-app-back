import { Injectable } from "@nestjs/common";
import { CreateDepthDto } from "./dto/create-depth.dto";
import { PayDepthDto, UpdateDepthDto } from "./dto/update-depth.dto";
import { PrismaService } from "../prisma/prisma.service";
import { AccountsService } from "../accounts/accounts.service";
import { OperationsService } from "../operations/operations.service";
import { sortDepts } from "../utils/depts";
import { OperationType } from "@prisma/client";

@Injectable()
export class DepthsService {
  constructor(
    private db: PrismaService,
    private accountsService: AccountsService,
    private transactionsService: OperationsService,
  ) {}

  create(userId: number, createDepthDto: CreateDepthDto) {
    return this.db.depth.create({
      data: {
        ...createDepthDto,
        user: {
          connect: {
            id: userId,
          },
        },
      },
      select: {
        id: true,
        description: true,
        value: true,
        title: true,
        valueCovered: true,
        deadline: true,
      },
    });
  }

  /**
   * Get all depts for user
   *
   * @param userId
   *

   */
  async findAll(userId: number) {
    const depts = await this.db.depth.findMany({
      where: {
        userId,
      },
    });

    return sortDepts(depts);
  }

  findOne(id: number) {
    return this.db.depth.findUnique({
      where: {
        id,
      },
    });
  }

  update(depthId: number, updateDepthDto: UpdateDepthDto) {
    return this.db.depth.update({
      where: {
        id: depthId,
      },
      data: {
        ...updateDepthDto,
      },
    });
  }

  remove(id: number) {
    return this.db.depth.delete({
      where: {
        id,
      },
    });
  }

  /**
   * Pay depth from selected account
   * @param depthId
   * @param payDepthDto
   * @param userId
   */
  async payDepth(depthId: number, payDepthDto: PayDepthDto, userId: number) {
    // TODO create transaction for paying depth

    const depth = await this.db.depth.findUnique({
      where: { id: depthId },
    });

    const account = await this.accountsService.findOne(payDepthDto.accountId);

    await this.transactionsService.create(
      {
        title: depth.title,
        description: depth.description,
        accountId: account.id,
        value: payDepthDto.value,
        type: OperationType.EXPENSE,
      },
      userId,
    );

    return this.update(depthId, {
      valueCovered: depth.valueCovered + payDepthDto.value,
    });
  }
}
