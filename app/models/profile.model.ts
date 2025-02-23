import mongoose, { Schema } from "mongoose";
import { IProfile } from "../types/profile.interface";

const ProfileSchema = new Schema<IProfile>(
   {
      first_name: { type: String, required: true, trim: true },
      last_name: { type: String, required: true, trim: true },
      user_id: { type: Schema.Types.ObjectId, ref: "users", required: true },
      blood_group: {
         type: String,
         required: true,
         enum: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"],
      },
      profile_image: { type: String, default: "" },
      phone: {
         type: String,
         required: true,
         unique: true,
         match: /^[+0-9]{1}[0-9\s\-\(\)]{9,20}$/,
      },
      secondary_phone: { type: String, match: /^[+0-9]{1}[0-9\s\-\(\)]{9,20}$/ },
      address: {
         street: { type: String, required: true },
         city: { type: String, required: true },
         state: { type: String, required: true },
         zip: { type: String, required: true },
         country: { type: String, required: true },
      },
      last_donation_date: { type: Date },
      available_donate: { type: Boolean, default: true },
   },
   { timestamps: true }
);

const Profile = mongoose.models.profiles || mongoose.model<IProfile>("profiles", ProfileSchema);
export default Profile;
