import Article from "../models/Articles.js";

export const createArticleService = async (data, userId) => {
  const article = await Article.create({
    ...data,
    createdBy: userId
  });

  return article;
};

export const getArticlesService = async (query) => {

  const filter = {};

  // category filter
  if (query.category) {
    filter.category = query.category;
  }

  // search by title
  if (query.search) {
    filter.title = { $regex: query.search, $options: "i" };
  }

  const articles = await Article
    .find(filter)
    .populate("createdBy", "name email");

  return articles;
};

export const getArticleService = async (id) => {

  const article = await Article
    .findById(id)
    .populate("createdBy", "name email");

  return article;
};

export const updateArticleService = async (id, data) => {

  const article = await Article.findByIdAndUpdate(
    id,
    data,
    { new: true }
  );

  return article;
};

export const deleteArticleService = async (id) => {

  const article = await Article.findByIdAndDelete(id);

  return article;
};