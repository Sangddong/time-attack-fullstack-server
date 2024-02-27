import { Module } from '@nestjs/common';
import { DealsService } from './deals.service';
import { DealsController } from './deals.controller';
import { PrismaModule } from 'src/prisma/prisma/prisma.module';

@Module({
  controllers: [DealsController],
  providers: [DealsService],
  exports: [DealsService],
  imports: [PrismaModule],
})
export class DealsModule { }
