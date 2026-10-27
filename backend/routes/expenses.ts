import { Router } from "express";
import {
  getAllExpenses,
  addExpense,
  resetExpenses,
} from "../services/expenses.ts";
import type { NewExpense } from "../types/Expense.ts";
import z from "zod";

const router = Router();

const expenseFilterSchema = z.object({
  amount: z.coerce.number().nonnegative().optional(),
  payerId: z.coerce.number().int().positive().optional(),
  categoryId: z.coerce.number().int().positive().optional(),
});

router.get("/expenses", async (req, res) => {
  const parsed = expenseFilterSchema.safeParse(req.query);

  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid amount" });
  }

  try {
    const expenses = await getAllExpenses(parsed.data);
    res.json(expenses);
  } catch (error: unknown) {
    console.error(error);
    res.status(500).json({ error: "Failed to get expenses" });
  }
});

router.post("/expenses", async (req, res) => {
  try {
    const expense = req.body as NewExpense;
    const createdExpense = await addExpense(expense);
    res.status(201).json(createdExpense);
  } catch (error: unknown) {
    console.error(error);
    res.status(500).json({ error: "Failed to add expense" });
  }
});

router.post("/expenses/reset", (req, res) => {
  try {
    const expenses = resetExpenses();
    res.json({ message: "Expenses reset successfully", expenses });
  } catch (error: unknown) {
    console.error(error);
    res.status(500).json({ error: "Failed to reset expenses" });
  }
});

export default router;