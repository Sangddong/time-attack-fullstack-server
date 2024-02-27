import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from 'src/prisma/prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { DealsModule } from 'src/domains/deals/deals.module';
@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [PrismaModule, ConfigModule, DealsModule],
})
export class UsersModule { }
