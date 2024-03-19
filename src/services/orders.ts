import Order, { OrderDocument } from "../model/Order";

const getAllOrders = async (): Promise<OrderDocument[]> => {
  return await Order.find();
};

const createOrder = async (order: OrderDocument): Promise<OrderDocument> => {
  return await order.save();
};

const getOrderById = async (id: string): Promise<OrderDocument | undefined> => {
  const foundCategory = await Order.findById(id);
  if (foundCategory) {
    return foundCategory;
  }
};

const deleteOrderById = async (id: string) => {
  const foundCategory = await Order.findByIdAndDelete(id);
  if (foundCategory) {
    return foundCategory;
  }
};

const updateOrder = async (id: string, newInformation: Partial<OrderDocument>) => {
  const updatedCategory = await Order.findByIdAndUpdate(id, newInformation, {
    new: true,
  });
  return updatedCategory;
};

export default {
  getAllOrders,
  createOrder,
  getOrderById,
  deleteOrderById,
  updateOrder,
};