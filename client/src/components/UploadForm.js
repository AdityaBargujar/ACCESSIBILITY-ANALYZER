import React, { useState } from "react";
import "./UploadForm.css"; // we’ll add styles

function UploadForm({ onAnalyze }) {
  const [mode, setMode] = useState("file"); // "file" or "link"
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (mode === "file" && !file) {
      alert("Please select an HTML file!");
      return;
    }
    if (mode === "link" && !url.trim()) {
      alert("Please enter a website URL!");
      return;
    }

    const formData = new FormData();
    if (mode === "file") {
      formData.append("file", file);
    } else {
      formData.append("url", url);
    }

    onAnalyze(formData);
  };

  return (
    <div className="upload-container">
      <h2 className="form-title">Accessibility Analyzer</h2>

      {/* Switch Buttons */}
      <div className="switch-buttons">
        <button
          type="button"
          className={mode === "file" ? "active" : ""}
          onClick={() => setMode("file")}
        >
          Upload File
        </button>
        <button
          type="button"
          className={mode === "link" ? "active" : ""}
          onClick={() => setMode("link")}
        >
          Analyze URL
        </button>
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="upload-form">
        {mode === "file" ? (
          <input
            type="file"
            accept=".html"
            onChange={(e) => setFile(e.target.files[0])}
          />
        ) : (
          <input
            type="text"
            placeholder="Enter website URL (https://...)"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        )}

        <button type="submit" className="submit-btn">
          Analyze
        </button>
      </form>
    </div>
  );
}

export default UploadForm;
