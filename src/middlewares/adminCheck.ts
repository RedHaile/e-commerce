import { NextFunction, Request, Response } from "express";

import { User } from "../misc/type";
import { ForbiddenError } from "../errors/ApiError";

const isAdmin = (user: User | undefined): boolean => {
  if (!user || user.role !== "admin") {
    return false;
  }
  return true
}

const adminCheck = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const user = request.body as User;
  const roleAdmin = isAdmin(user);
  if (!roleAdmin) {
    next(new ForbiddenError("Access denied! You are not the admin!"));
    return;
  }

  next();
};

export default adminCheck;