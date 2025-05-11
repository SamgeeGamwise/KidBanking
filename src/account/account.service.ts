import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm'
import { Account } from '../database/account.entity'
import { Transaction } from '../database/transaction.entity'

@Injectable()
export class AccountService {
    constructor(
        @Inject('ACCOUNT_REPOSITORY') 
        private accountRepository: Repository<Account>,
        @Inject('TRANSACTION_REPOSITORY')
        private transactionRepository: Repository<Transaction>    
    ) { }

    
    async createTransaction(accountId: string, amount: number, name: string, memo: string): Promise<Transaction> {
        return this.transactionRepository.create({ id: accountId, amount, name, memo });
    }

    async deleteAccountById(id: string): Promise<Account> {
        const account = await this.accountRepository.findOne({where: { id }})

        if (!account) {
            throw new NotFoundException('Account not found');
        }
        
        return this.accountRepository.remove(account);
    }

    async updateAccountName(id: string, name: string) {
        
    }

    async createAccount(name: string) {
        
    }

    async getAccountById(id: string) {
        // Need to return a balance value in addition to the account
        
    }

    async getBalanceById(id: string) {
        
    }

    async getTransactionsByAccountId(id: string, search: string = null) {
        
    }
}
