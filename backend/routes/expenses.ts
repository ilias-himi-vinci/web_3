import { Router } from "express";
import {
  getAllExpenses,
  addExpense,
  resetExpenses,
} from "../services/expenses.ts";
import type { Expense } from "../types/Expense.ts";

const router = Router();

router.get("/expenses", async (req, res) => {
  try {
    const expenses = await getAllExpenses();

    res.json(expenses);
  } catch (error: unknown) {
    console.error(error);

    res.status(500).json({
      error: "Failed to get expenses",
    });
  }
});

router.post("/expenses", async (req, res) => {
  try {
    const expense = req.body as Expense;

    const createdExpense = await addExpense(expense);

    res.status(201).json(createdExpense);
  } catch (error: unknown) {
    console.error(error);

    res.status(500).json({
      error: "Failed to add expense",
    });
  }
});

router.post("/expenses/reset", (req, res) => {
  try {
    const expenses = resetExpenses();

    res.json({
      message: "Expenses reset successfully",
      expenses,
    });
  } catch (error: unknown) {
    console.error(error);

    res.status(500).json({
      error: "Failed to reset expenses",
    });
  }
});

export default router;