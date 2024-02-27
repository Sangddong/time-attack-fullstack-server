import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Req,
  Body,
} from '@nestjs/common';
import { DealsService } from './deals.service';
import { CreateDeal, UpdateDeal } from './deals.type';
import { PrismaService } from 'src/prisma/prisma/prisma.service';
import { Request } from 'express';
import { AuthRequest } from 'src/types/user.type';

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
  async createDeal(@Req() req: AuthRequest, @Body() data: CreateDeal) {
    const userId = req.user.id;
    return this.dealsService.createDeal(data, userId);
  }

  @Patch(':dealId/edit')
  async updateDeal(@Param('dealId') dealId: number, @Body() data: UpdateDeal) {
    return this.dealsService.updateDeal(dealId, data);
  }

  @Delete(':dealId')
  async deleteDeal(@Param('dealId') dealId: number) {
    return this.dealsService.deleteDeal(dealId);
  }

  @Patch(':dealId')
  updateViews(@Param('dealId') dealId: number) {
    return this.dealsService.updateView(dealId);
  }
}
