import React from "react";
import ReactDOM from "react-dom";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { HashRouter, Route, Switch } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ContactsPage from "./pages/ContactsPage";

ReactDOM.render(
  <MuiThemeProvider>
    <HashRouter>
      <div>
        <Switch>
          <Route exact path="/" component={LoginPage} />
          <Route exact path="/contacts" component={ContactsPage} />
          <Route component={LoginPage} />
        </Switch>
      </div>
    </HashRouter>
  </MuiThemeProvider>,
  document.getElementById("app")
);
