import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../api/api";
import Navbar from "../../components/Navbar";
import "./EditArticle.css";

function EditArticle() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  // ==========================
  // Load Article Data
  // ==========================
  useEffect(() => {
    loadArticle();
  }, []);

  const loadArticle = async () => {
    try {

      const res = await API.get(`/articles/${id}`);

      console.log("Article Data:", res.data);

      const article = res.data;

      setTitle(article.title || "");
      setCategory(article.category || "");

      const textContent =
        article.contentBlocks?.find((b) => b.type === "text")?.content || "";

      setContent(textContent);

      setLoading(false);

    } catch (err) {
      console.error("Error loading article:", err);
      setLoading(false);
    }
  };

  // ==========================
  // Update Article
  // ==========================
  const updateArticle = async (e) => {

    e.preventDefault();

    try {

      const contentBlocks = [
        {
          type: "text",
          content: content
        }
      ];

      await API.put(`/articles/${id}`, {
        title,
        category,
        contentBlocks
      });

      alert("Article updated successfully");

      navigate("/teacher/articles");

    } catch (err) {
      console.error("Update failed:", err);
      alert("Update failed");
    }

  };

  if (loading) {
    return (
      <div>
        <Navbar />
        <h3 style={{ padding: "40px" }}>Loading article...</h3>
      </div>
    );
  }

  return (
    <div className="edit-article-page">

      <Navbar />

      <div className="edit-article-container">

        <h2>Edit Article</h2>

        <form className="edit-form" onSubmit={updateArticle}>

          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <label>Category</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />

          <label>Content</label>
          <textarea
            rows="12"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <button type="submit">
            Update Article
          </button>

        </form>

      </div>

    </div>
  );
}

export default EditArticle;