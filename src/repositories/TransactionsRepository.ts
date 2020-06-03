import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionDTO{
  title: string;
  value: number;
  type: 'income'|'outcome';
}

interface Receipt{
  transactions: Transaction[];
  balance: Balance;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Receipt {
    const balance = this.getBalance();
    const transactions = this.transactions;

    return {transactions, balance};
  }

  public getBalance(): Balance {
    let income = 0;
    let outcome = 0;


    if(this.transactions.length<=0)
        return {income:0, outcome:0, total:0};

    if(this.transactions.filter(t => t.type === "income").length>0)
    income = this.transactions.filter(t => t.type === "income").map(t => t.value).reduce((a,b)=>a+b);

    if(this.transactions.filter(t => t.type === "outcome").length>0)
    outcome = this.transactions.filter(t => t.type === "outcome").map(t => t.value).reduce((a,b)=>a+b);

    const balance = {
        income,
        outcome,
        total: income-outcome,
    }

    return balance;
  }

  public create({title, value, type}: TransactionDTO): Transaction {
    const transaction = new Transaction({title, value, type});

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
