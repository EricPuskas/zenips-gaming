import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const PrivateRoute = ({ component: Component, props, auth, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      auth.isAuthenticated === true ? (
        <Component {...props} {...rest} />
      ) : (
        <Redirect to="/auth/login" />
      )
    }
  />
);

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);
