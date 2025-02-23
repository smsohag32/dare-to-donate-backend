import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const dbLink = `mongodb+srv://sohagsheik32:${process.env.DB_PASSWORD}@blood-donations.bspzb.mongodb.net/blood_donation_db?retryWrites=true&w=majority&appName=blood-donations`;

export const connectDb = async () => {
   try {
      await mongoose.connect(dbLink);
      console.log("database connected");
   } catch (error: any) {
      console.log("database is not connected");
      console.log(error.message);
   }
};
