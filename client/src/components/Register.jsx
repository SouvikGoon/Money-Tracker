import React, { useState } from "react";
import { Link } from "react-router-dom";

function Register() {
  //declare state
  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    password: "",
  });

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
    callRegister();
  }

  async function callRegister() {
    const response = fetch("/api/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: userInput.name,
        email: userInput.email,
        password: userInput.password,
      }),
    });

    const data = await response.json();
  }

  return (
    <form className="register-form">
      <label htmlFor="name">Name</label>
      <input
        type="text"
        name="name"
        placeholder="Enter name..."
        onChange={handleInputChange}
        value={userInput.name}
      />
      <label htmlFor="email">Email</label>
      <input
        type="text"
        name="email"
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
        Register
      </button>
      <p>
        Already Registered? <Link to="/">Login</Link>
      </p>
    </form>
  );
}

export default Register;
