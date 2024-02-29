import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Body,
  Req,
} from '@nestjs/common';
import { DealsService } from './deals.service';
import { CreateDeal, UpdateDeal } from './deals.type';
import { Private } from 'src/decorator/private.decorator';
import { PrismaService } from 'src/prisma/prisma/prisma.service';
import { User } from '@prisma/client';
import { DUser } from 'src/decorator/user.decorator';

@Controller('deals')
export class DealsController {
  constructor(
    private readonly dealsService: DealsService,
    private readonly prismaService: PrismaService,
  ) { }

  @Get()
  getDeals() {
    return this.dealsService.getDeals();
  }

  @Get(':dealId')
  getDeal(@Param('dealId', ParseIntPipe) dealId: number) {
    return this.dealsService.getDeal(dealId);
  }

  @Post('create')
  @Private('user')
  async createDeal(@DUser() user: User, @Body() dto: CreateDeal) {
    return this.dealsService.createDeal({ ...dto, userId: user.id });
  }

  @Patch(':dealId/edit')
  @Private('user')
  async updateDeal(
    @Param('dealId', ParseIntPipe) dealId: number,
    @Body() data: UpdateDeal,
  ) {
    return this.dealsService.updateDeal(dealId, data);
  }

  @Delete(':dealId')
  @Private('user')
  async deleteDeal(@Param('dealId', ParseIntPipe) dealId: number) {
    return this.dealsService.deleteDeal(dealId);
  }
}
