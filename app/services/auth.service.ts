import jwt from "jsonwebtoken";
import User from "../models/user.model";
import Profile from "../models/profile.model";
import dotenv from "dotenv";
import { AuthResponse } from "../types/auth.type";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
   throw new Error("JWT_SECRET environment variable is not defined");
}
interface singUpInterface {
   email: string;
   password: string;
   first_name?: string;
   last_name?: string;
   phone?: string;
   blood_group?: string;
   address?: {
      street?: string;
      city?: string;
      state?: string;
      zip?: string;
      country?: string;
   };
}
interface SingUpResponse {
   message: string;
   user: {
      _id: string;
      email: string;
      is_active: boolean;
      phone: string;
      blood_group: string;
   };
}
export class AuthService {
   // ✅ Register a new user (SignUp)
   public static async signUp(newUserData: singUpInterface): Promise<SingUpResponse> {
      try {
         const { email, password, first_name, last_name, phone, blood_group, address } =
            newUserData;
         const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

         if (!emailRegex.test(email)) {
            throw new Error("Invalid email format");
         }

         // Check if the email is already in use
         const existingUser = await User.findOne({ email });
         if (existingUser) {
            throw new Error("Email is already registered.");
         }

         // Create new user
         const newUser = new User({ email, password });
         await newUser.save();

         const newProfile = new Profile({
            user_id: newUser._id,
            first_name: first_name || "",
            last_name: last_name || "",
            phone: phone || "",
            blood_group: blood_group || "",
            address: address || {
               street: "",
               city: "",
               state: "",
               zip: "",
               country: "",
            },
         });
         await newProfile.save();
         return {
            message: "User registered successfully.",
            user: {
               _id: newUser._id.toString(),
               email: newUser.email,
               is_active: newUser.is_active,
               phone: newProfile.phone,
               blood_group: newProfile.blood_group,
            },
         };
      } catch (error: any) {
         throw new Error(error.message || "Error during sign up");
      }
   }

   // ✅ Login user (SignIn)
   public static async signIn(email: string, password: string): Promise<AuthResponse> {
      try {
         const user = await User.findOne({ email });
         if (!user) {
            throw new Error("Invalid email or password");
         }

         // Compare password
         const isMatch = await user.comparePassword(password);
         if (!isMatch) {
            throw new Error("Invalid email or password");
         }

         // Fetch user profile data
         const profile = await Profile.findOne({ userId: user._id });

         // Generate JWT token
         const token = jwt.sign({ userId: user._id, email: user.email }, JWT_SECRET as string, {
            expiresIn: "1d",
         });

         return {
            token,
            user: {
               _id: user._id.toString(),
               email: user.email,
               is_active: user.is_active,
               phone: profile?.phone || "",
               blood_group: profile?.blood_group || "",
            },
         };
      } catch (error: any) {
         throw new Error(error.message || "Error during sign in");
      }
   }
}

export default AuthService;
