import express from "express";
import AuthController from "../controllers/auth.controller";

const authRoute = express.Router();

authRoute.post("/auth/sign-in", AuthController.signIn);
authRoute.post("/auth/sign-up", AuthController.signUp);

export default authRoute;
