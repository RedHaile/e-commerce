import express from "express";

import { getAllProducts, createProduct, getProduct, updateProduct, deleteProduct } from "../controllers/products";
import adminCheck from "../middlewares/adminCheck";

const router = express.Router();

// BASE: api/v1/products
// GET PRODUCTS
router.get("/", getAllProducts)

// CREATE A PRODUCT
router.post("/", adminCheck, createProduct);

// GET A PRODUCT
router.get("/:productId", getProduct);

// UPDATE A PRODUCT
router.put("/:productId", updateProduct);

// DELETE A PRODUCT
router.delete("/:productId", deleteProduct);

export default router;
