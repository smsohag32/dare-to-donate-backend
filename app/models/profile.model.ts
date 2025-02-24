import mongoose, { Schema } from "mongoose";
import { IProfile } from "../types/profile.interface";

const ProfileSchema = new Schema<IProfile>(
   {
      first_name: { type: String, trim: true },
      last_name: { type: String, trim: true },
      user_id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "users",
      },
      blood_group: {
         type: String,
         enum: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"],
         required: false,
         default: "",
      },
      profile_image: { type: String, default: "", required: false }, // Optional
      phone: {
         type: String,
         match: /^[+0-9]{1}[0-9\s\-\(\)]{9,20}$/,
         required: false, // Optional
      },
      secondary_phone: {
         type: String,
         match: /^[+0-9]{1}[0-9\s\-\(\)]{9,20}$/,
         required: false, // Optional
      },
      address: {
         street: { type: String, required: false },
         city: { type: String, required: false },
         state: { type: String, required: false },
         zip: { type: String, required: false },
         country: { type: String, required: false },
      },
      last_donation_date: { type: Date, required: false },
      available_donate: { type: Boolean, default: true, required: false },
   },
   { timestamps: true }
);

const Profile = mongoose.models.profiles || mongoose.model<IProfile>("profiles", ProfileSchema);
export default Profile;
