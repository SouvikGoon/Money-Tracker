import React from "react";
import { Link, useHistory } from "react-router-dom";
import mainIcon from "../icons/calculator.png";

function Navbar() {
  let history = useHistory();

  function handleLogout() {
    localStorage.clear();
    history.push("/");
  }

  return (
    <div>
      <nav>
        <div>
          <img
            className="main-icon"
            src={mainIcon}
            alt="main-icon"
            width="35px"
            height="35px"
          />
          <h1>Expense Tracker</h1>
        </div>
        <Link to="/">
          <button className="btn-logout" onClick={handleLogout}>
            Logout
          </button>
        </Link>
      </nav>
      <hr />
    </div>
  );
}

export default Navbar;
