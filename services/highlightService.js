import Highlight from "../models/Highlight.js";
import Article from "../models/Articles.js"; // Make sure the path is correct

export const addHighlightService = async (data, userId) => {
  const { articleId, text, note } = data;

  // Fetch the article title
  const article = await Article.findById(articleId);
  if (!article) {
    throw new Error("Article not found");
  }

  // Save highlight with article title
  return await Highlight.create({
    studentId: userId,
    articleId,
    articleTitle: article.title, // <-- save title here
    text,
    note
  });
};

export const getHighlightService = async (userId) => {
  return await Highlight.find({ studentId: userId }).sort({ createdAt: -1 });
};