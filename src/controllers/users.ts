import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";

import { generateHashedPassword } from "../utils/passwordUtils";
import usersService from "../services/users";
import {
  BadRequest,
  InternalServerError,
  NotFoundError,
  ConflictError,
} from "../errors/ApiError";
import User, { UserDocument } from "../model/User";
import apiErrorhandler from "../middlewares/apiErrorhandler";
import { createUserValidation } from "../validations/userValidation";
import { generateToken } from "../utils/tokenUtils";

export async function getAllUsers(
  _: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const Users = await usersService.getAllUsers();
    response.status(200).json(Users);
  } catch (error) {
    next(new InternalServerError());
  }
}

export async function createUser(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const { firstname, lastname, email, password } = request.body;

    await createUserValidation.validateAsync(request.body);

    const hashedPassword = await generateHashedPassword(password);
    const user = new User({
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: hashedPassword,
      role: "customer",
    });
    const newUser = await usersService.createUser(user);
    response.status(201).json(newUser);
  } catch (error) {
    if (error instanceof ConflictError) {
      response.status(error.statusCode).json({
        message: error.message,
      });
      return;
    }
    next(new InternalServerError());
  }
}

export async function loginUser(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const { email, password } = request.body;
    const userData = await usersService.getUserByEmail(email);
    const hashedPassword = userData.password;

    const isMatched = await bcrypt.compare(password, hashedPassword);

    if (isMatched === false) {
      throw new BadRequest("Wrong password, please try again!");
    }

    const token = generateToken(userData);

    response.json({ userData, token });
  } catch (error) {
    if (error instanceof BadRequest) {
      apiErrorhandler(error, request, response, next);
    }

    next(new InternalServerError());
  }
}

export async function updatedUser(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(request.body.password, salt);
    request.body.password = hashedPassword;

    const updatedUser = await usersService.updateUser(
      request.params.userId,
      request.body
    );

    response.status(200).json(updatedUser);
  } catch (error) {
    if (error instanceof NotFoundError) {
      apiErrorhandler(error, request, response, next);
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

export async function requestPassword(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const email = request.body.email;
    const user = await usersService.getUserByEmail(email);
    const userId = user._id;

    request.body.password = "123";
    const updatedUser = await usersService.updateUser(userId, request.body);

    response
      .status(200)
      .json(
        `Your one-time password is ${request.body.password}, please log in and change immediately!`
      );
  } catch (error) {
    if (error instanceof NotFoundError) {
      apiErrorhandler(error, request, response, next);
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

export async function deleteUser(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const deletedUser = await usersService.deleteUser(request.params.userId);
    if (deletedUser) {
      response.sendStatus(204);
    } else {
      response.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    if (error instanceof NotFoundError) {
      apiErrorhandler(error, request, response, next);
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

export async function banUser(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const userId = request.params.userId;

    const updatedUser = await usersService.updateUser(userId, {
      banStatus: true,
    });

    response
      .status(200)
      .json({ message: "User banned successfully!", user: updatedUser });
  } catch (error) {
    next(new InternalServerError());
  }
}

export async function unbanUser(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const userId = request.params.userId;

    const updatedUser = await usersService.updateUser(userId, {
      banStatus: false,
    });

    response
      .status(200)
      .json({ message: "User unbanned successfully!", user: updatedUser });
  } catch (error) {
    next(new InternalServerError());
  }
}
