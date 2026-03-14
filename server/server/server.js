import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";

import authRoutes from "./routes/userRoutes.js";
import articleRoutes from "./routes/articleRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";
import highlightRoutes from "./routes/highlightRoutes.js";
import trackingRoutes from "./routes/trackingRoutes.js";
import path from "path";
import { fileURLToPath } from "url";
dotenv.config();

connectDB();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/articles", articleRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/highlights", highlightRoutes);
app.use("/api/tracking", trackingRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.listen(process.env.PORT, () => {
  console.log("Server running");
});