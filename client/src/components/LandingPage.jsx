import React from "react";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div className="container-landing">
      <div className="landing-top">
        <h1>Expense Tracker</h1>
        <div>
          <Link to="/login">
            <button className="landing-btn">Login</button>
          </Link>
          <Link to="/register">
            <button className="landing-btn">Register</button>
          </Link>
        </div>
      </div>
      <div className="landing-bottom">&copy;Copyright 2021 Souvik Goon</div>
    </div>
  );
}

export default LandingPage;
