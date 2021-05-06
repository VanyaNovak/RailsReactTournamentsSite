import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../components/Home";
import Tournaments from "../components/Tournaments";
import Tournament from "../components/Tournament";

export default (
  <Router>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/tournaments" exact component={Tournaments} />
      <Route path="/tournament/:id" exact component={Tournament} />
    </Switch>
  </Router>
);