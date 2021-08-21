import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import Dashboard from "./Dashboard";

function App() {
  return (
    <div className="container">
      <h1>Expense Tracker</h1>
      <Router>
        <Switch>
          <Route path="/register" exact component={Register} />
          <Route path="/" exact component={Login} />
          <Route path="/dashboard" exact component={Dashboard} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
