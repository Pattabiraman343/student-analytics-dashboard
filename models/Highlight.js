import mongoose from "mongoose";

const highlightSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  articleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Article",
  },
  articleTitle: {          // <-- ADD THIS
    type: String,
    required: true
  },
  text: String,
  note: String,
  timestamp: {
    type: Date,
    default: Date.now,
  }
});

export default mongoose.model("Highlight", highlightSchema);