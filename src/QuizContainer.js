import React, { useState, useMemo } from "react";
import "./styles/QuizContainer.css";

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

  // Randomize answers for each question
  const randomizedAnswers = useMemo(() => {
    return quizData.map((question) => {
      // Combine incorrect and correct answers
      const allAnswers = [
        ...question.incorrect_answers,
        question.correct_answer,
      ];

      // Fisher-Yates shuffle algorithm
      for (let i = allAnswers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [allAnswers[i], allAnswers[j]] = [allAnswers[j], allAnswers[i]];
      }

      return {
        ...question,
        shuffledAnswers: allAnswers,
      };
    });
  }, [quizData]);

  const handleAnswerClick = (answer) => {
    if (selectedAnswer) return; // Prevent clicking after an answer is selected

    const isCorrect =
      answer === randomizedAnswers[currentQuestionIndex].correct_answer;

    if (isCorrect) {
      setScore(score + 1);
    }

    setSelectedAnswer(answer);
    setCorrectAnswer(randomizedAnswers[currentQuestionIndex].correct_answer);

    // Move to the next question after a short delay
    setTimeout(() => {
      const nextQuestionIndex = currentQuestionIndex + 1;
      if (nextQuestionIndex < randomizedAnswers.length) {
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

  // Calculate percentage
  const calculatePercentage = () => {
    return Math.round((score / numQuestions) * 100);
  };

  return (
    <div id="quiz-container">
      {!showScore ? (
        <div className="question">
          <h2>
            Question {currentQuestionIndex + 1}:{" "}
            {randomizedAnswers[currentQuestionIndex].question}
          </h2>
          <ul>
            {randomizedAnswers[currentQuestionIndex].shuffledAnswers.map(
              (answer, index) => (
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
              )
            )}
          </ul>
        </div>
      ) : (
        <div className="score-container">
          <h2>
            {username}, your score is {calculatePercentage()}%
            <br />({score} out of {numQuestions} questions)
          </h2>
          <button className="login" onClick={restartQuiz}>
            Play Again
          </button>
          <button className="logout" onClick={onLogout}>
            Logout
          </button>{" "}
          <button className="back-to-quiz-form" onClick={onBackToQuizForm}>
            Back to Quiz Form
          </button>
        </div>
      )}
    </div>
  );
}

export default QuizContainer;
