import { useState } from "react";
import API from "../../api/api";
import Navbar from "../../components/Navbar";
import "./CreateArticle.css";

function CreateArticle() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [blocks, setBlocks] = useState([{ type: "text", content: "", file: null }]);

  const addBlock = () => setBlocks([...blocks, { type: "text", content: "", file: null }]);
  const updateBlock = (index, key, value) => {
    const newBlocks = [...blocks];
    newBlocks[index][key] = value;
    setBlocks(newBlocks);
  };
  const handleFileChange = (index, file) => updateBlock(index, "file", file);

  const create = async () => {
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("category", category);

      blocks.forEach((b) => {
        if (b.type === "text") {
          formData.append("contentBlocks", JSON.stringify({ type: "text", content: b.content }));
        } else if (b.file) {
          formData.append("files", b.file); // upload file
          formData.append("contentBlocks", JSON.stringify({ type: b.type, content: "" })); // placeholder
        }
      });

      await API.post("/articles", formData, { headers: { "Content-Type": "multipart/form-data" } });

      alert("Article created successfully!");
      setTitle("");
      setCategory("");
      setBlocks([{ type: "text", content: "", file: null }]);
    } catch (err) {
      console.error(err);
      alert("Failed to create article");
    }
  };

  return (
    <div className="create-article-container">
      <Navbar />
      <div className="create-article-form">
        <h2>Create Article</h2>

        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} />

        {blocks.map((b, i) => (
          <div key={i} className="content-block">
            <select value={b.type} onChange={(e) => updateBlock(i, "type", e.target.value)}>
              <option value="text">Text</option>
              <option value="image">Image</option>
              <option value="video">Video</option>
              <option value="3d">3D</option>
            </select>

            {b.type === "text" ? (
              <input type="text" placeholder="Content" value={b.content} onChange={(e) => updateBlock(i, "content", e.target.value)} />
            ) : (
              <input type="file" onChange={(e) => handleFileChange(i, e.target.files[0])} />
            )}
          </div>
        ))}

        <button onClick={addBlock}>Add Block</button>
        <button onClick={create}>Create Article</button>
      </div>
    </div>
  );
}

export default CreateArticle;