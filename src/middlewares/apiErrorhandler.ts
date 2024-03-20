//
// logger
import e, { NextFunction, Request, Response } from "express";
import { ApiError } from "../errors/ApiError";

function apiErrorhandler(
  error: ApiError,
  request: Request,
  response: Response,
  next: NextFunction
) {
  // log error
  console.log(error, "error from middleware");
  if (!error.statusCode && !error.message) {
    response.status(500).json({ message: "Internal error" });
  }
  response.status(error.statusCode).json({ message: error.message });
}

export default apiErrorhandler;