import React from 'react'
import TransactionForm from '../../components/transaction-form'

export default function Page() {
  return (<>
    <h1 className="text-2xl font-semibold mb-4">Add Transaction</h1>
    <div>
      <TransactionForm />
    </div>
    </>
  )
}
