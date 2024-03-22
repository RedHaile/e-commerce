import express, { NextFunction, Request, Response } from "express";

import userServices from "../services/users";
import { User } from "../misc/type";
import { InternalServerError } from "../errors/ApiError";

export async function getAllUsers(_: Request, response: Response) {
  const userList = await userServices.getAllUser();
  console.log(userList, "user");
  response.status(200).json(userList);
}

// get user by id
// req.params
// response
export async function findUserByID(request: Request, response: Response, next: NextFunction) {
  try {
    const userId = request.params.userId;
    const user = await userServices.findUserByID(userId);
    if (user) {
      response.status(200).json(user);
    } else {
      response.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    next(new InternalServerError("Internal error"));
    //response.status(500).json({ message: "Internal server error" });
  }
}

export async function createUser(request: Request, response: Response,  next: NextFunction ) {
  try {
    const newUser = request.body as User;
    const createdUser = await userServices.createUser(newUser);
    response.status(201).json(createdUser);
  } catch (error) {
    next(new InternalServerError("Internal error"));
    //response.status(500).json({ message: "Internal server error" });
  }
}

export async function updateUser(request: Request, response: Response, next: NextFunction) {
  try {
    const userId = request.params.userId;
    const userData = request.body as User;
    const updatedUser = await userServices.updateUser(userId, userData);
    if (updatedUser) {
      response.status(200).json(updatedUser);
    } else {
      response.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    next(new InternalServerError("Internal error"));
    //response.status(500).json({ message: "Internal server error" });
  }
}

export async function deleteUser(request: Request, response: Response, next: NextFunction) {
  try {
    const userId = request.params.userId;
    const deletedUser = await userServices.deleteUser(userId);
    if (deletedUser) {
      response.sendStatus(204);
    } else {
      response.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    next(new InternalServerError("Internal error"));
    //response.status(500).json({ message: "Internal server error" });
  }
}
