import fs from "node:fs";
import type { NewExpense } from "../types/Expense.ts";
import { db } from "../src/prisma/db.ts";

const expensesFile = "data/expenses.json";

export interface ExpenseFilter {
  amount?: number;
  payerId?: number;
  categoryId?: number;

}

export async function getAllExpenses(filter?: ExpenseFilter) {
  let expenses = await db.orm.public.Expense.all();

  if (filter?.amount !== undefined) {
    const minAmount = filter.amount;
    expenses = expenses.filter((expense) => expense.amount >= minAmount);
  }

  if (filter?.payerId !== undefined) {
    const payerId = filter.payerId;
    expenses = expenses.filter((expense) => expense.payerId === payerId);
  }

  if (filter?.categoryId !== undefined) {
    const categoryId = filter.categoryId;
    expenses = expenses.filter((expense) => expense.categoryId === categoryId);
  }

  return expenses;
}

export async function addExpense(expense: NewExpense) {
  // On n'envoie pas d'id : c'est Postgres qui le génère
  const created = await db.orm.public.Expense.create({
    date: new Date(expense.date).toISOString(),
    description: expense.description,
    amount: expense.amount,
    payerId: expense.payerId,
    categoryId: expense.categoryId ?? null,
  });

  for (const userId of expense.participants ?? []) {
    await db.orm.public.Participations.create({
      expenseId: created.id,
      userId,
    });
  }

  return created;
}

// Pas migré vers la base (hors sujet pour cette étape)
export function resetExpenses(): unknown[] {
  const data = fs.readFileSync("data/expenses.init.json", "utf-8");
  const expenses: unknown[] = JSON.parse(data);
  fs.writeFileSync(expensesFile, JSON.stringify(expenses, null, 2));
  return expenses;
}