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
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateOperationDto } from "../operations/dto/create-operation.dto";
import { DeptDto } from "./dto/dept.dto";

// import { Depth } from "./entities/depth.entity";

@ApiTags("Depts controller")
@Controller("depths")
export class DepthsController {
  constructor(private readonly depthsService: DepthsService) {}

  @ApiOperation({ summary: "Create dept" })
  @ApiBody({ type: CreateDepthDto })
  @ApiResponse({ type: DeptDto })
  @Post()
  create(@Body() createDepthDto: CreateDepthDto, @GetUser() user: User) {
    return this.depthsService.create(user.id, createDepthDto);
  }

  @ApiOperation({ summary: "Get all depts for user" })
  @ApiResponse({ type: Array<DeptDto> })
  @Get()
  findAll(@GetUser() user: User) {
    return this.depthsService.findAll(user.id);
  }

  @ApiOperation({ summary: "Get specific dept" })
  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.depthsService.findOne(id);
  }

  @ApiOperation({ summary: "Update dept" })
  @Patch(":id")
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateDepthDto: UpdateDepthDto,
  ) {
    return this.depthsService.update(id, updateDepthDto);
  }

  @ApiOperation({ summary: "Pay for dept" })
  @ApiBody({ type: PayDepthDto })
  @ApiResponse({ type: DeptDto })
  @Patch("pay/:id")
  payDepth(
    @Param("id", ParseIntPipe) id: number,
    @Body() payDepthDto: PayDepthDto,
    @GetUser() user: User,
  ) {
    return this.depthsService.payDepth(id, payDepthDto, user.id);
  }

  @ApiOperation({ summary: "Delete dept" })
  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.depthsService.remove(id);
  }
}
