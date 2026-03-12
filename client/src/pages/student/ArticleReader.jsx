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

  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    API.get(`/articles/${id}`).then(res => setArticle(res.data));

    let startTime = Date.now();

    return () => {
      const duration = Math.floor((Date.now() - startTime) / 1000);
      API.post("/tracking", { articleId: id, duration });
    };

  }, [id]);


  const handleTextSelect = (e) => {

    const text = window.getSelection().toString();

    if (text.length > 0) {

      setSelectedText(text);

      setPopupPosition({
        x: e.pageX,
        y: e.pageY
      });

    } else {
      setSelectedText("");
    }

  };


  const saveHighlight = async () => {

    if (!selectedText) return;

    await API.post("/highlights", {
      articleId: id,
      text: selectedText,
      note
    });

    alert("Highlight saved");

    setSelectedText("");
    setNote("");

  };


  if (!article) return <p>Loading...</p>;


  return (

    <div className="article-reader-container">

      <Navbar />

      <h1>{article.title}</h1>

      <div onMouseUp={handleTextSelect}>
  {article.contentBlocks.map((block, i) => {
    const fileUrl = block.type !== "text" ? `http://localhost:5000${block.content}` : "";

    switch (block.type) {
      case "text":
        return <p key={i}>{block.content}</p>;

      case "image":
        return (
          <img
            key={i}
            src={fileUrl}
            alt="Article visual"
            style={{ maxWidth: "100%", marginBottom: "15px", borderRadius: "8px" }}
          />
        );

      case "video":
        return (
          <video key={i} controls style={{ maxWidth: "100%", marginBottom: "15px" }}>
            <source src={fileUrl} type="video/mp4" />
          </video>
        );

      case "3d":
        return (
          <model-viewer
            key={i}
            src={fileUrl}
            alt="3D Model"
            ar
            auto-rotate
            camera-controls
            style={{ width: "100%", height: "400px", marginBottom: "15px" }}
          />
        );

      default:
        return null;
    }
  })}
</div>
      {selectedText && (

        <div
          className="highlight-popup"
          style={{
            top: popupPosition.y - 70,
            left: popupPosition.x - 120
          }}
        >

          <p className="popup-text">Highlight</p>

          <textarea
            placeholder="Add note..."
            value={note}
            onChange={e => setNote(e.target.value)}
          />

          <button onClick={saveHighlight}>
            Save
          </button>

        </div>

      )}

    </div>

  );

}

export default ArticleReader;