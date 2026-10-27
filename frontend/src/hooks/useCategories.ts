import { useEffect, useState } from "react";
import type { Category } from "../types/Expense";

const host = import.meta.env.VITE_API_URL || "http://unknown-api-url.com";

function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${host}/api/categories`);
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        setCategories(await response.json());
      } catch (error: unknown) {
        console.error(error);
      }
    };

    fetchCategories();
  }, []);

  return { categories };
}

export default useCategories;