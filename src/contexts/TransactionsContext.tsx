import { ReactNode, useEffect, useState, useCallback } from "react";
import { createContext } from "use-context-selector";
import {data} from '../../db.ts'

interface Transaction {
  id: number
  description: string 
  type: 'income' | 'outcome'
  price: number
  category: string
  createdAt: string

}

interface CreateTransactionInput {
  description: string
  price: number
  category: string
  type: 'income' | 'outcome'

}

interface TransactionContextType {
  transactions: Transaction[]
  fetchTransactions: (query?: string) => Promise<void>
  createTransaction: (data: CreateTransactionInput) => Promise<void>
}

interface TransactionsProviderProps {
  children: ReactNode
}



export const TransactionsContext = createContext({} as TransactionContextType)

export function TransactionsProvider({children}: TransactionsProviderProps) {
  
  const [transactions, setTransactions] = useState<Transaction[]>(data as Transaction[])
 console.log('transactions: ', transactions)
  const fetchTransactions = useCallback(async (query?: string) => {
 
    if(query){const textosFiltrados = data.filter(item => item.description.includes(query!));
    setTransactions(textosFiltrados as Transaction[])
    console.log(textosFiltrados);} else {
      setTransactions(data as Transaction[])
    }


   }, [])

  const createTransaction = useCallback(async (data: CreateTransactionInput) => {

    // const {description,category,price,type} = data

    // const response = await api.post('/db.json', {
    //   description,
    //   price,
    //   category,
    //   type,
    //   createdAt: new Date().toISOString(),
    //  })
      const toDo = {...data,  createdAt: new Date().toISOString()} as Transaction
     setTransactions([...transactions, toDo ])
  }, [])

useEffect(() => {
  fetchTransactions()
}, [])

  return (
    <TransactionsContext.Provider value={{
      transactions,
      fetchTransactions,
      createTransaction,
      }}>
      {children}
    </TransactionsContext.Provider>
  )
}