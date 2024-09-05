import React, { useState } from "react";
import QuizForm from "./QuizForm";
import QuizContainer from "./QuizContainer";
import Login from "./Login";
import "./App.css";

function App() {
  const [quizData, setQuizData] = useState(null);
  const [numQuestions, setNumQuestions] = useState(10);
  const [username, setUsername] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (username) => {
    setUsername(username);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setUsername("");
    setQuizData(null);
    setIsLoggedIn(false);
  };

  const handleQuizStart = (data, numQuestions) => {
    setQuizData(data);
    setNumQuestions(numQuestions);
  };

  const handleBackToQuizForm = () => {
    setQuizData(null); // Reset quiz data to show the quiz form
  };

  return (
    <div className="App">
      <h1>Quiz App</h1>
      {!isLoggedIn ? (
        <Login onLogin={handleLogin} />
      ) : !quizData ? (
        <QuizForm onQuizStart={handleQuizStart} username={username} />
      ) : (
        <QuizContainer
          quizData={quizData}
          numQuestions={numQuestions}
          username={username}
          onLogout={handleLogout}
          onBackToQuizForm={handleBackToQuizForm} // Pass back function to QuizContainer
        />
      )}
    </div>
  );
}

export default App;
