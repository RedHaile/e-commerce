//userRouter
import express, { Request, Response } from "express";
import { User } from "../misc/type";

// fake users database
let users: User[] = [
  {
    id: "1",
    password: "123456",
    email: "user1@example.com",
    fullname: "User 1",
    role: "user",
    avatar: "https://example.com/avatar1.png",
  },
  {
    id: "2",
    password: "234567",
    email: "user2@example.com",
    fullname: "User 2",
    role: "admin",
    avatar: "https://example.com/avatar2.png",
  },
];

const router = express.Router();

router.get("/", (request: Request, response: Response) => {
  // query
  const idQuery = request.query.id as string;
  if (idQuery) {
    // Filter users based on id
    const filteredUsers = users.filter((user) => user.id.includes(idQuery));
    response.status(200).json(filteredUsers);
  } else {
  response.status(200).json(users);
  }
});

router.post("/", (request: Request, response: Response) => {
  const newUser = request.body;
  users.push(newUser);
  response.status(201).json(users);
});

router.put("/:userId", (request: Request, response: Response) => {
    const userId = request.params.userId;
    const userData = request.body as User;
  
    // Find the index of the user in the array
    const index = users.findIndex((user) => user.id === userId);
  
    if (index !== -1) {
      // Update the user's information
      users[index] = { ...users[index], ...userData };
      response.status(200).json(users[index]);
    } else {
      response.status(404).json({ message: "User not found" });
    }
  });
  
router.delete("/:userId", (request: Request, response: Response) => {
  const userId = request.params.userId;
  users = users.filter((item) => item.id !== userId);
  response.sendStatus(204);
});

export default router;

