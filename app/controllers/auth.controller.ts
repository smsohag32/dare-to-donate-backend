import { Request, Response } from "express";
import AuthService from "../services/auth.service";

export class AuthController {
   // Sign up user
   public static async signUp(req: Request, res: Response): Promise<void> {
      const newUserData = req.body;
      try {
         // Call signUp service to register the user
         const newUser = await AuthService.signUp(newUserData);
         res.status(201).json({
            message: "User registered successfully",
            user: {
               _id: newUser.user._id,
               email: newUser.user.email,
               is_active: newUser.user.is_active,
               phone: newUser.user.phone,
               blood_group: newUser.user.blood_group,
            },
         });
      } catch (error: any) {
         res.status(400).json({
            message: error.message || "Error during sign up",
         });
      }
   }

   // Sign in user
   public static async signIn(req: Request, res: Response): Promise<void> {
      const { email, password } = req.body;

      try {
         // Call signIn service to authenticate and generate JWT
         const { token, user } = await AuthService.signIn(email, password);
         res.status(200).json({
            message: "User logged in successfully",
            token, // JWT token
            user, // User object containing firstName, lastName, etc.
         });
      } catch (error: any) {
         res.status(400).json({
            message: error.message || "Error during sign in",
         });
      }
   }
}

export default AuthController;
