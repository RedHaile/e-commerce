import Order, { OrderDocument } from "../model/Order";

const getAllOrders = async (): Promise<OrderDocument[]> => {
  return await Order.find();
};

const createOrder = async (order: OrderDocument): Promise<OrderDocument> => {
  return await order.save();
};

const getOrderById = async (id: string): Promise<OrderDocument | undefined> => {
  const foundOrder = await Order.findById(id);
  if (foundOrder) {
    return foundOrder;
  }
};

const deleteOrderById = async (id: string) => {
  const foundOrder = await Order.findByIdAndDelete(id);
  if (foundOrder) {
    return foundOrder;
  }
};

const updateOrder = async (id: string, newInformation: Partial<OrderDocument>) => {
  const foundOrder = await Order.findByIdAndUpdate(id, newInformation, {
    new: true,
  });
  return foundOrder;
};

export default {
  getAllOrders,
  createOrder,
  getOrderById,
  deleteOrderById,
  updateOrder,
};