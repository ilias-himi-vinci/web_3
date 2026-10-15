import { z } from "zod";

export interface Expense {
  id: number;
  date: string;
  description: string;
  payerId: number;
  amount: number;
  participants: number[];
}

export type NewExpense = Omit<Expense, "id">;

export const ExpenseFormSchema = z.object({
  payerId: z.union([z.literal(1), z.literal(2)], {
    message: "Le payeur doit être Alice ou Bob.",
  }),
  date: z.string().min(1, "La date est obligatoire."),
  description: z
    .string()
    .max(200, "La description ne peut pas dépasser 200 caractères."),
  amount: z
    .number({ message: "Le montant est obligatoire." })
    .positive("Le montant doit être positif."),
});

export type ExpenseFormValues = z.infer<typeof ExpenseFormSchema>;