import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/api";
import Navbar from "../../components/Navbar";
import "./TeacherArticles.css";

function TeacherArticles() {

  const [articles, setArticles] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    loadArticles();
  }, []);

  // ==============================
  // Load Articles
  // ==============================
  const loadArticles = async () => {
    try {
      const res = await API.get("/articles");
      setArticles(res.data.articles);
    } catch (err) {
      console.error("Error fetching articles:", err);
    }
  };

  // ==============================
  // Delete Article
  // ==============================
  const deleteArticle = async (id) => {

    const confirmDelete = window.confirm("Are you sure you want to delete this article?");
    if (!confirmDelete) return;

    try {
      await API.delete(`/articles/${id}`);
      alert("Article deleted successfully");
      loadArticles();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  // ==============================
  // Edit Article
  // ==============================
  const editArticle = (id) => {
    navigate(`/teacher/edit/${id}`);
  };

  // ==============================
  // Search + Filter
  // ==============================
  const filteredArticles = articles.filter((a) => {

    const matchSearch = a.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchCategory = category
      ? a.category === category
      : true;

    return matchSearch && matchCategory;

  });

  // ==============================
  // Render Content Blocks
  // ==============================
  const renderContentBlock = (block, index) => {

    const fileUrl =
      block.type === "text"
        ? ""
        : `http://localhost:5000${block.content}`;

    switch (block.type) {

      case "text":
        return <p key={index}>{block.content}</p>;

      case "image":
        return (
          <img
            key={index}
            src={fileUrl}
            alt="Article visual"
            style={{
              maxWidth: "100%",
              borderRadius: "6px",
              marginBottom: "10px"
            }}
          />
        );

      case "video":
        return (
          <video
            key={index}
            controls
            style={{
              maxWidth: "100%",
              marginBottom: "10px"
            }}
          >
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
            style={{
              width: "100%",
              height: "400px",
              marginBottom: "10px"
            }}
          />
        );

      default:
        return null;
    }
  };

  // ==============================
  // Get Categories
  // ==============================
  const categories = [
    ...new Set(articles.map((a) => a.category))
  ];

  return (
    <div className="teacher-articles-container">

      <Navbar />

      <div
        className="teacher-articles-content"
        style={{ padding: "2rem" }}
      >

        <h2>My Articles</h2>

        {/* ==============================
           SEARCH + FILTER
        ============================== */}

        <div
          style={{
            display: "flex",
            gap: "10px",
            marginBottom: "20px",
            flexWrap: "wrap"
          }}
        >

          <input
            type="text"
            placeholder="Search article..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              padding: "8px",
              borderRadius: "5px",
              border: "1px solid #ccc"
            }}
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{
              padding: "8px",
              borderRadius: "5px",
              border: "1px solid #ccc"
            }}
          >

            <option value="">All Categories</option>

            {categories.map((c, i) => (
              <option key={i} value={c}>
                {c}
              </option>
            ))}

          </select>

          <button
            onClick={() => {
              setSearch("");
              setCategory("");
            }}
            style={{
              padding: "8px 12px",
              background: "#444",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer"
            }}
          >
            Clear
          </button>

        </div>

        {filteredArticles.length === 0 && (
          <p>No articles found.</p>
        )}

        {/* ==============================
           ARTICLE CARDS
        ============================== */}

        {filteredArticles.map((a) => (

          <div
            key={a._id}
            className="teacher-article-card"
            style={{
              border: "1px solid #ccc",
              borderRadius: "10px",
              padding: "1rem",
              marginBottom: "2rem",
              boxShadow: "0 2px 10px rgba(0,0,0,0.05)"
            }}
          >

            <h3>{a.title}</h3>

            <p
              style={{
                fontStyle: "italic",
                color: "#555"
              }}
            >
              {a.category}
            </p>

            {/* ==============================
               ACTION BUTTONS
            ============================== */}

            <div
              style={{
                display: "flex",
                gap: "10px",
                marginBottom: "15px"
              }}
            >

              <button
                onClick={() => editArticle(a._id)}
                style={{
                  padding: "6px 12px",
                  background: "#4CAF50",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer"
                }}
              >
                Update
              </button>

              <button
                onClick={() => deleteArticle(a._id)}
                style={{
                  padding: "6px 12px",
                  background: "#f44336",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer"
                }}
              >
                Delete
              </button>

            </div>

            {/* ==============================
               CONTENT BLOCKS
            ============================== */}

            <div className="article-content-blocks">
              {a.contentBlocks.map((block, i) =>
                renderContentBlock(block, i)
              )}
            </div>

          </div>

        ))}

      </div>
    </div>
  );
}

export default TeacherArticles;