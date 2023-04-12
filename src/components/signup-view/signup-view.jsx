import React, { useState } from "react";

export const SignupView = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add your logic here for handling form submission
  };

  return (
    <form onSubmit={handleSubmit} className="signup-form">
      <label className="username-label">
        User:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          minLength="3"
          className="username-input"
        />
      </label>
      <label className="password-label">
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="password-input"
        />
      </label>
      <label className="email-label">
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="email-input"
        />
      </label>
      <label className="birthday-label">
        Birthday:
        <input
          type="date"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
          required
          className="birthday-input"
        />
      </label>
      <button type="submit" className="submit-button">
        Submit
      </button>
    </form>
  );
};
