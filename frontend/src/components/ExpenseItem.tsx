import type { Category, Expense } from "../types/Expense";

interface ExpenseItemProps {
  expense: Expense;
  categories: Category[];
}

const userNames: Record<number, string> = { 1: "Alice", 2: "Bob" };

function ExpenseItem({ expense, categories }: ExpenseItemProps) {
  const category = categories.find((c) => c.id === expense.categoryId);

  return (
    <div>
      <p>Date: {expense.date.slice(0, 10)}</p>
      <p>Description: {expense.description}</p>
      <p>Amount: ${expense.amount.toFixed(2)}</p>
      <p>Payer: {userNames[expense.payerId] ?? `User ${expense.payerId}`}</p>
      {category && (
        <p>
          Category:{" "}
          <span style={{ color: category.color, fontWeight: "bold" }}>
            {category.name}
          </span>
        </p>
      )}
    </div>
  );
}

export default ExpenseItem;