import mongoose from "mongoose";

const analyticsSchema = new mongoose.Schema({
  articleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Article",
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  views: {
    type: Number,
    default: 1,
  },
  duration: {
    type: Number,
    default: 0,
  },
}, { timestamps: true });

export default mongoose.model("Analytics", analyticsSchema);