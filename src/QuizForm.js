import React, { useState } from "react";

function QuizForm({ onQuizStart }) {
  const [category, setCategory] = useState("9");
  const [difficulty, setDifficulty] = useState("easy");
  const [numQuestions, setNumQuestions] = useState(10);

  const startQuiz = (e) => {
    e.preventDefault();

    const url = `https://opentdb.com/api.php?amount=${numQuestions}&category=${category}&difficulty=${difficulty}&type=multiple`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        onQuizStart(data.results, numQuestions);
      })
      .catch((error) => console.error(error));
  };

  return (
    <form onSubmit={startQuiz} id="quiz-form">
      <label htmlFor="category">Select a category:</label>
      <select
        id="category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="9">General Knowledge</option>
        <option value="10">Science & Nature</option>
        <option value="11">Geography</option>
        <option value="12">History</option>
        <option value="13">Literature</option>
        <option value="14">Music</option>
        <option value="15">Film</option>
        <option value="16">Television</option>
        <option value="17">Gaming</option>
        <option value="18">Computing</option>
        <option value="19">Sports</option>
        <option value="20">Nature</option>
      </select>

      <br />

      <label htmlFor="difficulty">Select a difficulty level:</label>
      <select
        id="difficulty"
        value={difficulty}
        onChange={(e) => setDifficulty(e.target.value)}
      >
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>

      <br />

      <label htmlFor="num-questions">Select number of questions:</label>
      <select
        id="num-questions"
        value={numQuestions}
        onChange={(e) => setNumQuestions(e.target.value)}
      >
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="15">15</option>
      </select>

      <br />
      <button type="submit">Start Quiz</button>
    </form>
  );
}

export default QuizForm;
