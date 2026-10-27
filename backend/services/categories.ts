import { db } from "../src/prisma/db.ts";

export async function getAllCategories() {
  return await db.orm.public.Category.all();
}