import { db } from "../src/prisma/db.ts";

export async function getAllUsers() {
  return await db.orm.public.User.all();
}