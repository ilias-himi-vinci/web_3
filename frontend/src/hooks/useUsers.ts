import { useEffect, useState } from "react";
import type { User } from "../types/Expense";

const host = import.meta.env.VITE_API_URL || "http://unknown-api-url.com";

function useUsers() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${host}/api/users`);
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        setUsers(await response.json());
      } catch (error: unknown) {
        console.error(error);
      }
    };

    fetchUsers();
  }, []);

  return { users };
}

export default useUsers;