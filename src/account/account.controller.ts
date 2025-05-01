import { Controller } from '@nestjs/common';
import { AccountService } from './account.service'
import { TransactionService } from '../transaction/transaction.service'

@Controller('account')
export class AccountController {
    constructor(private readonly accountService: AccountService, private readonly transactionService: TransactionService) {}

    

}
