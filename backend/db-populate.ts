import { db } from './src/prisma/db.ts';

async function main() {
  const alice = await db.orm.public.User.create({
    name: 'Alice',
    email: 'alice@example.com',
  });
  const bob = await db.orm.public.User.create({
    name: 'Bob',
    email: 'bob@example.com',
  });

  const expense1 = await db.orm.public.Expense.create({
    description: 'Restaurant',
    amount: 60,
    date: new Date('2026-10-01').toISOString(),
    payerId: alice.id,
  });
  await db.orm.public.Participations.create({ expenseId: expense1.id, userId: alice.id });
  await db.orm.public.Participations.create({ expenseId: expense1.id, userId: bob.id });

  const expense2 = await db.orm.public.Expense.create({
    description: 'Courses',
    amount: 35.5,
    date: new Date('2026-10-05').toISOString(),
    payerId: bob.id,
  });
  await db.orm.public.Participations.create({ expenseId: expense2.id, userId: alice.id });
  await db.orm.public.Participations.create({ expenseId: expense2.id, userId: bob.id });

  await db.orm.public.Transfer.create({
    amount: 20,
    date: new Date('2026-10-08').toISOString(),
    sourceId: alice.id,
    targetId: bob.id,
  });

  console.log('Utilisateurs, dépenses et transfert créés');
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });