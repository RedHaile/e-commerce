// //userRouter

import express from "express";

import { createUser, deleteUser, loginUser, getAllUsers, updateUser } from "../controllers/users";
import verifyJWT from "../middlewares/verifyJWT";
import adminCheck from "../middlewares/adminCheck";

const router = express.Router();

router.get("/", getAllUsers);

// LOGIN
router.post("/login", loginUser);

// REGISTER
router.post("/", createUser);

router.put("/:userId", verifyJWT, updateUser);

router.delete("/:userId", deleteUser);

export default router;
