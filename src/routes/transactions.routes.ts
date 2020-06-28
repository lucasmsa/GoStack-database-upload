import { getCustomRepository } from 'typeorm';
import { Router, json } from 'express';
import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';
import DeleteTransactionService from '../services/DeleteTransactionService';
import uploadConfig from '../config/upload'
import multer from 'multer'
import ImportTransactionsService from '../services/ImportTransactionsService';

const transactionsRouter = Router();
const upload = multer(uploadConfig)

transactionsRouter.get('/', async (req, res) => {
  const transactionsRepository = getCustomRepository(TransactionsRepository)

  const transactions = await transactionsRepository.find()

  const balance = await transactionsRepository.getBalance()

  const returnTransactions = {
    transactions,
    balance
  }

  return res.json(returnTransactions)
});

transactionsRouter.post('/', async (req, res) => {
  const { title, value, type, category } = req.body;
  const createTransaction = new CreateTransactionService();
  const transaction = await createTransaction.run({
    title,
    type,
    value,
    category
  });

  const transactionReturn = {
    id: transaction.id,
    title,
    value,
    type,
    category
  }

  return res.json(transactionReturn)
});

transactionsRouter.delete('/:id', async (req, res) => {
  const { id } = req.params
  const deleteTransaction = new DeleteTransactionService()
  await deleteTransaction.run({ id })

  return res.status(204).send()
});

transactionsRouter.post('/import', upload.single('file'), async (req, res) => {
  const importTransaction = new ImportTransactionsService()
  const transactions = await importTransaction.run({ csvFile: req.file.filename })

  return res.json(transactions)
});

export default transactionsRouter;
