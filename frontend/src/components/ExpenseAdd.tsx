import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { NewExpense, ExpenseFormValues } from "../types/Expense";
import { ExpenseFormSchema } from "../types/Expense";

interface ExpenseAddProps {
  addExpense: (expense: NewExpense) => void;
}

function ExpenseAdd({ addExpense }: ExpenseAddProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ExpenseFormValues>({
    resolver: zodResolver(ExpenseFormSchema),
    defaultValues: {
      payerId: 1,
      date: new Date().toISOString().slice(0, 10),
      description: "",
      amount: undefined,
    },
  });

  const onSubmit = (data: ExpenseFormValues) => {
    const newExpense: NewExpense = {
      date: data.date,
      description: data.description,
      payerId: data.payerId,
      amount: data.amount,
      participants: [1, 2], // provisoire : Alice et Bob participent toujours
    };

    addExpense(newExpense);
    reset();
  };

  return (
    <div>
      <h2>Add expense</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Payer:
          <select {...register("payerId", { valueAsNumber: true })}>
            <option value={1}>Alice</option>
            <option value={2}>Bob</option>
          </select>
        </label>
        {errors.payerId && <p>{errors.payerId.message}</p>}

        <br />

        <label>
          Date:
          <input type="date" {...register("date")} />
        </label>
        {errors.date && <p>{errors.date.message}</p>}

        <br />

        <label>
          Description (optional):
          <input
            type="text"
            placeholder="Enter description"
            {...register("description")}
          />
        </label>
        {errors.description && <p>{errors.description.message}</p>}

        <br />

        <label>
          Amount:
          <input
            type="number"
            step="any"
            {...register("amount", { valueAsNumber: true })}
            placeholder="Enter amount"
          />
        </label>
        {errors.amount && <p>{errors.amount.message}</p>}

        <br />

        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default ExpenseAdd;