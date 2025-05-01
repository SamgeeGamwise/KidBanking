import { Module } from '@nestjs/common';
import { BankingController } from './transaction.controller';
import { TransactionService } from './transaction.service';

@Module({
  controllers: [BankingController],
  providers: [TransactionService]
})
export class BankingModule {}
