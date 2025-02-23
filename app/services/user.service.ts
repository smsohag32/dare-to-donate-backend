import User from "../models/user.model";
import Profile from "../models/profile.model";
import mongoose from "mongoose";
import { ResponseDTO } from "../dto/response.dto";

export class UserService {
   // ✅ Update user details in Profile table
   public static async updateUser(userId: string, updateData: any): Promise<any> {
      try {
         const user = await User.findById(userId);
         if (!user) {
            return ResponseDTO.error("User not found", 404);
         }

         let profile = await Profile.findOne({ user_id: userId });

         if (!profile) {
            // Create a profile if it doesn't exist
            profile = new Profile({ user_id: new mongoose.Types.ObjectId(userId) });
         }

         // Update fields only if they are provided
         Object.keys(updateData).forEach((key) => {
            if (updateData[key] !== undefined) {
               (profile as any)[key] = updateData[key];
            }
         });

         await profile.save();

         return ResponseDTO.success("User profile updated successfully", profile);
      } catch (error: any) {
         return ResponseDTO.error(error.message || "Error updating user profile");
      }
   }

   // ✅ Get user details by ID
   public static async getUserById(userId: string): Promise<any> {
      try {
         const user = await User.findById(userId).select("-password");
         if (!user) {
            return ResponseDTO.error("User not found", 404);
         }

         const profile = await Profile.findOne({ user_id: userId });

         return ResponseDTO.success("User details retrieved successfully", { user, profile });
      } catch (error: any) {
         return ResponseDTO.error(error.message || "Error fetching user details");
      }
   }
}
