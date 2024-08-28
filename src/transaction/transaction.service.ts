import { Injectable } from '@nestjs/common';

@Injectable()
export class BankingService {

    async getTransactions() {
        return []
    }

    async addTransaction(transaction) {
        return !!transaction
    }
}
