import type { Expense } from "../types/Expense";

interface ExpenseItemProps {
  expense: Expense;
}

// Provisoire, en attendant une vraie liste d'utilisateurs
const userNames: Record<number, string> = { 1: "Alice", 2: "Bob" };

function ExpenseItem({ expense }: ExpenseItemProps) {
  return (
    <div>
      <p>Date: {expense.date.slice(0, 10)}</p>
      <p>Description: {expense.description}</p>
      <p>Amount: ${expense.amount.toFixed(2)}</p>
      <p>Payer: {userNames[expense.payerId] ?? `User ${expense.payerId}`}</p>
    </div>
  );
}

export default ExpenseItem;