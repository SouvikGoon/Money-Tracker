import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LandingPage from "./LandingPage";
import Register from "./Register";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "./Dashboard";

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/" exact component={LandingPage} />
          <Route path="/register" exact component={Register} />
          <Route path="/login" exact component={Login} />
          <ProtectedRoute path="/dashboard" exact component={Dashboard} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;

//8252579699
