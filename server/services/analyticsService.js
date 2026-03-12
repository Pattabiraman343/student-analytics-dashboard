import Analytics from "../models/Analytics.js";
import Article from "../models/Articles.js";
import mongoose from "mongoose";

export const getAnalyticsService = async (teacherId) => {
  // For now, skip teacherId filtering to include all existing Analytics
  // Later, you can filter by teacherId when createdBy is correctly set in articles

  // Articles created
  const articlesCreated = await Article.countDocuments(); // remove createdBy filter

  // Article Views
  const articleViews = await Analytics.aggregate([
    { $match: { articleId: { $exists: true } } },
    {
      $lookup: {
        from: "articles",
        localField: "articleId",
        foreignField: "_id",
        as: "article",
      },
    },
    { $unwind: "$article" },
    {
      $group: {
        _id: "$article._id",
        title: { $first: "$article.title" },
        totalViews: { $sum: "$views" }, // sum views field
      },
    },
    { $sort: { totalViews: -1 } },
  ]);

  // Top 3 categories
  const mostViewedCategories = await Analytics.aggregate([
    { $match: { articleId: { $exists: true } } },
    {
      $lookup: {
        from: "articles",
        localField: "articleId",
        foreignField: "_id",
        as: "article",
      },
    },
    { $unwind: "$article" },
    {
      $group: {
        _id: "$article.category",
        totalViews: { $sum: "$views" },
      },
    },
    { $sort: { totalViews: -1 } },
    { $limit: 3 },
  ]);

  // Student Progress
  const studentProgress = await Analytics.aggregate([
    { $match: { studentId: { $exists: true }, articleId: { $exists: true } } },
    {
      $group: {
        _id: "$studentId",
        articlesRead: { $sum: 1 },
        totalDuration: { $sum: "$duration" },
      },
    },
  ]);

  // Daily Engagement
  const dailyEngagement = await Analytics.aggregate([
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
        totalViews: { $sum: "$views" },
        totalDuration: { $sum: "$duration" },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  const totalStudentsRead = studentProgress.length;

  return {
    articlesCreated,
    totalStudentsRead,
    articleViews,
    mostViewedCategories,
    studentProgress,
    dailyEngagement,
  };
};