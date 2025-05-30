import React, { useMemo } from "react";
import {ArrowDownLeft, ArrowUpRight} from "lucide-react";
import { useFormatCurrency } from "../hooks/use-format-currency";

export default function Trend({
  type,
  amount,
  prevAmount = 0,
}: {
  type: string;
  amount: number;
  prevAmount?: number;
}) {
  const colorClasses: Record<string, string> = {
    income: "text-green-700 dark:text-green-500",
    expense: "text-red-700 dark:text-red-500",
    savings: "text-blue-700 dark:text-blue-500",
    investment: "text-yellow-700 dark:text-yellow-500",
  };
  const calcPercentageChange = (amount: number, prevAmount: number) => {
    if (!prevAmount||!amount) return 0;
    return ((amount - prevAmount) / prevAmount) * 100;
  };
  const percentageChange = useMemo(() => {
    return calcPercentageChange(amount, prevAmount);
  }, [amount, prevAmount]).toFixed(0);
  const formattedAmount = useFormatCurrency(amount); 
  return (
    <div>
      <div className={`font-semibold ${colorClasses[type] || ""}`}>{type}</div>
      <div className="text-2xl font-semibold text-black dark:text-white mb-2">
        {formattedAmount}
      </div>
      <div className = "flex spac-x-1 items-center text-sm" >
        {percentageChange<=0 && <ArrowDownLeft className="text-red-500" />}
        {percentageChange>0 && <ArrowUpRight className="text-green-500" />}
        <div>{percentageChange}% change vs last period </div>
      </div>
    </div>
  );
}

