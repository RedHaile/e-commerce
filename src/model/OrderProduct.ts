import mongoose, { Document, Schema } from "mongoose";

import { OrderProduct } from "../misc/type";

export type OrderProductDocument = Document & OrderProduct;

export const OrderProductSchema = new mongoose.Schema({
  orderProductId: {
    type: String,
    required: true,
  },

  productId: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  orderId: {
    type: Schema.Types.ObjectId,
    ref: "Order",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

export default mongoose.model<OrderProductDocument>(
  "OrderProduct",
  OrderProductSchema
);
