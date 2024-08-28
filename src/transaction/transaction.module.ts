import { Module } from '@nestjs/common';
import { BankingController } from './transaction.controller';
import { BankingService } from './transaction.service';

@Module({
  controllers: [BankingController],
  providers: [BankingService]
})
export class BankingModule {}
