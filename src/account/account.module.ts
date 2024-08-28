import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { accountProviders } from './account.providers'
import { databaseProviders } from '../database/database.providers'

@Module({
  imports: [],
  controllers: [AccountController],
  providers: [AccountService, ...accountProviders, ...databaseProviders]
})
export class AccountModule {}
