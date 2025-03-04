import { Router } from "express";
import RequestController from "../controllers/request.controller";

const requestRouter = Router();

// Create a new request
requestRouter.post("/request/new", RequestController.createRequest);

// Get all requests by donor ID
requestRouter.get("/request/donor/:donorId", RequestController.getRequestsByDonor);

// Get all requests sent by a user
requestRouter.get("/request/user/:userId", RequestController.getRequestsByUser);

requestRouter.patch("/request/status", RequestController.changeRequestStatus);

// Update request details
requestRouter.put("/request/:id", RequestController.updateRequest);

// Delete a request
requestRouter.delete("/request/:id", RequestController.deleteRequest);

export default requestRouter;
