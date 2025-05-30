import Skeleton from "@/app/components/skeleton";
import React from "react";

export default function TransactionListFallback() {
  return (
    <div className="space-y-4">
        <TransactionSummaryItemSkeleton/>
      <TransactionItemSkeleton />
      <TransactionItemSkeleton />
      <TransactionItemSkeleton />
      <TransactionItemSkeleton />
    </div>
  );
}
function TransactionItemSkeleton() {
  return (
    <div className="w-full flex items-center  space-x-4">
      <div className="flex items-center mr-4 grow">
        <Skeleton />
      </div>
      <div className="min-w-[150px] items-center hidden md:flex">
        <Skeleton />
      </div>

      <div className="min-w-[70px] text-right">
        <Skeleton />
      </div>
      <div className="min-w-[50px] flex justify-end"></div>
    </div>
  );
}

function TransactionSummaryItemSkeleton() {
    return(
  <div className="flex text-gray-900 dark:text-gray-400 font-semibold">
    <div className="grow">
      <Skeleton />
    </div>
    <div className="min-w-[70px] text-right font-semibold">
      {" "}
      <Skeleton />
    </div>
    <div className="min-w-[50px]">
      {" "}
      <Skeleton />
    </div>
  </div>);
}
