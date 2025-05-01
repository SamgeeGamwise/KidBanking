import { Controller } from '@nestjs/common';
import { TransactionService } from './transaction.service'

@Controller('transaction')
export class BankingController {
    constructor(private transactionService: TransactionService) {}
}
