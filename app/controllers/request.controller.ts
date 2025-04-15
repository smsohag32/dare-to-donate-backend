import { Request, Response } from "express";
import RequestService from "../services/request.service";

class RequestController {
   public static async createRequest(req: Request, res: Response): Promise<void> {
      try {
         const newRequestData = req.body;
         const result = await RequestService.createRequest(newRequestData);
         res.status(result.httpStatusCode || 500).json(result);
      } catch (error: any) {
         res.status(500).json({ message: "Internal Server Error" });
      }
   }

   // Get all requests by donor ID
   public static async getRequestsByDonor(req: Request, res: Response): Promise<void> {
      try {
         const donorId = req.params.donorId;
         const result = await RequestService.getRequestsByDonor(donorId);
         res.status(result.httpStatusCode || 500).json(result);
      } catch (error: any) {
         res.status(500).json({ message: "Internal Server Error" });
      }
   }

   // Get all requests sent by a user
   public static async getRequestsByUser(req: Request, res: Response): Promise<void> {
      try {
         const userId = req.params.userId;
         if (!userId) {
            res.status(400).json({ message: "User ID is required" });
         }
         const result = await RequestService.getRequestsByUser(userId);
         res.status(result.httpStatusCode || 500).json(result);
      } catch (error: any) {
         res.status(500).json({ message: "Internal Server Error" });
      }
   }

   // Change request status
   public static async changeRequestStatus(req: Request, res: Response): Promise<void> {
      try {
         const { requestId, newStatus } = req.body;
         if (!requestId || !newStatus) {
            res.status(400).json({ message: "Request ID and status are required" });
         }

         const result = await RequestService.changeRequestStatus(requestId, newStatus);
         res.status(result.httpStatusCode).json(result);
      } catch (error: any) {
         res.status(500).json({ message: "Internal Server Error" });
      }
   }

   // Update request details
   public static async updateRequest(req: Request, res: Response): Promise<void> {
      try {
         const requestId = req.params.id;

         const result = await RequestService.updateRequest(requestId, req.body);
         res.status(result.httpStatusCode || 500).json(result);
      } catch (error: any) {
         res.status(500).json({ message: "Internal Server Error" });
      }
   }

   // Delete a request
   public static async deleteRequest(req: Request, res: Response): Promise<void> {
      try {
         const requestId = req.params.id;
         const result = await RequestService.deleteRequest(requestId);
         res.status(result.httpStatusCode || 500).json(result);
      } catch (error: any) {
         res.status(500).json({ message: "Internal Server Error" });
      }
   }
}

export default RequestController;
