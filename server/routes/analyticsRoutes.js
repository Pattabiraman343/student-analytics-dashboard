import express from "express";
import { getAnalytics } from "../controllers/analyticsController.js";
import { protect, allowRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, allowRoles("teacher"), getAnalytics);

export default router;