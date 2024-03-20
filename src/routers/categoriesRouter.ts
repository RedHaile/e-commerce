import express from "express";

import {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategoryById,
} from "../controllers/categories";
import adminCheck from "../middlewares/adminCheck";

const router = express.Router();

router.get("/", getAllCategories);
router.get("/:categoryId", getCategoryById);
router.post("/", adminCheck, createCategory);
router.put("/:categoryId", updateCategory);
router.delete("/:categoryId", deleteCategoryById);

export default router;
