import { useState } from "react";
import ExpenseAdd from "../components/ExpenseAdd";
import ExpenseItem from "../components/ExpenseItem";
import useExpenses from "../hooks/useExpenses";
import ExpenseSearch from "../components/ExpenseSearch";
import type { ExpenseFilter } from "../hooks/useExpenses";
import useCategories from "../hooks/useCategories";



function Home() {
  const { categories } = useCategories();
  const [filter, setFilter] = useState<ExpenseFilter>({});

  const { expenses, loading, error, addExpense, resetExpenses } =
    useExpenses(filter);
    

  const [resetMessage, setResetMessage] = useState("");

  

  const handleReset = async () => {
    await resetExpenses();
    setResetMessage("Data successfully reset!");
  };


  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>

      {resetMessage && <p>{resetMessage}</p>}

      <h1>Expenses</h1>

      <ExpenseAdd addExpense={addExpense} />

      <ExpenseSearch onSearch={setFilter} />

      <button onClick={handleReset}>
        Reset Data
      </button>

      {error && <p>{error}</p>}

      {expenses.map((expense) => (
        <ExpenseItem
          key={expense.id}
          expense={expense}
          categories={categories}
        />
      ))}

    </div>
  );
}

export default Home;