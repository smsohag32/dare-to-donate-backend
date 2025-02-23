import express from "express";
import authRoute from "./auth.routes";
import userRoute from "./user.routes";
const router = express.Router();

router.use("/api/v1", authRoute);
router.use("/api/v1", userRoute);

export default router;
