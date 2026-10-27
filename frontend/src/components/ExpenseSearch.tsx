import { useState } from "react";
import type { ExpenseFilter } from "../hooks/useExpenses";
import useUsers from "../hooks/useUsers";
import useCategories from "../hooks/useCategories";

interface ExpenseSearchProps {
  onSearch: (filter: ExpenseFilter) => void;
}

function ExpenseSearch({ onSearch }: ExpenseSearchProps) {
  const { users } = useUsers();
  const { categories } = useCategories();
  const [amount, setAmount] = useState("");
  const [payerId, setPayerId] = useState("");
  const [categoryId, setCategoryId] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch({
      amount: amount === "" ? undefined : Number(amount),
      payerId: payerId === "" ? undefined : Number(payerId),
      categoryId: categoryId === "" ? undefined : Number(categoryId),
    });
  };

  return (
    <div>
      <h2>Search</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Minimum amount:
          <input
            type="number"
            step="any"
            min="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Min amount"
          />
        </label>

        <label>
          Payer:
          <select value={payerId} onChange={(e) => setPayerId(e.target.value)}>
            <option value="">All</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </label>

        <label>
          Category:
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
          >
            <option value="">All</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </label>

        <button type="submit">Search</button>
      </form>
    </div>
  );
}

export default ExpenseSearch;