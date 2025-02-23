import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import { IUser } from "../types/user.interface";

const UserSchema = new Schema<IUser>(
   {
      email: { type: String, required: true, unique: true, trim: true },
      password: { type: String, required: true },
      last_login: { type: Date },
      is_active: { type: Boolean, default: true },
   },
   { timestamps: true }
);

// Hash password before saving
UserSchema.pre("save", async function (next) {
   if (!this.isModified("password")) return next();

   try {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
      next();
   } catch (error) {
      next(error as Error);
   }
});

// Compare password method
UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
   return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
export default User;
