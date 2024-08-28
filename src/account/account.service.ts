import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm'
import { Account } from './account.entity'


@Injectable()
export class AccountService {
    private saltOrRounds = 10;

    constructor(@Inject('ACCOUNT_REPOSITORY') private accountRepository: Repository<Account>) {}

    async loginUser(email: string, password: string): Promise<Account> {
        const account = await this.accountRepository.findOneByOrFail({ email })

        if (await bcrypt.compare(password, account.password)) {
            delete account.password
            return account
        } else {
            throw new UnauthorizedException()
        }
    }

    async registerUser(email: string, password: string, firstName: string, lastName: string): Promise<Account> {
        const hashedPassword = await this.hash(password)
        return await this.accountRepository.save({ email, password: hashedPassword, firstName, lastName })
    }

    async hash(password: string): Promise<string>
    {
        return await bcrypt.hash(password, this.saltOrRounds)
    }

    async logout() {
        await new Promise(resolve => setTimeout(resolve, 1000 * .5));
        return true
    }

    async deleteUser() {
        await new Promise(resolve => setTimeout(resolve, 1000 * .5));
        return true
    }
}
