import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import UploadForm from "./components/UploadForm";
import ResultDisplay from "./components/ResultDisplay";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import AccessibilityGuidelines from "./pages/AccessibilityGuidelines";
import AccessibilityScoreExplanation from "./pages/AccessibilityScoreExplanation";
import AccessibilityTools from "./pages/AccessibilityTools";
import AccessibilityQuiz from "./pages/AccessibilityQuiz";

function Home({ setResult }) {
  const navigate = useNavigate();

  const handleAnalyze = async (formData) => {
    try {
      const response = await fetch("http://localhost:5000/analyze", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      setResult(data);
      navigate("/results"); // ✅ redirect to results page
    } catch (error) {
      setResult({ error: "Something went wrong during analysis." });
      navigate("/results");
    }
  };

  return (
    <>
      <Header />
      <UploadForm onAnalyze={handleAnalyze} />
      <AccessibilityGuidelines />
      <AccessibilityScoreExplanation />
      <AccessibilityTools />
      <AccessibilityQuiz />
    </>
  );
}

function App() {
  const [result, setResult] = useState(null);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home setResult={setResult} />} />
        <Route path="/results" element={<ResultDisplay result={result} />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
