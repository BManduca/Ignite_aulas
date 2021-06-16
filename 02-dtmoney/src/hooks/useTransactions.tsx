import { createContext, useEffect, useState, ReactNode, useContext } from 'react';
import { api } from '../services/api';

interface Transaction {
  id: number;
  title: string;
  amount: number;
  type: string;
  category: string;
  createdAt: string;
}

/* interface TransactionInput {
  title: string;
  amount: number;
  type: string;
  category: string;
} */

interface TransactionsContextData {
  transactions: Transaction[];
  createTransaction: (transaction: TransactionInput) => Promise<void>;
}

type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>;

interface TransactionsProviderProps {
  //ReactNode aceita qualquer tipo de conteúdo valido para o react
  //ou seja, aceita uma tag HTML, jsx, aceita texto diretamente...
  children: ReactNode;
}

const TransactionsContext = createContext<TransactionsContextData>(
  {} as TransactionsContextData
);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    api.get('transactions')
      .then(response => setTransactions(response.data.transactions))
  }, []);

  //passando createTransaction para async e faremos aguardar 
  //o api.post finalizar
  async function createTransaction(transactionInput: TransactionInput) {
    const response = await api.post('/transactions', {
      ...transactionInput,
      createdAt: new Date()
    })
    const { transaction } = response.data;

    //criando um novo vetor, copiando todas as informações ja existentes
    //e adicionando a informação no começo ou no final(a critério do dev)
    //aplicando conceito de imutabilidade do react
    setTransactions([
      ...transactions,
      transaction
    ]);
  }

  return (
    <TransactionsContext.Provider value={{ transactions, createTransaction }}>
      { children }
    </TransactionsContext.Provider>
  )
}

//hook no react sempre pode utilizar de outros hooks
export function useTransactions() {
  const context = useContext(TransactionsContext);

  return context;
}