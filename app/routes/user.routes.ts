import express from "express";
import { UserController } from "../controllers/user.controller";
import { authMiddleware } from "../middleware/authMiddleware";
import { upload } from "../utils/upload";

const userRoute = express.Router();

userRoute.get("/user/:id", authMiddleware, UserController.getUserById);
userRoute.put("/user/:id", authMiddleware, upload.single("image"), UserController.updateUser);
userRoute.delete(
   "/user/remove-profile-image/:id",
   authMiddleware,
   UserController.removeProfileImage
);

export default userRoute;
