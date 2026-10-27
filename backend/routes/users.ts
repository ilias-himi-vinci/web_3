import { Router } from "express";
import { getAllUsers } from "../services/users.ts";

const router = Router();

router.get("/users", async (req, res) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (error: unknown) {
    console.error(error);
    res.status(500).json({ error: "Failed to get users" });
  }
});

export default router;