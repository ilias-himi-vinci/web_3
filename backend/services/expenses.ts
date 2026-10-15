import fs from "node:fs";
import type { NewExpense } from "../types/Expense.ts";
import { db } from "../src/prisma/db.ts";

const expensesFile = "data/expenses.json";

export async function getAllExpenses() {
  return await db.orm.public.Expense.all();
}

export async function addExpense(expense: NewExpense) {
  // On n'envoie pas d'id : c'est Postgres qui le génère
  const created = await db.orm.public.Expense.create({
    date: new Date(expense.date).toISOString(),
    description: expense.description,
    amount: expense.amount,
    payerId: expense.payerId,
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