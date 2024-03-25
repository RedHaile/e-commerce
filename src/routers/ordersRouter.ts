import express from "express";

import {
  getAllOrders,
  createOrder,
  getOrder,
  updateOrder,
  deleteOrder,
} from "../controllers/orders";

const router = express.Router();

// BASE: api/v1/orders
// GET ORDERS
router.get("/", getAllOrders);

// A USER CREATES AN ORDER
router.post("/:userId", createOrder);

// GET AN ORDER BY USER ID
router.get("/:userId", getOrder);

// UPDATE AN ORDER
router.put("/:orderId", updateOrder);

// DELETE AN ORDER
router.delete("/:orderId", deleteOrder);

export default router;
