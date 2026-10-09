import { useState } from "react";
import ExpenseAdd from "../components/ExpenseAdd";
import ExpenseItem from "../components/ExpenseItem";
import useExpenses from "../hooks/useExpenses";

function Home() {
  const {
    expenses,
    loading,
    error,
    addExpense,
    resetExpenses,
  } = useExpenses();

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

      <button onClick={handleReset}>
        Reset Data
      </button>

      {error && <p>{error}</p>}

      {expenses.map((expense) => (
        <ExpenseItem
          key={expense.id}
          expense={expense}
        />
      ))}

    </div>
  );
}

export default Home;