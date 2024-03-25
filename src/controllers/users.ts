import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

import usersService from "../services/users";
import { InternalServerError, NotFoundError } from "../errors/ApiError";
import User, { UserDocument } from "../model/User";


export async function getAllUsers(_: Request, response: Response, next: NextFunction) {
  try {
    const Users = await usersService.getAllUsers();
    response.status(200).json(Users);
  } catch (error) {
    next(new InternalServerError());
  }
}

export async function createUser(request: Request, response: Response, next: NextFunction) {
  try {
    const newData = new User(request.body);
    const newUser = await usersService.createUser(newData);
    response.status(201).json(newUser);
  } catch (error) {
    next(new InternalServerError());
  }
}

// get user by id
// req.params
// response
export async function getUser(request: Request, response: Response, next: NextFunction) {
  try {
    const foundUser = await usersService.findUserByID(request.params.userId);
    response.status(200).json(foundUser);
  } catch (error) {
    if (error instanceof NotFoundError) {
      response.status(404).json({
        message: `Cannot find order with id ${request.params.orderId}`,
      });
      return;
    }
    
    if (error instanceof mongoose.Error.CastError) {
      response.status(404).json({
        message: `wrong id format`,
      });
      return;
    }

    next(new InternalServerError());
  }
}

export async function updateUser(request: Request, response: Response, next: NextFunction) {
  try {
    const updatedUser = await usersService.updateUser(request.params.userId, request.body);
    response.status(200).json(updatedUser);
  }  
    catch (error) {
      if (error instanceof NotFoundError) {
        response.status(404).json({
          message: `Cannot find order with id ${request.params.orderId}`,
        });
        return;
      }
      
      if (error instanceof mongoose.Error.CastError) {
        response.status(404).json({
          message: `wrong id format`,
        });
        return;
      }
  
      next(new InternalServerError());
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
    if (error instanceof NotFoundError) {
      response.status(404).json({
        message: `Cannot find order with id ${request.params.orderId}`,
      });
      return;
    }
    
    if (error instanceof mongoose.Error.CastError) {
      response.status(404).json({
        message: `wrong id format`,
      });
      return;
    }

    next(new InternalServerError());
  }
}
