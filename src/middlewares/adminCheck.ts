// To do: create to check user role.
// if user is an admin => create category/ product
import { NextFunction, Request, Response } from "express";

const adminCheck = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  console.log("admin check ");
  next();
};

export default adminCheck;