// //userRouter

import express from "express";

import { createUser, deleteUser, findUserByID, getAllUsers, updateUser } from "../controllers/users";

const router = express.Router();

router.get("/", getAllUsers);

router.get("/:userId", findUserByID);

router.post("/", createUser);

router.put("/:userId", updateUser);

router.delete("/:userId", deleteUser);

export default router;
