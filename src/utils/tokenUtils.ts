import jwt from "jsonwebtoken";
import { Response } from "express";
import { UserDocument } from "../model/User";

export function generateToken(user: UserDocument): string {
  const JWT_SECRET = process.env.JWT_SECRET as string;
  
  const token = jwt.sign(
    {
      // DO NOT PROVIDE PASSWORD HERE
      email: user.email,
      role: user.role,
      _id: user._id,
    },
    JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );
  
  return token;
}