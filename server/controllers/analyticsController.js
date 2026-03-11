import { getAnalyticsService } from "../services/analyticsService.js";

export const getAnalytics = async (req, res) => {
  try {
    const teacherId = req.user?.id;
    if (!teacherId) {
      return res.status(401).json({ message: "Unauthorized: Teacher not logged in" });
    }

    const data = await getAnalyticsService(teacherId);
    res.json(data);
  } catch (err) {
    console.error("Analytics backend error:", err);
    res.status(500).json({ message: err.message, stack: err.stack });
  }
};