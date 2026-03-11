import { trackViewService, getStudentDashboardService } from "../services/trackingService.js";

export const trackView = async (req, res) => {
  try {
    const { articleId, duration } = req.body;
    const data = await trackViewService(req.user.id, articleId, duration);
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getStudentDashboard = async (req, res) => {
  try {
    const data = await getStudentDashboardService(req.user.id);
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};