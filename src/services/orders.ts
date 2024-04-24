import { NotFoundError } from "../errors/ApiError";
import Order, { OrderDocument } from "../model/Order";
import { OrderProductDocument } from "../model/OrderProduct";
import Product from "../model/Product";
import User, { UserDocument } from "../model/User";
import products from "./products";

const getAllOrders = async (): Promise<OrderDocument[]> => {
  try {
    return await Order.find().populate({
      path: "products",
      populate: {
        path: "productId",
        model: "Product",
      },
    });
  } catch (error) {
    throw new Error("Failed to fetch orders");
  }
};

const createOrder = async (
  products: OrderProductDocument[],
  userId: string
): Promise<OrderDocument> => {
  try {
    const productPrices = await Promise.all(
      products.map(async (product: OrderProductDocument) => {
        const productData = await Product.findById(product.productId);
        if (!productData) {
          throw new NotFoundError("Product not found");
        }
        return productData.price * product.quantity;
      })
    );

    const totalPrice = productPrices.reduce(
      (total, productTotal) => total + productTotal,
      0
    );

    const order = new Order({ products, totalPrice });
    const newOrder = await order.save();

    await User.findByIdAndUpdate(userId, { $push: { orders: newOrder._id } });

    return newOrder;
  } catch (error) {
    throw new Error("Failed to create orders");
  }
};

const getOrderByUserId = async (
  userId: string
): Promise<UserDocument | undefined> => {
  const foundOrder = await User.findById(userId);
  if (foundOrder) {
    return foundOrder;
  }
  throw new NotFoundError();
};

const deleteOrderById = async (id: string) => {
  const foundOrder = await Order.findByIdAndDelete(id);
  if (foundOrder) {
    return foundOrder;
  }
  throw new NotFoundError();
};

const updateOrder = async (
  id: string,
  newInformation: Partial<OrderDocument>
) => {
  const updatedOrder = await Order.findByIdAndUpdate(id, newInformation, {
    new: true,
  });
  if (updatedOrder) {
    return updatedOrder;
  }
  throw new NotFoundError();
};

export default {
  getAllOrders,
  createOrder,
  getOrderByUserId,
  deleteOrderById,
  updateOrder,
};
