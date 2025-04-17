import { ResponseDTO } from "../dto/response.dto";
import Profile from "../models/profile.model";

export class DonorService {
   public static async getDonors(
      page: number = 1,
      limit: number = 10,
      blood_group?: string | string[],
      searchText?: string
   ) {
      try {
         const skip = (page - 1) * limit;
         const filter: any = { available_donate: true };

         // Blood group filtering logic
         if (blood_group) {
            if (Array.isArray(blood_group)) {
               // Handle multiple blood groups (e.g., ["A+", "B-"])
               filter.blood_group = { $in: blood_group.map((bg) => bg.trim()) };
            } else {
               // Handle single blood group (like A+)
               // Decode URL-encoded blood group, replacing space with '+' if needed
               const sanitizedBloodGroup = decodeURIComponent(blood_group.trim()).replace(
                  / /g,
                  "+"
               );
               filter.blood_group = sanitizedBloodGroup;
            }
         }

         // Apply search text filtering (e.g., for first name, last name, email, phone)
         if (searchText) {
            filter.$or = [
               { first_name: { $regex: searchText, $options: "i" } },
               { last_name: { $regex: searchText, $options: "i" } },
               { email: { $regex: searchText, $options: "i" } },
               { phone: { $regex: searchText, $options: "i" } },
            ];
         }

         // Log the final filter to help with debugging
         console.log("MongoDB Query Filter:", JSON.stringify(filter, null, 2));

         // Fetch donor profiles with pagination and populate user details
         const donors = await Profile.find(filter)
            .populate("user_id", "email is_verified")
            .skip(skip)
            .limit(limit);

         // Get the total number of donors matching the filter
         const totalDonors = await Profile.countDocuments(filter);

         // Format the response with pagination details
         const donorList = {
            currentPage: page,
            totalPages: Math.ceil(totalDonors / limit),
            totalDonors,
            donors: donors.map((donor) => ({
               _id: donor._id.toString(),
               user_id: donor.user_id,
               name: `${donor.first_name} ${donor.last_name}`.trim(),
               blood_group: donor.blood_group,
               phone: donor.phone,
               email: donor.user_id.email,
               profile_image: donor.profile_image,
               available_donate: donor.available_donate,
               last_donation_date: donor.last_donation_date,
               address: donor.address,
            })),
         };

         return ResponseDTO.success("Donor list.", donorList);
      } catch (error: any) {
         // Return an error message if something goes wrong
         return ResponseDTO.error(error.message || "Error fetching donors");
      }
   }
}
