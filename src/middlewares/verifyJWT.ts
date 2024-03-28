import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import { InternalServerError, UnauthorizedError } from "../errors/ApiError";

const verifyJWT = async (request: Request, response: Response, next: NextFunction) => {
  const authHeader = request.headers.authorization;
  const JWT_SECRET = process.env.JWT_SECRET as string;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    try {
      const decoded = await jwt.verify(token, JWT_SECRET);
      // console.log("decoded")
      // console.log("Decoded Token:", decoded);
      next();
    } catch (error) {
      next(new UnauthorizedError("Invalid token!"));
    }
  } else {
    next(new UnauthorizedError("Authorization header missing")) 
  }
}

export default verifyJWT
