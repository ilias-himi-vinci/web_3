import { Router } from "express";
import { getAllCategories } from "../services/categories.ts";

const router = Router();

router.get("/categories", async (req, res) => {
  try {
    const categories = await getAllCategories();
    res.json(categories);
  } catch (error: unknown) {
    console.error(error);
    res.status(500).json({ error: "Failed to get categories" });
  }
});

export default router;