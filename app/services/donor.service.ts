import { ResponseDTO } from "../dto/response.dto";
import Profile from "../models/profile.model";

export class DonorService {
   public static async getDonors(
      page: number = 1,
      limit: number = 10,
      blood_group?: string,
      searchText?: string
   ) {
      try {
         const skip = (page - 1) * limit;

         const filter: any = { available_donate: true };

         if (blood_group) {
            filter.blood_group = blood_group;
         }

         // Apply search text if provided
         if (searchText) {
            filter.$or = [
               { first_name: { $regex: searchText, $options: "i" } },
               { last_name: { $regex: searchText, $options: "i" } },
               { email: { $regex: searchText, $options: "i" } },
               { phone: { $regex: searchText, $options: "i" } },
            ];
         }

         // Fetch donor profiles with user details
         const donors = await Profile.find(filter)
            .populate("user_id", "email is_verified")
            .skip(skip)
            .limit(limit);

         // Get total count for pagination info
         const totalDonors = await Profile.countDocuments(filter);

         const donorList = {
            currentPage: page,
            totalPages: Math.ceil(totalDonors / limit),
            totalDonors,
            donors: donors.map((donor) => ({
               name: `${donor.first_name} ${donor.last_name}`.trim(),
               blood_group: donor.blood_group,
               phone: donor.phone,
               email: donor.user_id.email,
               profile_image: donor.profile_image,
               available_donate: donor.available_donate,
               last_donation_date: donor.last_donation_date,
            })),
         };
         return ResponseDTO.success("Donor list.", donorList);
      } catch (error: any) {
         return ResponseDTO.error(error.message || "Error fetching donors");
      }
   }
}
