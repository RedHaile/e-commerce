import { NextFunction, Request, Response } from "express";

import { User } from "../misc/type";
import { ForbiddenError } from "../errors/ApiError";

const isAdmin = (user: User) => {
  if (user.role === "admin") {
    return true
  }
  return false
}

const adminCheck = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const roleAdmin = isAdmin(request.body);
  if (!roleAdmin) {
    next(new ForbiddenError("You are not the admin!"));
    return;
  }

  next();
};

export default adminCheck;