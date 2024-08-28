import { BadRequestException, Body, Controller, Delete, Get, Post, Put, Res } from '@nestjs/common';
import { AccountService } from './account.service'
import { CreateAccountDto, LoginAccountDto } from './account.dto'

@Controller('account')
export class AccountController {
    constructor(private accountService: AccountService) {}

    @Post("/login")
    async login(@Body() body: LoginAccountDto) {
        const res = await this.accountService.loginUser(body.email, body.password)
        return res
    }


    @Post("/register")
    async register(@Body() body: CreateAccountDto) {
        try {
            if (body.password === body.confirm) {
                const res = await this.accountService.registerUser(body.email, body.password, body.firstName, body.lastName)
                return res
            }
        } catch (error) {
            throw new BadRequestException();
        }
    }

    @Put()
    async logout() {
        const res = await this.accountService.logout()
        return res
    }

    @Delete()
    async delete() {
        const res = await this.accountService.deleteUser()
        return res
    }
}
