import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

import ordersService from "../services/orders";
import Order, { OrderDocument } from "../model/Order";
import { InternalServerError, NotFoundError } from "../errors/ApiError";


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
export async function getOrder(request: Request, response: Response, next: NextFunction) {
  try {
    const foundOrder = await ordersService.getOrderById(
      request.params.orderId
    );
    response.status(200).json(foundOrder);
  } catch (error) {
    if (error instanceof NotFoundError) {
      response.status(404).json({
        message: `Cannot find order with id ${request.params.orderId}`,
      });
      return;
    }
    
    if (error instanceof mongoose.Error.CastError) {
      response.status(404).json({
        message: `wrong id format`,
      });
      return;
    }

    next(new InternalServerError());
  }
}

// UPDATE AN ORDER
export async function updateOrder(request: Request, response: Response, next: NextFunction) {
  try {
    const newData = request.body as Partial<OrderDocument>;
    const foundOrder = await ordersService.updateOrder(
      request.params.orderId, newData
    );
    response.status(200).json(foundOrder);
  } catch (error) {
    if (error instanceof NotFoundError) {
      response.status(404).json({
        message: `Cannot find order with id ${request.params.orderId}`,
      });
      return;
    }
    
    if (error instanceof mongoose.Error.CastError) {
      response.status(404).json({
        message: `wrong id format`,
      });
      return;
    }

    next(new InternalServerError());
  }

}

// DELETE AN ORDER
export async function deleteOrder(request: Request, response: Response, next: NextFunction) {
  try {
    const foundOrder = await ordersService.deleteOrderById(
      request.params.orderId
    );
    response.sendStatus(204);
  } catch (error) {
    if (error instanceof NotFoundError) {
      response.status(404).json({
        message: `Cannot find order with id ${request.params.orderId}`,
      });
      return;
    }
    
    if (error instanceof mongoose.Error.CastError) {
      response.status(404).json({
        message: `wrong id format`,
      });
      return;
    }

    next(new InternalServerError());
  }

}