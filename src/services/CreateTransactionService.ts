import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface TransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute(data: TransactionDTO): Transaction {
    const balance = this.transactionsRepository.getBalance();

    if (data.type === 'outcome' && data.value > balance.total)
      throw Error('Insufficient balance');

    const transaction = this.transactionsRepository.create(data);

    return transaction;
  }
}

export default CreateTransactionService;
