// //userRouter

import express from "express";

import { createUser, deleteUser, getUser, getAllUsers, updateUser } from "../controllers/users";

const router = express.Router();

router.get("/", getAllUsers);

// LOGIN
router.get("/:userId", getUser);
// router.post("/login", loginUser);

router.post("/", createUser);

router.put("/:userId", updateUser);

router.delete("/:userId", deleteUser);

export default router;
