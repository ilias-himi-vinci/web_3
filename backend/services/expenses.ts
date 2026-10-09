import fs from "node:fs";
import type { Expense } from "../types/Expense.ts";

const expensesFile = "data/expenses.json";

export function getAllExpenses(): Expense[] {
  const data = fs.readFileSync(expensesFile, "utf-8");

  return JSON.parse(data);
}

export function addExpense(expense: Expense): Expense {
  const expenses = getAllExpenses();

  expenses.push(expense);

  fs.writeFileSync(
    expensesFile,
    JSON.stringify(expenses, null, 2),
  );

  return expense;
}

export function resetExpenses(): Expense[] {
  const data = fs.readFileSync(
    "data/expenses.init.json",
    "utf-8",
  );

  const expenses: Expense[] = JSON.parse(data);

  fs.writeFileSync(
    expensesFile,
    JSON.stringify(expenses, null, 2),
  );

  return expenses;
}