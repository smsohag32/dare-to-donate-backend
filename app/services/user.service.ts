import User from "../models/user.model";
import Profile from "../models/profile.model";
import mongoose from "mongoose";
import { ResponseDTO } from "../dto/response.dto";
import { deleteImageFromCloud } from "../utils/uploadImage";

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
            profile = new Profile({ user_id: new mongoose.Types.ObjectId(userId) });
         }

         // check already image save or not
         if (updateData?.profile_image && profile?.profile_image) {
            await deleteImageFromCloud([profile?.profile_image]);
         }
         // Update fields only if they are provided
         Object.keys(updateData).forEach((key) => {
            if (updateData[key] !== undefined) {
               (profile as any)[key] = updateData[key];
            }
         });

         await profile.save();

         const responseDto = {
            _id: user._id.toString(),
            email: user.email,
            is_active: user.is_active,
            is_verified: user.is_verified,
            phone: profile?.phone || "",
            role: user?.role || "",
            blood_group: profile?.blood_group || "",
            profile_image: profile?.profile_image || "",
         };

         return ResponseDTO.success("User profile updated successfully", responseDto);
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

   public static async deleteProfileImage(userId: string): Promise<any> {
      try {
         const profile = await Profile.findOne({ user_id: userId });
         if (!profile) {
            return ResponseDTO.error("User not found", 404);
         }

         if (profile?.profile_image) {
            await deleteImageFromCloud([profile?.profile_image]);
         }

         profile.profile_image = "";
         await profile.save();

         return ResponseDTO.success("User profile image remove successfully.", profile);
      } catch (error: any) {
         return ResponseDTO.error(error.message || "Error fetching user details");
      }
   }
}
