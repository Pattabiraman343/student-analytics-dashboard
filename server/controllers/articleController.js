// controllers/articleController.js

import {
    createArticleService as createArticleServiceService,
    getArticlesService,
    getArticleService,
    updateArticleService,
    deleteArticleService
  } from "../services/articleService.js";
  import Article from "../models/Articles.js"; // Make sure your Article model is imported
  
  // ===========================================
  // CREATE ARTICLE (Controller for Teacher)
  // ===========================================
  export const createArticle = async (req, res) => {
    try {
      let { title, category, contentBlocks } = req.body;
  
      // 1️⃣ Normalize contentBlocks
      if (!contentBlocks) contentBlocks = [];
      else if (typeof contentBlocks === "string") {
        try {
          contentBlocks = [JSON.parse(contentBlocks)];
        } catch (err) {
          contentBlocks = [];
        }
      } else if (Array.isArray(contentBlocks)) {
        contentBlocks = contentBlocks.map((b) =>
          typeof b === "string" ? JSON.parse(b) : b
        );
      }
  
      // 2️⃣ Replace placeholders with uploaded files
      if (req.files && req.files.length > 0) {
        let fileIndex = 0;
        contentBlocks = contentBlocks.map((block) => {
          if (block.type !== "text") {
            block.content = `/uploads/${req.files[fileIndex].filename}`;
            fileIndex++;
          }
          return block;
        });
      }
  
      // 3️⃣ Create article using service
      const article = await createArticleServiceService({
        title,
        category,
        contentBlocks,
        createdBy: req.user.id,
      });
  
      res.status(201).json({ message: "Article created successfully", article });
    } catch (error) {
      console.error("CreateArticle error:", error);
      res.status(500).json({ message: error.message });
    }
  };
  
  // ===========================================
  // GET ALL ARTICLES + SEARCH + FILTER
  // ===========================================
  export const getArticles = async (req, res) => {
    try {
      const articles = await getArticlesService(req.query);
      res.json({
        total: articles.length,
        articles,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // ===========================================
  // GET SINGLE ARTICLE
  // ===========================================
  export const getArticle = async (req, res) => {
    try {
      const article = await getArticleService(req.params.id);
  
      if (!article) {
        return res.status(404).json({ message: "Article not found" });
      }
  
      res.json(article);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // ===========================================
  // UPDATE ARTICLE (Teacher only)
  // ===========================================
  export const updateArticle = async (req, res) => {
    try {
      const article = await updateArticleService(req.params.id, req.body);
  
      if (!article) {
        return res.status(404).json({ message: "Article not found" });
      }
  
      res.json({ message: "Article updated", article });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // ===========================================
  // DELETE ARTICLE (Teacher only)
  // ===========================================
  export const deleteArticle = async (req, res) => {
    try {
      const article = await deleteArticleService(req.params.id);
  
      if (!article) {
        return res.status(404).json({ message: "Article not found" });
      }
  
      res.json({ message: "Article deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };