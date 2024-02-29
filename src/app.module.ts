import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma/prisma.module';
import { AccountsModule } from './domains/accounts/accounts.module';
import { DealsModule } from './domains/deals/deals.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthGuard } from './guard/auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AccountsModule,
    DealsModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
    }),
  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_GUARD, useClass: AuthGuard }],
})
export class AppModule { }
