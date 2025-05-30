"use client";
import React from 'react'
import TransactionItem from "../../components/transaction-item"
import TransactionSummaryItem from '@/app/components/transaction-summary-item';
import Button from '@/app/components/button';
import { fetchTransactions } from '@/app/lib/actions';

interface Transaction {
    id: string;
    type: string;
    amount: number;
    description: string;
    category: string;
    created_at: string;
}

interface GroupedTransactions {
    date: string; // Not optional
    totalAmount: number;
    transactions: Transaction[];
}

interface GroupedTransactionsMap {
    [date: string]: GroupedTransactions;
}

const groupAndSumTransactionsByDate = (transactions: Transaction[]): GroupedTransactionsMap => {
    const grouped: GroupedTransactionsMap = {};
    
    // Debug total amount
    let totalDebugAmount = 0;
    
    for (const transaction of transactions) {
        // Skip transactions with invalid amounts
        if (typeof transaction.amount !== 'number' || isNaN(transaction.amount)) {
            console.warn(`Skipping transaction with invalid amount:`, transaction);
            continue;
        }

        const date = transaction.created_at?.split("T")[0];
        if (!date) {
            console.warn(`Skipping transaction with invalid date:`, transaction);
            continue;
        }

        if (!grouped[date]) {
            grouped[date] = {
                date,
                totalAmount: 0,
                transactions: []
            };
        }
        
        grouped[date].transactions.push(transaction);
        
        // Calculate amount based on transaction type
        const amount = transaction.type === "Expense" ? -Math.abs(transaction.amount) : Math.abs(transaction.amount);
        
        // Use precise calculation to avoid floating point errors
        grouped[date].totalAmount = parseFloat((grouped[date].totalAmount + amount).toFixed(2));
        
        // Track total for debugging
        totalDebugAmount += amount;
    }
    
    console.log("Total amount across all transactions:", totalDebugAmount.toFixed(2));
    console.log("Grouped transactions:", grouped);
    
    return grouped;
}

export default function TransactionList({
    initialTransactions,
    range,

}: {
    initialTransactions: Transaction[];
    range: string;
}) {
    const [transactions, setTransactions] = React.useState<Transaction[]>(initialTransactions);
    const [offset, setOffset] = React.useState(initialTransactions.length);
    const [isLoading, setIsLoading] = React.useState(false);
    const [confirmed, setConfirmed] = React.useState(false);
    
    console.log(`TransactionList: Rendering ${transactions.length} transactions with range ${range}`);
    
    // Group transactions by date and calculate daily totals
    const grouped = groupAndSumTransactionsByDate(transactions);
    
    // Load more transactions
    const handleLoadMore = async () => {
        setIsLoading(true);
        try {
            const nextTransactions = await fetchTransactions(range, offset, 10);
            setOffset(prevValue => prevValue + nextTransactions.length);
            setTransactions(prevTransactions => [...prevTransactions, ...nextTransactions]);
        } catch (error) {
            console.error("Error loading more transactions:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleRemoved = (id: string) => () => {
        console.log("Removing transaction with ID:", id);
        setTransactions(prevTransactions => {
            const updatedTransactions = prevTransactions.filter(transaction => transaction.id !== id);
            console.log("Updated transactions count:", updatedTransactions.length);
            return updatedTransactions;
        });
    }
    // Sort dates in descending order (newest first)
    const sortedDates = Object.keys(grouped).sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

    return (
        <>
            {sortedDates.length > 0 ? (
                sortedDates.map(date => (
                    <div key={date} className="mb-8">
                        <TransactionSummaryItem 
                            date={date} 
                            amount={grouped[date].totalAmount} 
                        />
                        <section className="mt-2">
                            {grouped[date].transactions.map(transaction => (
                                <TransactionItem 
                                    types={transaction.type}
                                    description={transaction.description}
                                    amount={transaction.amount}
                                    category={transaction.category}
                                    key={transaction.id}
                                    id={transaction.id}
                                    onRemoved={handleRemoved(transaction.id)}
                                />
                            ))}
                        </section>
                    </div>
                ))
            ) : (
                <div className="text-center py-8 text-gray-500">
                    No transactions found
                </div>
            )}
            
            {transactions.length > 0 && (
                <div className="flex justify-center mt-6">
                    <Button 
                        onClick={handleLoadMore}
                        variant="ghost"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Loading...' : 'Load More'}
                    </Button>
                </div>
            )}
        </>
    );
}
