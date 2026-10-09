import type { Expense } from "../types/Expense";

interface ExpenseAddProps {
  addExpense: (expense: Expense) => void;
}

function ExpenseAdd({ addExpense }: ExpenseAddProps) {
  const handleAddClick = () => {
    const id = Date.now().toString();

    const newExpense: Expense = {
      id,
      date: new Date().toISOString(),
      description: `New expense ${id}`,
      payer: Math.random() < 0.5 ? "Alice" : "Bob",
      amount: Number((Math.random() * 100).toFixed(2)),
    };

    addExpense(newExpense);
  };

  return (
    <button onClick={handleAddClick}>
      Add
    </button>
  );
}

export default ExpenseAdd;