import { Request, Response } from "express";
import { DonorService } from "../services/donor.service";

export class DonorController {
   public static async getDonors(req: Request, res: Response): Promise<void> {
      try {
         const page = parseInt(req.query.page as string) || 1;
         const limit = parseInt(req.query.limit as string) || 10;
         const blood_group = req.query.blood_group as string | undefined;
         const searchText = req.query.searchText as string | undefined;
         const result = await DonorService.getDonors(page, limit, blood_group, searchText);
         res.status(result.httpStatusCode).json(result);
      } catch (error: any) {
         res.status(500).json({ message: "Internal Server Error" });
      }
   }
}
