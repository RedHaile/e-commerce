import mongoose, { Document, Schema } from "mongoose";

import { Order } from "../misc/type";

export type OrderDocument = Document & Order;

export const OrderSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  products: [
    {
    type: Schema.Types.ObjectId,
    ref: "Product"
    },
  ],
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