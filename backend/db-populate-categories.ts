import { db } from './src/prisma/db.ts';

const categories = [
  { name: 'Food', color: '#e67e22' },
  { name: 'Transport', color: '#3498db' },
  { name: 'Leisure', color: '#9b59b6' },
  { name: 'Housing', color: '#2ecc71' },
];

async function main() {
  for (const category of categories) {
    await db.orm.public.Category.create(category);
  }
  console.log(`${categories.length} catégories créées`);
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });