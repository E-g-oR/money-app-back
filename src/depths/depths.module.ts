import { Module } from "@nestjs/common";
import { DepthsService } from "./depths.service";
import { DepthsController } from "./depths.controller";
import { AccountsService } from "../accounts/accounts.service";
import { OperationsService } from "../operations/operations.service";

@Module({
  controllers: [DepthsController],
  providers: [DepthsService, AccountsService, OperationsService],
})
export class DepthsModule {}
