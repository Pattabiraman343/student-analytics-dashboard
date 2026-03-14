import mongoose from "mongoose";
import Highlight from "./models/Highlight.js";
import Article from "./models/Articles.js";

// Replace with your MongoDB connection string
const MONGO_URI = "mongodb://localhost:27017/yourDB"; // <-- change yourDB to your DB name

mongoose.connect(MONGO_URI); // ✅ just pass URI, no extra options now

const updateHighlights = async () => {
  try {
    const highlights = await Highlight.find({});
    for (let h of highlights) {
      const article = await Article.findById(h.articleId);
      if (article) {
        h.articleTitle = article.title;
        await h.save();
      }
    }
    console.log("✅ All highlights updated with article titles!");
  } catch (err) {
    console.error(err);
  } finally {
    mongoose.disconnect();
  }
};

updateHighlights();