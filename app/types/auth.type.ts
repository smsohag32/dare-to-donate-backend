import { IUser } from "./user.interface";

export interface AuthResponse {
   token: string;
   user: {
      _id: string;
      email: string;
      is_active: boolean;
      phone: string;
      blood_group: string;
   };
}
