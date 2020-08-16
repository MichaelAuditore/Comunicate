import React from "react";
import { HashRouter, Switch, Route } from "react-router-dom";
import Home from "../modules/home/Home";
import Login from "../modules/login/Login";
import Forgot from "../modules/recover/Forgot";
import Register from "../modules/register/Register";
import Verify from "../modules/verify/Verify";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/modal.css';
import Alert from "../modules/alert/Alert";

function App() {
  return (
    <HashRouter>
      <Alert />
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/sign-up" component={Register} />
        <Route exact path="/forgot-pwd" component={Forgot} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/verify" component={Verify} />
      </Switch>
    </HashRouter>
  );
}
export default App;
