import React, { useState } from "react";
import styles from "./AccessibilityQuiz.module.css";

const questions = [
  {
    question: "What does WCAG stand for?",
    options: [
      "Web Content Accessibility Guidelines",
      "Website Color and Graphics",
      "Web Creative Accessibility Group",
      "World Content Assistance Guide"
    ],
    answer: 0,
    tip: "WCAG is the Web Content Accessibility Guidelines, a standard for making web content accessible."
  },
  {
    question: "Which of these is important for colorblind users?",
    options: [
      "High contrast colors",
      "Background music",
      "Fast animations",
      "Complex fonts"
    ],
    answer: 0,
    tip: "High contrast ensures people with visual impairments can distinguish content easily."
  },
  {
    question: "Which HTML element is used for the main heading?",
    options: ["<h6>", "<title>", "<h1>", "<header>"],
    answer: 2,
    tip: "<h1> should be used for the main heading of a page."
  },
  {
    question: "What is ARIA used for in web accessibility?",
    options: [
      "Adding animations",
      "Improving SEO ranking",
      "Providing extra information for assistive tech",
      "Reducing page load speed"
    ],
    answer: 2,
    tip: "ARIA (Accessible Rich Internet Applications) provides roles and attributes to enhance accessibility."
  }
];

export default function AccessibilityQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [tips, setTips] = useState([]);

  const handleAnswerClick = (index) => {
    if (index === questions[currentQuestion].answer) {
      setScore(score + 1);
    } else {
      setTips([...tips, questions[currentQuestion].tip]);
    }

    const next = currentQuestion + 1;
    if (next < questions.length) {
      setCurrentQuestion(next);
    } else {
      setShowScore(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setTips([]);
  };

  return (
    <div className={styles.quizContainer}>
      <h1>Accessibility Quiz 🧠</h1>
      {showScore ? (
        <div className={styles.result}>
          <h2>Your Score: {score} / {questions.length}</h2>
          <p>Tips for improvement:</p>
          <ul>
            {tips.length > 0 ? tips.map((tip, i) => (
              <li key={i}>{tip}</li>
            )) : <li>Great job! You got everything right.</li>}
          </ul>
          <button onClick={restartQuiz}>Play Again</button>
        </div>
      ) : (
        <div className={styles.questionCard}>
          <h2>{questions[currentQuestion].question}</h2>
          <div className={styles.options}>
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerClick(index)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
