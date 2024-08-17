import { Controller, Get, Post } from '@nestjs/common';
import { AccountService } from './account.service'

@Controller('account')
export class AccountController {
    constructor(private accountService: AccountService) {}

    @Get()
    account(email: string) {
        return this.accountService.getAccount(email)
    }

    @Post()
    create(email: string, password: string, confirm: string, firstName: string, lastName: string) {
        if (password === confirm) {
            return this.accountService.createAccount(email, password, firstName, lastName)
        }
    }
}
