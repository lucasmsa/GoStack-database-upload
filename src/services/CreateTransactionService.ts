import AppError from '../errors/AppError';
import TransactionsRepository from '../repositories/TransactionsRepository'
import { getRepository, getCustomRepository } from 'typeorm'
import Category from '../models/Category'

import Transaction from '../models/Transaction';

interface RequestDTO {
  title: string;
  type: 'income'|'outcome';
  value: number;
  category: string;
}

export default class CreateTransactionService {
  public async run({
    title,
    type,
    value,
    category,
  }: RequestDTO): Promise<Transaction> {
    const transactionRepository = await getCustomRepository(TransactionsRepository)

    if (type === 'outcome') {
      const { total } = await transactionRepository.getBalance()
      if (total - value < 0) {
        throw new AppError("Transaction cannot be made because you don't have enough funds")
      }
    }
    const categoryRepository = getRepository(Category)

    const checkCategory = await categoryRepository.findOne({ where: { title: category } })
    if (checkCategory) {

      const categoryID = checkCategory.id
      const transaction = await transactionRepository.create({
        title,
        type,
        value,
        category_id: categoryID
      })
      await transactionRepository.save(transaction)

      return transaction
    }

    const newCategoryTemplate = categoryRepository.create({ title: category })
    const newCategory = await categoryRepository.save(newCategoryTemplate)

    const transaction = transactionRepository.create({
      title,
      type,
      value,
      category_id: newCategory.id
    })

    await transactionRepository.save(transaction)
    return transaction
  }
}
