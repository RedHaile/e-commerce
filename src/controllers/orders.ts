import express, { Request, Response } from "express";

import { Order } from "../misc/type";

let orders: Order[] = [
  { 
    orderId: "1", 
    userId: "1", 
    products: [{id: "1", title: "product1"}, {id: "2", title: "product2"}], 
    totalPrice: 30, 
    createAt: "14/03/2024" 
  },
  { 
    orderId: "2", 
    userId: "2", 
    products: [{id: "3", title: "product3"}, {id: "4", title: "product4"}], 
    totalPrice: 40, 
    createAt: "15/03/2024" 
  },
];

// GET ORDERS
export async function getAllOrders(_: Request, response: Response) {
  response.status(200).json(orders)
}

// CREATE AN ORDER
export async function createOrder(request: Request, response: Response) {
  const newOrder = request.body as Order;
  orders.push(newOrder);
  response.status(201).json(orders);
}

// GET AN ORDER
export async function getOrder(request: Request, response: Response) {
  let orderId = request.params.orderId;
  let result = orders.filter((order) => order.orderId === orderId);
  response.status(200).json(result);
}

// UPDATE AN ORDER
export async function updateOrder(request: Request, response: Response) {
  let orderId = request.params.orderId;
  let newOrder = request.body as Order;
  let orderIndex = orders.findIndex((order) => order.orderId === orderId)
  if (orderIndex !== -1) {
    orders[orderIndex] = { ...orders[orderIndex], ...newOrder };
    response.status(200).json(newOrder);
  } else {
    response.status(404).json("Order not found!");
  }
}

// DELETE AN ORDER
export async function deleteOrder(request: Request, response: Response) {
  let orderId = request.params.orderId;
  let newOrder = request.body as Order;
  let orderIndex = orders.findIndex((order) => order.orderId === orderId)
  if (orderIndex !== -1) {
    orders[orderIndex] = { ...orders[orderIndex], ...newOrder };
    response.status(200).json(newOrder);
  } else {
    response.status(404).json("Order not found!");
  }
}
