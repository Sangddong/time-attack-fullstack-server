import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma/prisma.module';
import { AccountsModule } from './domains/accounts/accounts.module';
@Module({
  imports: [PrismaModule, AccountsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
