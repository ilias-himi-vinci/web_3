import { useEffect, useState } from "react";
import type { Expense, NewExpense } from "../types/Expense";

const host = import.meta.env.VITE_API_URL || "http://unknown-api-url.com";

export interface ExpenseFilter {
  amount?: number;
  payerId?: number;
  categoryId?: number;
}

function useExpenses(filter: ExpenseFilter = {}) {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchExpenses = async () => {
    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams();
      if (filter.amount !== undefined) {
        params.set("amount", String(filter.amount));
      }

      if (filter.payerId !== undefined) {
        params.set("payerId", String(filter.payerId));
      }

      if (filter.categoryId !== undefined) {
        params.set("categoryId", String(filter.categoryId));
      }

      const query = params.toString();

      const response = await fetch(
        `${host}/api/expenses${query ? `?${query}` : ""}`,
      );
      if (!response.ok) {
        throw new Error("Failed to fetch expenses");
      }

      const data: Expense[] = await response.json();
      setExpenses(data);
    } catch (error: unknown) {
      console.error(error);
      setError(error instanceof Error ? error.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, [filter.amount, filter.payerId, filter.categoryId]);

  const addExpense = async (expense: NewExpense) => {
    try {
      setError(null);

      const response = await fetch(`${host}/api/expenses`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(expense),
      });

      if (!response.ok) {
        throw new Error("Failed to add expense");
      }

      await fetchExpenses();
    } catch (error: unknown) {
      console.error(error);

      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Unknown error");
      }
    }
  };

  const resetExpenses = async () => {
    try {
      setError(null);

      const response = await fetch(`${host}/api/expenses/reset`, {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Failed to reset expenses");
      }

      await fetchExpenses();
    } catch (error: unknown) {
      console.error(error);

      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Unknown error");
      }
    }
  };

  return {
    expenses,
    loading,
    error,
    addExpense,
    resetExpenses,
  };
}

export default useExpenses;