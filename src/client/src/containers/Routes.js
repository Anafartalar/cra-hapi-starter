import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "pages/Home";
import About from "pages/About";
import NotFound from "pages/NotFound";
import Login from "pages/Login";
import AuthenticatedRoute from "./AuthenticatedRoute";
import UnauthenticatedRoute from "./UnauthenticatedRoute";



export default class Routes extends React.Component {

  render() {

    return (
      <Switch>
        <AuthenticatedRoute exact path="/" component={Home} />
        <AuthenticatedRoute path="/about" component={About} />
        <UnauthenticatedRoute path="/login" component={Login} />
        <Route component={NotFound} />
      </Switch>
    );

  }
}