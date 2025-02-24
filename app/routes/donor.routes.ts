import express from "express";
import { DonorController } from "../controllers/donor.controller";

const donorRoutes = express.Router();

donorRoutes.get("/donors", DonorController.getDonors);

export default donorRoutes;
