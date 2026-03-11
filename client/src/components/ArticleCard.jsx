import { Link } from "react-router-dom";
import "./ArticleCard.css";

function ArticleCard({ article }) {
  return (
    <div className="article-card-wrapper">
      <h3 className="article-card-title">{article.title}</h3>
      <p className="article-card-category">{article.category}</p>

      <Link to={`/article/${article._id}`}>
        <button className="article-card-btn">Read</button>
      </Link>
    </div>
  );
}

export default ArticleCard;