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
import { DepthsService } from "./depths.service";
import { CreateDepthDto } from "./dto/create-depth.dto";
import { PayDepthDto, UpdateDepthDto } from "./dto/update-depth.dto";
import { GetUser } from "../auth/decorator";
import { User } from "@prisma/client";

@Controller("depths")
export class DepthsController {
  constructor(private readonly depthsService: DepthsService) {}

  @Post()
  create(@Body() createDepthDto: CreateDepthDto, @GetUser() user: User) {
    return this.depthsService.create(user.id, createDepthDto);
  }

  @Get()
  findAll(@GetUser() user: User) {
    return this.depthsService.findAll(user.id);
  }

  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.depthsService.findOne(id);
  }

  @Patch(":id")
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateDepthDto: UpdateDepthDto,
  ) {
    return this.depthsService.update(id, updateDepthDto);
  }

  @Patch("pay/:id")
  payDepth(
    @Param("id", ParseIntPipe) id: number,
    @Body() payDepthDto: PayDepthDto,
    @GetUser() user: User,
  ) {
    return this.depthsService.payDepth(id, payDepthDto, user.id);
  }

  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.depthsService.remove(id);
  }
}
