import Analytics from "../models/Analytics.js";
import Article from "../models/Articles.js";
import mongoose from "mongoose";

// Track article view + duration
export const trackViewService = async (userId, articleId, duration) => {
  const articleObjectId = new mongoose.Types.ObjectId(articleId);

  // Check if already exists
  const existing = await Analytics.findOne({
    articleId: articleObjectId,
    studentId: userId
  });

  if (existing) {
    existing.views += 1;
    existing.duration += duration;
    return await existing.save();
  }

  return await Analytics.create({
    articleId: articleObjectId,
    studentId: userId,
    views: 1,
    duration
  });
};

// Student dashboard stats
export const getStudentDashboardService = async (userId) => {
  // Total articles read
  const totalArticlesRead = await Analytics.countDocuments({ studentId: userId });

  // Reading time per category
  const readingTimePerCategory = await Analytics.aggregate([
    { $match: { studentId: new mongoose.Types.ObjectId(userId) } },
    {
      $lookup: {
        from: "articles",
        localField: "articleId",
        foreignField: "_id",
        as: "article"
      }
    },
    { $unwind: "$article" },
    {
      $group: {
        _id: "$article.category",
        totalDuration: { $sum: "$duration" }
      }
    }
  ]);

  return { totalArticlesRead, readingTimePerCategory };
};