import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { AccountService } from './account.service'
import { CreateAccountDto, CreateTransactionDto, TransferTransactionDto, UpdateAccountDto } from './account.dto'

@Controller('account')
export class AccountController {
    constructor(private readonly accountService: AccountService) { }

    @Get(':id')
    async getAccount(@Param('id') id: string) {
        return await this.accountService.getAccountById(id);
    }

    @Post()
    async createAccount(@Body() createUserDto: CreateAccountDto) {
        return await this.accountService.createAccount(createUserDto.name);
    }
    
    @Patch(":id")
    async updateAccountName(@Param('id') id: string, @Body() updateUserDto: UpdateAccountDto) {
        return await this.accountService.updateAccountName(id, updateUserDto.name);
    }
    
    @Delete(":id")
    async deleteAccount(@Param('id') id: string) {
        return await this.accountService.deleteAccountById(id);
    }

    @Get(':id/transaction')
    async getTransactions(@Param('id') id: string, @Query('search') search: string) {
        return await this.accountService.getTransactionsByAccountId(id, search);
    }

    @Post(':id/transaction')
    async createTransaction(@Param('id') id: string, @Body() createTransactionDto: CreateTransactionDto) {
        const { amount, name, memo } = createTransactionDto;
        return await this.accountService.createTransaction(id, amount, name, memo)
    }

    @Post(':id/transaction/transfer')
    async transferTransaction(@Param('id') id: string, @Body() transferTransactionDto: TransferTransactionDto) {
        const { transferToId, amount } = transferTransactionDto;

        return await Promise.all([
            this.accountService.createTransaction(id, -amount, "Transfer", ""),
            this.accountService.createTransaction(transferToId, amount, "Transfer", ""),
        ])
    }
}
