import React, { useState } from 'react';

function UploadForm({ onAnalyze }) {
  const [url, setUrl] = useState('');
  const [file, setFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (url) formData.append('url', url);
    if (file) formData.append('file', file);
    onAnalyze(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="upload-form">
      <label>
        Website URL:
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com"
        />
      </label>

      <p>OR</p>

      <label>
        Upload HTML File:
        <input
          type="file"
          accept=".html"
          onChange={(e) => setFile(e.target.files[0])}
        />
      </label>

      <button type="submit">Analyze Accessibility</button>
    </form>
  );
}

export default UploadForm;
