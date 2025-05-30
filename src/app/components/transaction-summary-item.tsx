import React from 'react'
import {useFormatCurrency} from '../hooks/use-format-currency'

export default function TransactionSummaryItem({date, amount}: {date: string, amount: number}) {
    const formattedAmount = useFormatCurrency(amount)
    
  return (
    <div className = "flex text-gray-900 dark:text-gray-400 font-semibold">
      <div className = "grow">

        {date}
      </div>
      <div className = "min-w-[70px] text-right font-semibold"> {formattedAmount} </div>
      <div className = "min-w-[50px]"></div>
    </div>
  )
}

