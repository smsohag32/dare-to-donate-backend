import { ResponseDTO } from "../dto/response.dto";
import RequestModel from "../models/request.model";

class RequestService {
   public static async createRequest(newRequestData: any): Promise<any> {
      try {
         if (!newRequestData) {
            return ResponseDTO.error("Request data not found", 404);
         }

         const newRequest = new RequestModel(newRequestData);
         await newRequest.save();

         return ResponseDTO.success("New request send successfully.", newRequestData);
      } catch (error: any) {
         return ResponseDTO.error(error.message || "Failed to send request");
      }
   }

   // class for get all request by donor id
   public static async getRequestsByDonor(donorId: string) {
      try {
         const request = await RequestModel.find({ donor_id: donorId }).populate(
            "request_maker donor_id"
         );
         return ResponseDTO.success("Requests retrieved successfully.", request);
      } catch (error: any) {
         return ResponseDTO.error(error.message || "Failed to fetch requests");
      }
   }

   public static async getRequestsByUser(userId: string) {
      try {
         const request = await RequestModel.find({ request_maker: userId }).populate(
            "request_maker donor_id"
         );
         return ResponseDTO.success("Requests retrieved successfully.", request);
      } catch (error: any) {
         return ResponseDTO.error(error.message || "Failed to fetch requests");
      }
   }

   public static async changeRequestStatus(
      requestId: string,
      newStatus: "pending" | "accept" | "declined" | "donate"
   ) {
      try {
         if (!requestId) {
            return ResponseDTO.error("Request id not provide.", 404);
         }

         const request = await RequestModel.findByIdAndUpdate(
            requestId,
            { status: newStatus },
            { new: true }
         );
         if (!request) {
            return ResponseDTO.error("Request not found", 404);
         }
         return ResponseDTO.success(
            `Request status updated successfully to ${newStatus}.`,
            request
         );
      } catch (error: any) {
         return ResponseDTO.error(error.message || "Failed to update request status");
      }
   }
   public static async updateRequest(requestId: string, updateData: any) {
      try {
         if (!requestId) {
            return ResponseDTO.error("Request id not provide.", 404);
         }
         const request = await RequestModel.findByIdAndUpdate(requestId, updateData, { new: true });
         return ResponseDTO.success(`Update request`, request);
      } catch (error: any) {
         return ResponseDTO.error(error.message || "Failed to update request");
      }
   }

   public static async deleteRequest(requestId: string) {
      try {
         if (!requestId) {
            return ResponseDTO.error("Request id not provide.", 404);
         }
         const request = await RequestModel.findByIdAndDelete(requestId);
         if (!request) {
            return ResponseDTO.error("Request not found", request);
         }
         return ResponseDTO.success("Request deleted successfully.", 200);
      } catch (error: any) {
         return ResponseDTO.error(error.message || "Failed to delete request");
      }
   }
}

export default RequestService;
