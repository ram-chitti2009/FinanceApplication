import React from 'react'
import { useFormatCurrency } from '../hooks/use-format-currency'
import { HandCoins, Landmark, PiggyBank, Wallet } from 'lucide-react'
import TransactionItemRemoveButton from '../dashboard/components/transaction-item-remove-button'
import Link from 'next/link'

export default function TransactionItem({types, category, description, amount, id, onRemoved}: {types: string, category?: string, description: string, amount: number,id:string , onRemoved?: () => void}) {
  const formattedAmount = useFormatCurrency(amount)
  
  const iconMap = {
    "Income" :{
      icon: HandCoins,
      color: "text-green-500 dark:text-green-400",

    }
    ,
    "Expense" :{
      icon: Wallet,
      color: "text-red-500 dark:text-red-400",

    },
    "Saving" :{
      icon: Landmark,
      color: "text-blue-500 dark:text-blue-400",

    },
    "Investment" :{
      icon: PiggyBank,
      color: "text-yellow-500 dark:text-yellow-400",

    }

  }
  const IconComponent = iconMap[types]?.icon || HandCoins
  const iconColor = iconMap[types]?.color
  
  return (
    <div className="w-full flex items-center">
        <div className="flex items-center mr-4 grow">
          <IconComponent className={`${iconColor} mr-2 w-4 h-4`} />
          <span>{description}</span>
        </div>
        <div className="min-w-[150px] items-center hidden md:flex">
          {category && (
            <div className="rounded-md text-xs bg-gray-700 dark:bg-gray-100 text-gray-100 dark:text-black px-2 py-0.5">
              {category}
            </div>
          )}
        </div>

        <div className="min-w-[70px] text-right">
          ${formattedAmount}
        </div>
       
        <div className = "min-w-[50px] flex justify-end">
          <Link href={`/dashboard/transaction/${id}/edit`} className="text-gray-400 hover:text-blue-500">
            Edit 
          </Link> 
          <TransactionItemRemoveButton id={id} onRemoved={onRemoved} />  
        </div>
    </div>
  )
}
