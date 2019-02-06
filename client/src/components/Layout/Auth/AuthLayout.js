import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "../../Auth/Login";
import Register from "../../Auth/Register";
import ForgotPassword from "../../Auth/ForgotPassword";
import ResetPassword from "../../Auth/ResetPassword";
import "./AuthLayout.css";

class AuthLayout extends React.Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/auth/login" component={Login} />
          <Route exact path="/auth/register" component={Register} />
          <Route exact path="/auth/forgot-pass" component={ForgotPassword} />
          <Route exact path="/auth/reset/:token" component={ResetPassword} />
        </Switch>
      </div>
    );
  }
}

export default AuthLayout;
