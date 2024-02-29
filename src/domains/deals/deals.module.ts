import { Module } from '@nestjs/common';
import { DealsController } from './deals.controller';
import { PrismaModule } from 'src/prisma/prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { DealsService } from './deals.service';

@Module({
  controllers: [DealsController],
  providers: [DealsService],
  exports: [DealsService],
  imports: [PrismaModule, ConfigModule],
})
export class DealsModule { }
