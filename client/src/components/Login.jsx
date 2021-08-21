import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

function Login() {
  //declare state
  const [userInput, setUserInput] = useState({
    email: "",
    password: "",
  });

  let history = useHistory();

  const [isInvalid, setInvalid] = useState(false);

  function handleInputChange(event) {
    const eventCallerName = event.target.name;
    const eventCallerValue = event.target.value;

    setUserInput((prevState) => {
      return {
        ...prevState,
        [eventCallerName]: eventCallerValue,
      };
    });
  }

  function handleClick(event) {
    event.preventDefault();
    return callLogin();
  }

  async function callLogin() {
    const response = await fetch("/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: userInput.email,
        password: userInput.password,
      }),
    });

    const data = await response.json();

    if (data.success === true) {
      localStorage.setItem("authToken", data.auth_token);
      localStorage.setItem("isAuthenticated", true);
      history.push("/dashboard");
    } else {
      setInvalid((prev) => !prev);
    }
  }

  return (
    <div className="login-wrapper">
      <form className="login-form">
        {isInvalid && (
          <p style={{ color: "red" }}>Incorrect username or password!</p>
        )}
        <label htmlFor="email">Email</label>
        <input
          type="text"
          name="email"
          autoFocus
          placeholder="Enter email..."
          onChange={handleInputChange}
          value={userInput.email}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          placeholder="Enter password..."
          onChange={handleInputChange}
          value={userInput.password}
        />
        <button type="submit" onClick={handleClick}>
          Login
        </button>
        <p>
          New User? <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
