import mongoose from "mongoose";
export interface IUser extends mongoose.Document {
   _id: string;
   email: string;
   password: string;
   last_login?: Date;
   is_active: boolean;
   comparePassword(candidatePassword: string): Promise<boolean>;
}
