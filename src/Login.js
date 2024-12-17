import React, { useState } from "react";
import "./styles/Login.css";
function Login({ onLogin }) {
  const [username, setUsername] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (username) {
      onLogin(username);
    }
  };

  return (
    <form className="login-form" onSubmit={handleLogin}>
      <h1>Welcome To Quiz</h1>
      {/* <label htmlFor="username">Enter Username:</label> */}
      <input
        required
        className="input"
        type="text"
        id="username"
        value={username}
        placeholder="Enter your username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <button className="button" type="submit">
        Login
      </button>
    </form>
  );
}

export default Login;
