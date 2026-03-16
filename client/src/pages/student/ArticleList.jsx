import { useEffect, useState, useCallback } from "react";
import API from "../../api/api";
import Navbar from "../../components/Navbar";
import ArticleCard from "../../components/ArticleCard";
import "./ArticlesList.css";

function ArticlesList() {

  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  // Load articles
  const loadArticles = useCallback(async () => {
    try {
      const res = await API.get("/articles", {
        params: {
          search,
          category: selectedCategory
        }
      });

      setArticles(res.data.articles || []);
    } catch (err) {
      console.error("Error loading articles:", err);
    }
  }, [search, selectedCategory]);

  // Load unique categories
  const loadCategories = useCallback(async () => {
    try {
      const res = await API.get("/articles");

      const uniqueCategories = [
        ...new Set(res.data.articles.map(a => a.category))
      ];

      setCategories(uniqueCategories);
    } catch (err) {
      console.error("Error loading categories:", err);
    }
  }, []);

  // First load
  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  // Reload articles when filters change
  useEffect(() => {
    loadArticles();
  }, [loadArticles]);

  return (
    <div className="articles-list-container">

      <Navbar />

      <div className="articles-list-content">

        <h2>Articles</h2>

        {/* Filter Bar */}
        <div className="filter-bar" style={{ marginBottom: "20px" }}>

          <input
            type="text"
            placeholder="Search by keyword..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              padding: "8px",
              marginRight: "10px",
              width: "250px"
            }}
          />

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{ padding: "8px" }}
          >
            <option value="">All Categories</option>

            {categories.map((c, i) => (
              <option key={i} value={c}>
                {c}
              </option>
            ))}

          </select>

          {(search || selectedCategory) && (
            <button
              onClick={() => {
                setSearch("");
                setSelectedCategory("");
              }}
              style={{
                marginLeft: "10px",
                padding: "8px"
              }}
            >
              Clear
            </button>
          )}

        </div>

        {/* Articles Grid */}

        <div className="articles-grid">

          {articles.length > 0 ? (
            articles.map((a) => (
              <ArticleCard key={a._id} article={a} />
            ))
          ) : (
            <p>No articles found</p>
          )}

        </div>

      </div>
    </div>
  );
}

export default ArticlesList;