import React, { useState } from 'react';
import Header from './components/Header';
import UploadForm from './components/UploadForm';
import ResultDisplay from './components/ResultDisplay';
import Footer from './components/Footer';
import './App.css';
import Navbar from './components/Navbar';
import AccessibilityGuidelines from "./pages/AccessibilityGuidelines";
import AccessibilityScoreExplanation from "./pages/AccessibilityScoreExplanation";
import AccessibilityTools from "./pages/AccessibilityTools";

function App() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async (formData) => {
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch('http://localhost:5000/analyze', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({ error: 'Something went wrong during analysis.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <Navbar />
      <Header />
      <UploadForm onAnalyze={handleAnalyze} />
      {loading && <p className="loading">Analyzing website accessibility...</p>}
      <ResultDisplay result={result} />
      <AccessibilityGuidelines/>
      <AccessibilityScoreExplanation />
      <AccessibilityTools />
      <Footer />
    </div>
  );
}

export default App;
