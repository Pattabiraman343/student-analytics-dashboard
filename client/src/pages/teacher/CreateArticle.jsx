import { useState } from "react";
import API from "../../api/api";
import Navbar from "../../components/Navbar";
import "./CreateArticle.css"; // Import the CSS

function CreateArticle() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [blocks, setBlocks] = useState([{ type: "text", content: "" }]);

  const addBlock = () => setBlocks([...blocks, { type: "text", content: "" }]);

  const updateBlock = (index, key, value) => {
    const newBlocks = [...blocks];
    newBlocks[index][key] = value;
    setBlocks(newBlocks);
  };

  const create = async () => {
    await API.post("/articles", { title, category, contentBlocks: blocks });
    alert("Article created");
    setTitle(""); setCategory(""); setBlocks([{ type: "text", content: "" }]);
  };

  return (
    <div className="create-article-container">
      <Navbar />
      <div className="create-article-form">
        <h2>Create Article</h2>
        <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
        <input placeholder="Category" value={category} onChange={e => setCategory(e.target.value)} />

        {blocks.map((b, i) => (
          <div key={i}>
            <select value={b.type} onChange={e => updateBlock(i, "type", e.target.value)}>
              <option value="text">Text</option>
              <option value="image">Image</option>
              <option value="video">Video</option>
              <option value="3d">3D</option>
            </select>
            <input placeholder="Content / URL" value={b.content} onChange={e => updateBlock(i, "content", e.target.value)} />
          </div>
        ))}

        <button onClick={addBlock}>Add Block</button>
        <button onClick={create}>Create Article</button>
      </div>
    </div>
  );
}

export default CreateArticle;