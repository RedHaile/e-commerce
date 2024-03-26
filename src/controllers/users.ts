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
// ANDREA
// export async function createNewUser(request: Request, response: Response) {
//   try {
//     const { email, password } = request.body;

//     const saltRounds = 10;
//     const salt = await bcrypt.genSalt(saltRounds);
//     // salt: random string + number

//     const hashedPassword = await bcrypt.hash(password, salt);
//     // password : 123 => "2urofosejf" + "ewuhf" => "2urofosejfewuhf"
//     // password : 123 => "2urofosejf" + "tugh"

//     // salt round = 1 => 'teyeo'
//     // salt round = 4 => "83urnfklwidnwj5"

//     console.log(hashedPassword);
//     const user = new User({ email: email, password: hashedPassword });
//     const newUser = await userServices.createUser(user);
//     response.status(201).json({ newUser });
//   } catch (error) {
//     console.log(error);
//   }
// }

// get user by id
// req.params
// response
// LOGIN 
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
// ANDREA
// export async function loginUser(request: Request, response: Response) {
//   try {
//     // check if email

//     // get user email + password
//     const { email, password } = request.body;

//     // get user => get by email
//     const userData = await userServices.getUserByEmail(email);
//     // handler user not found
//     const hashedPassword = userData.password;
//     console.log(password, hashedPassword, "compare");
//     // compare password
//     // const isMatched = await bcrypt.compare(hashedPassword, password);

//     const isMatched = await bcrypt.compare(password, hashedPassword);
//     console.log(isMatched, "match");

//     if (!isMatched) {
//       throw new BadRequest("Password does not match");
//     }
//     // create token
//     const JWT_SECRET = process.env.JWT_SECRET as string;
//     console.log(JWT_SECRET, "jwt");

//     const token = jwt.sign(
//       {
//         // should not provide password
//         email: userData.email,
//         _id: userData._id,
//       },
//       JWT_SECRET,

//       {
//         expiresIn: "1h",
//       }
//     );

//     // refresh token  => expiresIn: "20d",

//     const refreshToken = jwt.sign(
//       {
//         // should not provide password
//         email: userData.email,
//         _id: userData._id,
//         firstName: "something",
//       },
//       JWT_SECRET,
//       {
//         expiresIn: "20d",
//       }
//     );
//     response.json({ userData, token, refreshToken });
//     // front-end stores in local storage
//   } catch (error) {
//     console.log(error);
//   }
// }

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
