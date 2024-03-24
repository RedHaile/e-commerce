import { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "../errors/ApiError";
import { User } from "../misc/type";

const loggedInCheck = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const user = request.body as User;

  if (!user) {
    next(new UnauthorizedError("Unauthorized - Please log in"));
    return;
  }
  next();
};

export default loggedInCheck;
