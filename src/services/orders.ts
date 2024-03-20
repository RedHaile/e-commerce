import { NotFoundError } from "../errors/ApiError";
import Order, { OrderDocument } from "../model/Order";

const getAllOrders = async (): Promise<OrderDocument[]> => {
  try {
    return await Order.find();
  } catch (error) {
    throw new Error("Failed to fetch orders");
  }
};

const createOrder = async (order: OrderDocument): Promise<OrderDocument> => {
  try {
    return await order.save();
  } catch (error) {
    throw new Error("Failed to create orders");
  }
};

const getOrderById = async (id: string): Promise<OrderDocument | undefined> => {
  const foundOrder = await Order.findById(id);
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

const updateOrder = async (id: string, newInformation: Partial<OrderDocument>) => {
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
  getOrderById,
  deleteOrderById,
  updateOrder,
};