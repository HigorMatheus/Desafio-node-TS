import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}
interface CreateTransactinDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    const Transactions = this.transactions;
    return Transactions;
  }

  public getBalance(): Balance {
    // const entradas = this.transactions.map(transaction => {
    //   const entrada = transaction.type === 'income';
    //   const valor = transaction.value;
    //   return { entrada, valor };
    // });
    // const saidas = this.transactions.map(transaction => {
    //   const saida = transaction.type === 'outcome';
    //   const valor = transaction.value;
    //   return { saida, valor };
    // });

    // const entradasTotal = entradas.map(entrada => {
    //   const total = entrada.valor;
    //   return total;
    // });

    // const saidasTotal = saidas.map(saida => {
    //   const total = saida.valor;
    //   return total;
    // });
    // const totalSaidas = saidasTotal[0] + saidasTotal[0];
    // const totalEntradas = entradasTotal[0] + entradasTotal[0];
    // const balanceTotal = totalEntradas - totalSaidas;
    // const balance = {
    //   income: totalEntradas,
    //   outcome: totalSaidas,
    //   total: balanceTotal,
    // };

    const income = this.transactions
      .filter(transaction => transaction.type === 'income')
      .map(transactions => transactions.value)
      .reduce((acc, value) => acc + value, 0);
    const outcome = this.transactions
      .filter(transaction => transaction.type === 'outcome')
      .map(transactions => transactions.value)
      .reduce((acc, value) => acc + value, 0);

    const total = income - outcome;
    return {
      income,
      outcome,
      total,
    };
  }

  public create({ title, type, value }: CreateTransactinDTO): Transaction {
    const transaction = new Transaction({ title, type, value });
    const income = this.transactions
      .filter(transactio => transactio.type === 'income')
      .map(transactions => transactions.value)
      .reduce((acc, valor) => acc + valor, 0);
    const outcome = this.transactions
      .filter(transactio => transactio.type === 'outcome')
      .map(transactions => transactions.value)
      .reduce((acc, valor) => acc + valor, 0);

    const total = income - outcome;

    if (type === 'outcome' && total < value) {
      throw new Error('transfer does not accept limit reached');
    }
    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
