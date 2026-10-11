import fs from "node:fs";
import type { Expense } from "../types/Expense.ts";
import { db } from "../src/prisma/db.ts";

const expensesFile = "data/expenses.json";

export async function getAllExpenses() {
  return await db.orm.public.Expense.all();
}

export async function addExpense(expense: Omit<Expense, "id">) {
  // On n'envoie pas d'id : c'est Postgres qui le génère
  return await db.orm.public.Expense.create({
    date: new Date(expense.date).toISOString(),
    description: expense.description,
    payer: expense.payer,
    amount: expense.amount,
  });
}

// Pas encore migré vers la base (voir note plus bas)
export function resetExpenses(): Expense[] {
  const data = fs.readFileSync("data/expenses.init.json", "utf-8");

  const expenses: Expense[] = JSON.parse(data);

  fs.writeFileSync(expensesFile, JSON.stringify(expenses, null, 2));

  return expenses;
}