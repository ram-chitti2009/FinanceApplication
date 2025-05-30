"use client";
import Button from "../../components/button";
import Input from "../../components/input";
import Label from "../../components/label";
import Select from "../../components/select";
import { categories, types } from "../../lib/consts";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { transactionSchema } from "../../lib/validation";
import { useState, useTransition, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createTransaction } from "@/app/lib/actions";
import FormError from "@/app/components/form-error";
import ErrorBoundaryWrapper from "@/app/components/error-boundary-wrapper";

interface TransactionFormData {
  type: string;
  category: string;
  amount: number;
  description: string;
  created_at: string;
}

export default function TransactionForm({initialData}: { initialData?: TransactionFormData }) {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  // Get today's date in YYYY-MM-DD format for the date input
  const today = new Date().toISOString().split('T')[0];
  
  // Determine if we're editing an existing transaction
  const editing = Boolean(initialData);
  
  // Initialize the form with either the initialData or default values
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<TransactionFormData>({
    mode: "onChange",
    resolver: zodResolver(transactionSchema),
    defaultValues: initialData ?? {
      type: "Expense", // Default type
      category: "",
      amount: undefined,
      description: "",
      created_at: today,
    }
  });
  
  const type = watch("type");

  // This effect ensures the date is set correctly when the component mounts
  useEffect(() => {
    // Force-set the created_at field with the correct value
    const dateValue = editing && initialData?.created_at 
      ? new Date(initialData.created_at).toISOString().split('T')[0]
      : today;
      
    setValue("created_at", dateValue);
    
    // Debug log to verify the date is being set
    console.log("Setting date value:", dateValue);
  }, [editing, initialData, setValue, today]);

  const onSubmit = async (data: TransactionFormData) => {
    console.log("Submitting transaction:", data);
    
    try {
      // Remove duplicate createTransaction call
      await createTransaction(data);
      setError(null);
      
      // Navigate back to dashboard after successful submission
      startTransition(() => {
        router.push("/dashboard");
        router.refresh();
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create transaction");
      console.error("Error submitting transaction:", err);
    }
  };

  return (
    <ErrorBoundaryWrapper type="transaction-form">
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label className="mb-1">Type</Label>
            <Select {...register("type", {
              onChange: (e) => {
                if(e.target.value !== "Expense"){
                  setValue("category", "");
                }
              }
            })}>
              {types.map(type => <option key={type} value={type}>{type}</option>)}
            </Select>
          </div>

          <div>
            <Label className="mb-1">Category</Label>
            <Select {...register("category")} disabled={type !== "Expense"}>
              <option value="">Select a Category</option>
              {categories.map(category => <option key={category} value={category}>{category}</option>)}
            </Select>
          </div>

          <div>
            <Label className="mb-1">Date</Label>
            <Input 
              type="date"
              disabled={editing}
              defaultValue={today} // Add defaultValue here as a fallback
              {...register("created_at")}
            />
            {errors.created_at && (
              <p className="mt-1 text-red-500">{errors.created_at.message}</p>
            )}
          </div>

          <div>
            <Label className="mb-1">Amount</Label>
            <Input 
              type="number"
              placeholder="Enter amount"
              {...register("amount", {
                setValueAs: v => v === "" ? undefined : parseFloat(v),
                valueAsNumber: true
              })}
            />
            {errors.amount && (
              <p className="mt-1 text-red-500">{errors.amount.message}</p>
            )}
          </div>

          <div className="col-span-1 md:col-span-2">
            <Label className="mb-1">Description</Label>
            <Input {...register("description")} />
            {errors.description && errors.description.message && (
              <p className="mt-1 text-red-500">{errors.description.message}</p>
            )}
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div>{error && <FormError e={error} />}</div>
          <Button type="submit" disabled={isSubmitting || isPending}>
            {isSubmitting || isPending ? 'Saving...' : 'Save'}
          </Button>
        </div>
      </form>
    </ErrorBoundaryWrapper>
  );
}




