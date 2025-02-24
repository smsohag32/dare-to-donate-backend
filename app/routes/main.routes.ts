import express from "express";
const router = express.Router();
import authRoute from "./auth.routes";
import userRoute from "./user.routes";
import donarRoute from "./donor.routes";
router.use("/api/v1", authRoute);
router.use("/api/v1", userRoute);
router.use("/api/v1", donarRoute);

export default router;
