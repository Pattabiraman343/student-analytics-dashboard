import {
    createArticleService,
    getArticlesService,
    getArticleService,
    updateArticleService,
    deleteArticleService
  } from "../services/articleService.js";
  
  
  // CREATE ARTICLE (Teacher)
  export const createArticle = async (req, res) => {
    try {
      const { title, category, contentBlocks } = req.body;
  
      // Ensure contentBlocks is parsed as JSON if sent as string
      const blocks = typeof contentBlocks === "string" ? JSON.parse(contentBlocks) : contentBlocks;
  
      const article = await createArticleService(
        { title, category, contentBlocks: blocks },
        req.user.id
      );
  
      res.status(201).json({ message: "Article created successfully", article });
    } catch (error) {
      console.error("CreateArticle backend error:", error);
      res.status(500).json({ message: error.message });
    }
  };
  
  
  // GET ALL ARTICLES + SEARCH + FILTER
  export const getArticles = async (req, res) => {
    try {
  
      const articles = await getArticlesService(req.query);
  
      res.json({
        total: articles.length,
        articles
      });
  
    } catch (error) {
  
      res.status(500).json({
        message: error.message
      });
  
    }
  };
  
  
  // GET SINGLE ARTICLE
  export const getArticle = async (req, res) => {
    try {
  
      const article = await getArticleService(req.params.id);
  
      if (!article) {
        return res.status(404).json({
          message: "Article not found"
        });
      }
  
      res.json(article);
  
    } catch (error) {
  
      res.status(500).json({
        message: error.message
      });
  
    }
  };
  
  
  // UPDATE ARTICLE (Teacher only)
  export const updateArticle = async (req, res) => {
    try {
  
      const article = await updateArticleService(
        req.params.id,
        req.body
      );
  
      if (!article) {
        return res.status(404).json({
          message: "Article not found"
        });
      }
  
      res.json({
        message: "Article updated",
        article
      });
  
    } catch (error) {
  
      res.status(500).json({
        message: error.message
      });
  
    }
  };
  
  
  // DELETE ARTICLE (Teacher only)
  export const deleteArticle = async (req, res) => {
    try {
  
      const article = await deleteArticleService(req.params.id);
  
      if (!article) {
        return res.status(404).json({
          message: "Article not found"
        });
      }
  
      res.json({
        message: "Article deleted successfully"
      });
  
    } catch (error) {
  
      res.status(500).json({
        message: error.message
      });
  
    }
  };