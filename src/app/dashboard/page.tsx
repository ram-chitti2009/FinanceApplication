import React, { Suspense } from "react";
import TransactionList from "./components/transaction-list";
import TransactionListFallback from "./components/transaction-list-fallback";
import Trend from "./components/trend";
import TrendFallback from "./components/trend-fallback";
import Link from "next/link";
import { PlusCircle } from "lucide-react";

import { createClient } from "../lib/supabase/server";
import { types } from "../lib/consts";
import ErrorBoundaryWrapper from "../components/error-boundary-wrapper";
import Range from "./components/range";
import TransactionListWrapper from "./components/transaction-list-wrapper";

export default async function Page({
  searchParams,
}: {
  searchParams: { range?: string };
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const userMetadata = user?.user_metadata;
  console.log("User metadata:", userMetadata);
  const range = searchParams.range ?? userMetadata?.defaultView ?? "last30days";

  console.log("Rendering page with range:", range);

  return (
    <>
      {/* Header Section */}
      <section className="mb-8 flex justify-between items-center">
        <h1 className="text-4xl font-semibold">Summary</h1>
        <aside>
          <Range />
        </aside>
      </section>

      {/* Trend Summary Cards */}
      <section className="mb-8 grid grid-cols-2 lg:grid-cols-4 gap-8">
        {types.map((type) => (
          <ErrorBoundaryWrapper key={type} type={type}>
            <Suspense fallback={<TrendFallback type={type} />}>
              <Trend type={type} range={range} />
            </Suspense>
          </ErrorBoundaryWrapper>
        ))}
      </section>

      {/* Transaction Section Header */}
      <section className="flex justify-between items-center mb-8">
        <h2 className="text-2xl">Transactions</h2>
        <Link href="/dashboard/transaction/add" className="flex items-center space-x-1">
          <PlusCircle className="h-4 w-4" />
          <span>Add</span>
        </Link>
      </section>

      {/* Transaction List */}
      <div>
        <Suspense fallback={<TransactionListFallback />}>
          <TransactionListWrapper range={range} />
        </Suspense>
      </div>
    </>
  );
}
