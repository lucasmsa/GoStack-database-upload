import AppError from '../errors/AppError';
import { getCustomRepository } from 'typeorm'
import TransactionsRepository from '../repositories/TransactionsRepository'

interface Request {
  id: string
}

export default class DeleteTransactionService {
  public async run({ id }: Request): Promise<void> {
    const transactionRepository = getCustomRepository(TransactionsRepository)

    try {
      const checkTransaction = await transactionRepository.findOne({ where: { id } });
    } catch (err) {
      throw new AppError('No transaction with this id was found')
    }

    await transactionRepository.delete({ id })
  }
}
