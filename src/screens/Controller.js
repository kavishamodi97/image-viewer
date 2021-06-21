import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "../screens/login/Login";
import Home from "../screens/home/Home";
import Profile from "../screens/profile/Profile";

class Controller extends Component {
  render() {
    return (
      <Router>
        <div className="main-container">
          <Route exact path="/" render={(props) => <Login {...props} />} />
          <Route path="/home" render={(props) => <Home {...props} />} />
          <Route path="/profile" render={(props) => <Profile {...props} />} />
        </div>
      </Router>
    );
  }
}

export default Controller;
