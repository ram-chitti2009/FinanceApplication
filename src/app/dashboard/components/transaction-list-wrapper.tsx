import { fetchTransactions } from '@/app/lib/actions'
import React from 'react'
import TransactionList from './transaction-list'

export default async function TransactionListWrapper({range}: {range: string}) {
    const transactions = await fetchTransactions(range)

  return (
    <div>
      <TransactionList range = {range} initialTransactions={transactions} key = {range}/> 
    </div>
  )
}
