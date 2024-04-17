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

// router.post("/", verifyJWT, adminCheck, createCategory);
router.post("/", createCategory);

// router.put("/:categoryId", verifyJWT, adminCheck, updateCategory);
router.put("/:categoryId", updateCategory);

// router.delete("/:categoryId", verifyJWT, adminCheck, deleteCategoryById);
router.delete("/:categoryId", deleteCategoryById);

export default router;
