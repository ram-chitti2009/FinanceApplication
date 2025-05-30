import TransactionForm from '@/app/dashboard/components/transaction-form';
import { createClient } from '@/app/lib/supabase/server'
import { notFound } from 'next/navigation';

interface PageProps {
  params: { id: string };
}

export default async function Page({ params }: PageProps) {
  // Verify we have an ID
  if (!params?.id) {
    return notFound();
  }

  try {
    const supabase = await createClient();
    const { data: transaction, error } = await supabase
      .from('transactions')
      .select('*')
      .eq('id', params.id)
      .single();

    if (error) {
      console.error('Error fetching transaction:', error);
      throw error;
    }

    if (!transaction) {
      return notFound();
    }

    return (
      <div className="max-w-3xl mx-auto py-8">
        <h1 className="text-2xl font-bold mb-6">Edit Transaction</h1>
        <TransactionForm initialData={transaction} /> 
      </div>
    );
  } catch (error) {
    console.error('Error in edit transaction page:', error);
    return (
      <div className="max-w-3xl mx-auto py-8">
        <h1 className="text-2xl font-bold mb-6">Error</h1>
        <div className="bg-red-50 border border-red-200 rounded-md p-4 text-red-600">
          Failed to load transaction. Please try again.
        </div>
      </div>
    );
  }
}

// Add proper type generation for static paths
export const generateStaticParams = async () => {
  return [];
};
