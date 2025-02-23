import { Request, Response } from "express";
import { UserService } from "../services/user.service";

export class UserController {
   //  Update user details
   public static async updateUser(req: Request, res: Response): Promise<void> {
      const userId = req.params.id;
      const updateData = req.body;

      try {
         const result = await UserService.updateUser(userId, updateData);
         res.status(result.httpStatusCode).json(result);
      } catch (error: any) {
         res.status(500).json({ message: "Internal Server Error" });
      }
   }

   //  Get user details by ID
   public static async getUserById(req: Request, res: Response): Promise<void> {
      const userId = req.params.id;

      try {
         const result = await UserService.getUserById(userId);
         res.status(result.httpStatusCode).json(result);
      } catch (error: any) {
         res.status(500).json({ message: "Internal Server Error" });
      }
   }
}
