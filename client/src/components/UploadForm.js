import React, { useState } from "react";

function UploadForm({ onAnalyze }) {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);  // ✅ must match multer's "file"

    try {
      const response = await fetch("http://localhost:5000/analyze", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      onAnalyze(data);
    } catch (error) {
      console.error("Error uploading file:", error);
      onAnalyze({ error: "Something went wrong while analyzing file." });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="upload-form">
      <input type="file" name="file" onChange={handleFileChange} /> {/* ✅ name added */}
      <button type="submit">Analyze</button>
    </form>
  );
}

export default UploadForm;
