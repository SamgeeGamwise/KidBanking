import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm'
import { Account } from './account.entity'

@Injectable()
export class AccountService {
    constructor(@Inject('ACCOUNT_REPOSITORY') private accountRepository: Repository<Account>) { }
    // async checkUserByEmail(email: string): Promise<boolean> {
    //     const user = await this.userRepository.findOneBy({ email })
    //     return !!user
    // }

    // async getAccounts(userId: number) {
    //     return await this.accountRepository.find({ relations: {transactions: true },  where: { user: { id: userId } } })
    // }

    // async createAccount(userId: number, name: string) {
    //     const account = await this.accountRepository.insert({name, user: { id: userId }})
    //     return account
    // }
}
