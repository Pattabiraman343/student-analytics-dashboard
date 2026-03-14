import express from "express";
import { protect, allowRoles } from "../middleware/authMiddleware.js";
import { trackView, getStudentDashboard } from "../controllers/trackingController.js";

const router = express.Router();

// Track article view (student only)
router.post("/", protect, allowRoles("student"), trackView);

// Get student dashboard stats
router.get("/dashboard", protect, allowRoles("student"), getStudentDashboard);

export default router;