import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route, Switch } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ContactsPage from "./pages/ContactsPage";

ReactDOM.render(
  <HashRouter>
    <div>
      <Switch>
        <Route exact path="/" component={LoginPage} />
        <Route exact path="/contacts" component={ContactsPage} />
        <Route component={LoginPage} />
      </Switch>
    </div>
  </HashRouter>,
  document.getElementById("app")
);
