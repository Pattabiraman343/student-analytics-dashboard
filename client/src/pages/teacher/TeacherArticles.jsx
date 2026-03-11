import { useEffect, useState } from "react";
import API from "../../api/api";
import Navbar from "../../components/Navbar";
import "./TeacherArticles.css"; // Import the CSS

function TeacherArticles() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    const res = await API.get("/articles");
    setArticles(res.data.articles);
  };

  return (
    <div className="teacher-articles-container">
      <Navbar />

      <div className="teacher-articles-content">
        <h2>My Articles</h2>

        {articles.length === 0 && <p>No articles found.</p>}

        {articles.map(a => (
          <div key={a._id} className="teacher-article-card">
            <h3>{a.title}</h3>
            <p className="article-category">{a.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TeacherArticles;