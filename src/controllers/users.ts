import express, { NextFunction, Request, Response } from "express";

import usersService from "../services/users";
import { InternalServerError, NotFoundError } from "../errors/ApiError";
import User, { UserDocument } from "../model/User";


export async function getAllUsers(_: Request, response: Response) {
  const Users = await usersService.getAllUsers();
  response.status(200).json(Users);
}

export async function createUser(request: Request, response: Response) {
  const newData = new User(request.body);
  const newUser = await usersService.createUser(newData);
  response.status(201).json(newUser);
}

// get user by id
// req.params
// response
export async function getUser(request: Request, response: Response, next: NextFunction) {
  try {
    const foundUser = await usersService.findUserByID(request.params.userId);
    if (!foundUser) {
      throw new NotFoundError("Not Found");
    }
    response.status(200).json(foundUser);
  } catch (error) {
  next(error instanceof NotFoundError ? error : new InternalServerError("Internal error"));
  }
}

export async function updateUser(request: Request, response: Response, next: NextFunction) {
  try {
    const updatedUser = await usersService.updateUser(request.params.userId, request.body);
    if (!updatedUser) {
      throw new NotFoundError("Not found");
    }
    response.status(200).json(updatedUser);
  }  
    catch (error) {
    next(error instanceof NotFoundError ? error : new InternalServerError("Internal error"));
  }
}

export async function deleteUser(request: Request, response: Response, next: NextFunction) {
  try {
    const deletedUser = await usersService.deleteUser(request.params.userId);
    if (deletedUser) {
      response.sendStatus(204);
    } else {
      response.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    next(new InternalServerError("Internal error"));
  }
}
