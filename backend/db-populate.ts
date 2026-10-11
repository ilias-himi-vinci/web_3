import { db } from './src/prisma/db.ts';
import expenses from './data/expenses.init.json' with { type: 'json' };

async function main() {
  for (const expense of expenses) {
    await db.orm.public.Expense.create({
      date: new Date(expense.date).toISOString(),
      description: expense.description,
      payer: expense.payer,
      amount: expense.amount,
    });
  }
  console.log(`${expenses.length} dépenses créées`);
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });