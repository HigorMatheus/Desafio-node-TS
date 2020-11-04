import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface CreateTransaction {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ value, title, type }: CreateTransaction): Transaction {
    // if ((type !== 'income') | (type !== 'outcome')) {
    //   throw Error('operacao invalida ');
    // }
    if (!['income', 'outcome'].includes(type)) {
      throw new Error('Transaction type is not available');
    }
    const transactionCreate = this.transactionsRepository.create({
      value,
      title,
      type,
    });

    return transactionCreate;
  }
}

export default CreateTransactionService;
