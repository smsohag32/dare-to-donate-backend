import express from "express";
import { UserController } from "../controllers/user.controller";
import { authMiddleware } from "../middleware/authMiddleware";

const userRoute = express.Router();

userRoute.get("/user/:id", authMiddleware, UserController.getUserById);
userRoute.put("/user/:id", authMiddleware, UserController.updateUser);

export default userRoute;
