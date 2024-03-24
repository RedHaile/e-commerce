import express from "express";

import {
  getAllOrders,
  createOrder,
  getOrder,
  updateOrder,
  deleteOrder,
} from "../controllers/orders";
import loggedInCheck from "../middlewares/loggedInCheck";

const router = express.Router();

// BASE: api/v1/orders
// GET ORDERS
router.get("/", getAllOrders);

// CREATE AN ORDER
router.post("/", loggedInCheck, createOrder);

// GET AN ORDER
router.get("/:orderId", getOrder);

// UPDATE AN ORDER
router.put("/:orderId", updateOrder);

// DELETE AN ORDER
router.delete("/:orderId", deleteOrder);

export default router;
