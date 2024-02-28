import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma/prisma.service';
import { CreateDeal, UpdateDeal } from './deals.type';
import { Prisma, User } from '@prisma/client';
@Injectable()
export class DealsService {
  constructor(private readonly prismaService: PrismaService) { }

  async getDeals() {
    const deals = await this.prismaService.deals.findMany();

    return deals;
  }

  async getDeal(dealId: number) {
    const deal = await this.prismaService.deals.findUnique({
      where: { id: dealId },
      data: {
        views: {
          increment: 1,
        },
      },
    });

    return deal;
  }

  async createDeal(data: Prisma.DealsCreateInput) {
    const newDeal = await this.prismaService.deals.create({
      data: {
        ...data,
      },
    });

    console.log(data);
    return newDeal;
  }

  async updateDeal(dealId: number, data: UpdateDeal) {
    const deal = await this.prismaService.deals.update({
      where: { id: dealId },
      data,
    });

    return deal;
  }

  async deleteDeal(dealId: number) {
    const deal = await this.prismaService.deals.delete({
      where: { id: dealId },
    });

    return deal;
  }
}
