import React, { useState } from "react";

function QuizContainer({
  quizData,
  numQuestions,
  username,
  onLogout,
  onBackToQuizForm,
}) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [correctAnswer, setCorrectAnswer] = useState(null);

  const handleAnswerClick = (answer) => {
    if (selectedAnswer) return; // Prevent clicking after an answer is selected

    const isCorrect = answer === quizData[currentQuestionIndex].correct_answer;

    if (isCorrect) {
      setScore(score + 1);
    }

    setSelectedAnswer(answer);
    setCorrectAnswer(quizData[currentQuestionIndex].correct_answer);

    // Move to the next question after a short delay
    setTimeout(() => {
      const nextQuestionIndex = currentQuestionIndex + 1;
      if (nextQuestionIndex < quizData.length) {
        setCurrentQuestionIndex(nextQuestionIndex);
        setSelectedAnswer(null);
        setCorrectAnswer(null);
      } else {
        setShowScore(true);
      }
    }, 1000); // Delay for 1 second before moving to the next question
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowScore(false);
    setSelectedAnswer(null);
    setCorrectAnswer(null);
  };

  return (
    <div id="quiz-container">
      {!showScore ? (
        <div className="question">
          <h2>
            Question {currentQuestionIndex + 1}:{" "}
            {quizData[currentQuestionIndex].question}
          </h2>
          <ul>
            {quizData[currentQuestionIndex].incorrect_answers
              .concat(quizData[currentQuestionIndex].correct_answer)
              .map((answer, index) => (
                <li
                  key={index}
                  className={
                    selectedAnswer
                      ? answer === correctAnswer
                        ? "correct"
                        : answer === selectedAnswer
                        ? "incorrect"
                        : ""
                      : ""
                  }
                  onClick={() => handleAnswerClick(answer)}
                  style={{
                    pointerEvents: selectedAnswer ? "none" : "auto", // Disable clicking once an answer is selected
                  }}
                >
                  {answer}
                </li>
              ))}
          </ul>
        </div>
      ) : (
        <div>
          <h2>
            {username}, your score is {score} out of {numQuestions}
          </h2>
          <button onClick={restartQuiz}>Play Again</button>
          <button className="logout" onClick={onLogout}>
            Logout
          </button>{" "}
          {/* Logout button */}
          <button className="back-to-quiz-form" onClick={onBackToQuizForm}>
            Back to Quiz Form
          </button>{" "}
          {/* Back to Quiz Form button */}
        </div>
      )}
    </div>
  );
}

export default QuizContainer;
