import React, { useState } from "react";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (username) {
      onLogin(username);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <label htmlFor="username">Enter Username:</label>
      <input
        type="text"
        id="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
