import express from "express";
import { protect, allowRoles } from "../middleware/authMiddleware.js";
import {
  createArticle,
  getArticles,
  getArticle,
  updateArticle,
  deleteArticle
} from "../controllers/articleController.js";

import { upload } from "../config/multer.js"; // <-- import multer

const router = express.Router();

router.get("/", getArticles);
router.get("/:id", getArticle);

// Teacher only - create article with file uploads
router.post(
  "/",
  protect,
  allowRoles("teacher"),
  upload.array("files"), // Accept multiple files
  createArticle
);

router.put("/:id", protect, allowRoles("teacher"), upload.array("files"), updateArticle);
router.delete("/:id", protect, allowRoles("teacher"), deleteArticle);

export default router;