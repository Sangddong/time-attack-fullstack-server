import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma/prisma.service';
import { UpdateDeal } from './deals.type';
import { Prisma } from '@prisma/client';
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
    });
    if (!deal) throw new Error('존재하지 않는 게시글입니다.');

    const updatedDeal = await this.prismaService.deals.update({
      where: { id: dealId },
      data: {
        views: {
          increment: 1,
        },
      },
    });

    return updatedDeal;
  }

  async createDeal(data: Prisma.DealsUncheckedCreateInput) {
    const newDeal = await this.prismaService.deals.create({ data });

    return newDeal;
  }

  async updateDeal(dealId: number, data: UpdateDeal) {
    const deal = await this.prismaService.deals.findUnique({
      where: { id: dealId },
    });
    if (!deal) throw new Error('존재하지 않는 게시글입니다.');
    const updatedDeal = await this.prismaService.deals.update({
      where: { id: dealId },
      data,
    });

    return updatedDeal;
  }

  async deleteDeal(dealId: number) {
    const deal = await this.prismaService.deals.findUnique({
      where: { id: dealId },
    });
    if (!deal) throw new Error('존재하지 않는 게시글입니다.');
    await this.prismaService.deals.delete({
      where: {
        id: dealId,
      },
    });
  }
}
