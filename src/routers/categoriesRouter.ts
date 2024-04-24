import express from "express";

import {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategoryById,
} from "../controllers/categories";
import verifyJWT from "../middlewares/verifyJWT";
import adminCheck from "../middlewares/adminCheck";

const router = express.Router();

router.get("/", getAllCategories);

router.get("/:categoryId", getCategoryById);

router.post("/", verifyJWT, adminCheck, createCategory);

router.put("/:categoryId", verifyJWT, adminCheck, updateCategory);

router.delete("/:categoryId", verifyJWT, adminCheck, deleteCategoryById);

export default router;
