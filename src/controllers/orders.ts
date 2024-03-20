import express, { Request, Response } from "express";

import ordersService from "../services/orders";
import Order, { OrderDocument } from "../model/Order";

// GET ORDERS
export async function getAllOrders(_: Request, response: Response) {
  const orders = await ordersService.getAllOrders();
  response.status(200).json(orders);
}

// CREATE AN ORDER
export async function createOrder(request: Request, response: Response) {
  const newData = new Order(request.body);
  const newOrder = await ordersService.createOrder(newData);
  response.status(201).json(newOrder);
}

// GET AN ORDER
export async function getOrder(request: Request, response: Response) {
  const foundOrder = await ordersService.getOrderById(
    request.params.orderId
  );
  response.status(200).json(foundOrder);
}

// UPDATE AN ORDER
export async function updateOrder(request: Request, response: Response) {
  const newData = request.body as Partial<OrderDocument>;
  const foundOrder = await ordersService.updateOrder(
    request.params.orderId, newData
  );
  response.status(200).json(foundOrder);
}

// DELETE AN ORDER
export async function deleteOrder(request: Request, response: Response) {
  const foundOrder = await ordersService.deleteOrderById(
    request.params.orderId
  );
  response.sendStatus(204);
}