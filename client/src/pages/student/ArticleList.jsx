import { useEffect, useState } from "react";
import API from "../../api/api";
import Navbar from "../../components/Navbar";
import ArticleCard from "../../components/ArticleCard";
import "./ArticlesList.css"; // your CSS

function ArticlesList() {
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]); // categories for filter
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  // Load articles from backend
  const loadArticles = async () => {
    try {
      const res = await API.get("/articles", {
        params: { search, category: selectedCategory } // pass query params
      });
      setArticles(res.data.articles);
    } catch (err) {
      console.error("Error loading articles:", err);
    }
  };

  // Load unique categories
  const loadCategories = async () => {
    try {
      const res = await API.get("/articles"); // fetch all articles
      const uniqueCategories = [
        ...new Set(res.data.articles.map(a => a.category))
      ];
      setCategories(uniqueCategories);
    } catch (err) {
      console.error("Error loading categories:", err);
    }
  };

  useEffect(() => {
    loadCategories();
    loadArticles();
  }, []);

  // Reload articles when search or category changes
  useEffect(() => {
    loadArticles();
  }, [search, selectedCategory]);

  return (
    <div className="articles-list-container">
      <Navbar />

      <div className="articles-list-content">
        <h2>Articles</h2>

        {/* Search + Category Filter */}
        <div className="filter-bar" style={{ marginBottom: "20px" }}>
          <input
            type="text"
            placeholder="Search by keyword..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ padding: "8px", marginRight: "10px", width: "250px" }}
          />

          <select
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}
            style={{ padding: "8px" }}
          >
            <option value="">All Categories</option>
            {categories.map((c, i) => (
              <option key={i} value={c}>{c}</option>
            ))}
          </select>

          {search || selectedCategory ? (
            <button
              onClick={() => {
                setSearch("");
                setSelectedCategory("");
              }}
              style={{ marginLeft: "10px", padding: "8px" }}
            >
              Clear
            </button>
          ) : null}
        </div>

        {/* Articles Grid */}
        <div className="articles-grid">
          {articles.length ? (
            articles.map(a => <ArticleCard key={a._id} article={a} />)
          ) : (
            <p>No articles found</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ArticlesList;