// //userRouter

import express from "express";

import { createUser, deleteUser, loginUser, getAllUsers, updateUser, banUser, unbanUser } from "../controllers/users";
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

router.post("/:userId/ban", verifyJWT, adminCheck, banUser);
router.post("/:userId/unban", verifyJWT, adminCheck, unbanUser);

export default router;
