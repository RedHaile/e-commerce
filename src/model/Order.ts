import mongoose, { Document } from "mongoose";

import { Order } from "../misc/type";

export type OrderDocument = Document & Order;

const ProductOrderSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
});

export const OrderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  products: {
    type: [ProductOrderSchema],
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model<OrderDocument>("Order", OrderSchema);