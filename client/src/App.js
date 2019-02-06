// Dependencies
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import jwt_decode from "jwt-decode";

// CSS
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import "./App.css";

// Actions
import { setCurrentUser, logoutUser } from "./actions/authActions";

// Utilities
import setAuthToken from "./utils/setAuthToken";

// Store
import store from "./store";

// Import Layouts
import PrivateLayout from "./components/Layout/Private/PrivateLayout";
import PublicLayout from "./components/Layout/Public/PublicLayout";
import AuthLayout from "./components/Layout/Auth/AuthLayout";

// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);

  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);

  // Set User and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout User
    store.dispatch(logoutUser());

    // Redirect to login
    window.location.href = "/auth/login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <Switch>
              <Route path="/dashboard" component={PrivateLayout} />
              <Route path="/auth" component={AuthLayout} />
              <Route path="/" component={PublicLayout} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
