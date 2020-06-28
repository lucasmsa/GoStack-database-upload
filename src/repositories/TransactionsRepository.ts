import { EntityRepository, Repository } from 'typeorm';

import Transaction from '../models/Transaction';
import AppError from '../errors/AppError';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
export default class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    const balance = await this.find()
    let income = 0
    let outcome = 0
    balance.forEach(transaction => {
      if (transaction.type === 'income') {
        income += transaction.value
      } else {
        outcome += transaction.value
      }
    })
    const total = income - outcome

    return {income, outcome, total} as Balance
  }
}
