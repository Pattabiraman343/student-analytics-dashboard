import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/api";
import Navbar from "../../components/Navbar";
import "./TeacherArticles.css";

function TeacherArticles() {
  const [articles, setArticles] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();

  const articlesPerPage = 1; // show 1 article per page

  useEffect(() => {
    loadArticles();
  }, []);

  // Load all articles
  const loadArticles = async () => {
    try {
      const res = await API.get("/articles");
      setArticles(res.data.articles);
    } catch (err) {
      console.error("Error fetching articles:", err);
    }
  };

  // Delete article
  const deleteArticle = async (id) => {
    if (!window.confirm("Are you sure you want to delete this article?")) return;
    try {
      await API.delete(`/articles/${id}`);
      alert("Article deleted successfully");
      loadArticles();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  // Navigate to edit page
  const editArticle = (id) => navigate(`/teacher/edit/${id}`);

  // Filter articles by search & category
  const filteredArticles = articles.filter((a) => {
    const matchSearch = a.title.toLowerCase().includes(search.toLowerCase());
    const matchCategory = category ? a.category === category : true;
    return matchSearch && matchCategory;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);
  const startIndex = (currentPage - 1) * articlesPerPage;
  const currentArticles = filteredArticles.slice(
    startIndex,
    startIndex + articlesPerPage
  );

  // Render content blocks
  const renderContentBlock = (block, index) => {
    const fileUrl = block.type === "text" ? "" : `http://localhost:5000${block.content}`;
    switch (block.type) {
      case "text":
        return <p key={index}>{block.content}</p>;
      case "image":
        return <img key={index} src={fileUrl} alt="Article visual" className="article-img" />;
      case "video":
        return (
          <video key={index} controls className="article-video">
            <source src={fileUrl} type="video/mp4" />
          </video>
        );
      case "3d":
        return (
          <model-viewer
            key={index}
            src={fileUrl}
            alt="3D Model"
            ar
            auto-rotate
            camera-controls
            className="article-3d"
          />
        );
      default:
        return null;
    }
  };

  // Categories for filter
  const categories = [...new Set(articles.map((a) => a.category))];

  return (
    <div className="teacher-articles-container">
      <Navbar />

      <div className="teacher-articles-content">
        <h2>My Articles</h2>

        {/* Search & Filter */}
        <div className="search-filter">
          <input
            type="text"
            placeholder="Search article..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">All Categories</option>
            {categories.map((c, i) => (
              <option key={i} value={c}>{c}</option>
            ))}
          </select>
          <button onClick={() => { setSearch(""); setCategory(""); }}>Clear</button>
        </div>

        {/* No articles */}
        {filteredArticles.length === 0 && <p>No articles found.</p>}

        {/* Article Cards */}
        {currentArticles.map((a) => (
          <div key={a._id} className="teacher-article-card">
            <h3>{a.title}</h3>
            <p className="article-category">{a.category}</p>

            {/* Action Buttons */}
            <div className="article-actions">
              <button onClick={() => editArticle(a._id)} className="update-btn">Update</button>
              <button onClick={() => deleteArticle(a._id)} className="delete-btn">Delete</button>
            </div>

            {/* Content Blocks */}
            <div className="article-content-blocks">
              {a.contentBlocks.map((block, i) => renderContentBlock(block, i))}
            </div>
          </div>
        ))}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="pagination">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span>Page {currentPage} of {totalPages}</span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default TeacherArticles;