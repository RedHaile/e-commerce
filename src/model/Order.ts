import mongoose, { Document, Schema } from "mongoose";
import Product, { ProductDocument } from "./Product";
import { Order } from "../misc/type";
import { OrderProductDocument, OrderProductSchema } from "./OrderProduct";

export type OrderDocument = Document & Order;

export const OrderSchema = new mongoose.Schema({
  products: [
    {
      type: OrderProductSchema,

      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: { type: Number, default: 1, required: true },
    },
  ],
  totalPrice: {
    type: Number,

    default: 0,
  },
  createdAt: {
    type: Date,

    default: Date.now,
  },
});

OrderSchema.pre<OrderDocument>("save", async function (next) {
  const products: OrderProductDocument[] = this.get("products");

  const productPrices = await Promise.all(
    products.map(async (product: OrderProductDocument) => {
      const productData = await Product.findById(product.productId);
      if (!productData) {
        throw new Error("Product not found");
      }
      return productData.price * product.quantity;
    })
  );

  const totalPrice = productPrices.reduce(
    (total, productTotal) => total + productTotal,
    0
  );

  this.set("totalPrice", totalPrice);
  next();
});

export default mongoose.model<OrderDocument>("Order", OrderSchema);
