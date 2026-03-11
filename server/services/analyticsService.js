import Analytics from "../models/Analytics.js";
import Article from "../models/Articles.js";
import mongoose from "mongoose";

export const getAnalyticsService = async (teacherId) => {
  if (!teacherId || !mongoose.Types.ObjectId.isValid(teacherId)) {
    throw new Error("Invalid teacher ID");
  }

  // ⚡ Corrected usage
  const tId = new mongoose.Types.ObjectId(teacherId);

  // rest of your aggregation code stays the same
  const articleViews = await Analytics.aggregate([
    { $match: { articleId: { $exists: true } } },
    {
      $lookup: {
        from: "articles",
        localField: "articleId",
        foreignField: "_id",
        as: "article",
      }
    },
    { $unwind: "$article" },
    { $match: { "article.createdBy": tId } },
    {
      $group: {
        _id: "$article._id",
        title: { $first: "$article.title" },
        totalViews: { $sum: 1 }
      }
    },
    { $sort: { totalViews: -1 } }
  ]);

  // ...continue with mostViewedCategories, studentProgress, dailyEngagement
  const mostViewedCategories = await Analytics.aggregate([
    { $match: { articleId: { $exists: true } } },
    {
      $lookup: {
        from: "articles",
        localField: "articleId",
        foreignField: "_id",
        as: "article",
      }
    },
    { $unwind: "$article" },
    { $match: { "article.createdBy": tId } },
    {
      $group: {
        _id: "$article.category",
        totalViews: { $sum: 1 }
      }
    },
    { $sort: { totalViews: -1 } },
    { $limit: 3 }
  ]);

  const studentProgress = await Analytics.aggregate([
    { $match: { articleId: { $exists: true } } },
    {
      $lookup: {
        from: "articles",
        localField: "articleId",
        foreignField: "_id",
        as: "article"
      }
    },
    { $unwind: "$article" },
    { $match: { "article.createdBy": tId } },
    {
      $group: {
        _id: "$studentId",
        articlesRead: { $sum: 1 },
        totalDuration: { $sum: "$duration" }
      }
    }
  ]);

  const dailyEngagement = await Analytics.aggregate([
    { $match: { articleId: { $exists: true } } },
    {
      $lookup: {
        from: "articles",
        localField: "articleId",
        foreignField: "_id",
        as: "article"
      }
    },
    { $unwind: "$article" },
    { $match: { "article.createdBy": tId } },
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
        totalViews: { $sum: 1 },
        totalDuration: { $sum: "$duration" }
      }
    },
    { $sort: { _id: 1 } }
  ]);

  const articlesCreated = await Article.countDocuments({ createdBy: tId });
  const totalStudentsRead = studentProgress.length;

  return {
    articlesCreated,
    totalStudentsRead,
    articleViews,
    mostViewedCategories,
    studentProgress,
    dailyEngagement
  };
};