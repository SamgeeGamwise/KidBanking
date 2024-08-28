import { Body, Controller, Get, Post } from '@nestjs/common';
import { BankingService } from './transaction.service'

@Controller('banking')
export class BankingController {
    constructor(private bankingService: BankingService) {}

    @Get()
    async getAll() {
        const res = await this.bankingService.getTransactions()
        return res
    }


    @Post()
    async new(@Body() transaction) {
        const res = await this.bankingService.addTransaction(transaction)
        return res
    }
}
