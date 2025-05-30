import { z } from "zod";
import { categories, types } from "./consts";

export const transactionSchema = z.object({
  type: z.enum(types),
  category: z.preprocess((val) => val?.length ? val : undefined, z.string().optional()),
  amount: z.number().positive("Amount must be greater than 0"),
  description: z.string().optional(),
  created_at: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format")
}).refine((data) => {
  if (data.type === "Expense"){
    return data.category !== undefined;
  }
  
  return true;
}, {
  message: "Category is required for Expense type",
  path: ["category"]
});