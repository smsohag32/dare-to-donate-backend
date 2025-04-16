import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { uploadImageToCloud } from "../utils/uploadImage";

export class UserController {
   //  Update user details
   public static async updateUser(req: Request, res: Response): Promise<void> {
      const userId = req.params.id;
      try {
         let imageUrls: any = [];
         if (req.file) {
            imageUrls = await uploadImageToCloud([req.file]);
         }

         console.log(imageUrls);
         const content = JSON.parse(req.body.content);
         const updateData = {
            profile_image: imageUrls?.length > 0 ? imageUrls[0] : "",
            ...content,
         };
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

   public static async removeProfileImage(req: Request, res: Response): Promise<void> {
      const userId = req.params.id;
      try {
         const result = await UserService.deleteProfileImage(userId);
         res.status(result.httpStatusCode).json(result);
      } catch (error: any) {
         res.status(500).json({ message: "Internal Server Error" });
      }
   }
}
