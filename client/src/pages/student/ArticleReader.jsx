import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../api/api";
import Navbar from "../../components/Navbar";
import "./ArticleReader.css";

function ArticleReader() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [selectedText, setSelectedText] = useState("");
  const [note, setNote] = useState("");

  useEffect(() => {
    API.get(`/articles/${id}`).then(res => setArticle(res.data));

    let startTime = Date.now();
    return () => {
      const duration = Math.floor((Date.now() - startTime) / 1000);
      API.post("/tracking", { articleId: id, duration });
    };
  }, [id]);

  // NEW: capture selected text
  const handleTextSelect = () => {
    const text = window.getSelection().toString();
    if (text) setSelectedText(text);
  };

  const saveHighlight = async () => {
    if (!selectedText) return alert("Select some text first!");
    try {
      await API.post("/highlights", { articleId: id, text: selectedText, note });
      alert("Highlight saved");
      setSelectedText(""); 
      setNote("");
    } catch (err) {
      console.error(err);
      alert("Error saving highlight");
    }
  };

  if (!article) return <p>Loading...</p>;

  return (
    <div className="article-reader-container">
      <Navbar />
      <div style={{textAlign:'center'}}>
      <h1>{article.title}</h1>
      {/* Add onMouseUp to capture selected text */}
      <div onMouseUp={handleTextSelect}>
        {article.contentBlocks.map((c, i) => (
          <p key={i}>{c.content}</p>
        ))}
      </div>
      {selectedText && (
        <div className="highlight-box">          <p><strong>Selected Text:</strong> {selectedText}</p>
          <textarea 
            value={note} 
            onChange={e => setNote(e.target.value)} 
            placeholder="Add note"
            rows={3}
            style={{ width: "100%" }}
          />
          <button onClick={saveHighlight} style={{ marginTop: "10px" }}>Save Highlight</button>
        </div>
      )}
    </div>
    </div>
  );
}

export default ArticleReader;