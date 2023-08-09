import { Module } from "@nestjs/common";
import { ChartsService } from "./charts.service";
import { ChartsController } from "./charts.controller";
import { OperationsService } from "../operations/operations.service";
import { PrismaService } from "../prisma/prisma.service";

@Module({
  controllers: [ChartsController],
  providers: [ChartsService, OperationsService, PrismaService],
})
export class ChartsModule {}
