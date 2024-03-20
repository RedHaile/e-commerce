// middleware
// function: request, response and next
// console.log string

import { NextFunction, Request, Response } from "express";

const loggingMiddleware = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  console.log("logging ");
  next();
};

export default loggingMiddleware;