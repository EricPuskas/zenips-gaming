import setAuthToken from "../utils/setAuthToken";
import axios from "axios";
import jwt_decode from "jwt-decode";
import {
  GET_ERRORS,
  SET_CURRENT_USER,
  CLEAR_ERRORS,
  GET_USER_INFO,
  REGISTER_USER_LOADING,
  CREATE_NEW_USER
} from "./types";

// Register User
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/api/auth/register", userData)
    .then(() =>
      dispatch({
        type: REGISTER_USER_LOADING
      })
    )
    .then(() =>
      setTimeout(() => {
        dispatch({
          type: CREATE_NEW_USER
        });
      }, 1500)
    )
    .then(() =>
      setTimeout(() => {
        history.push("/auth/login");
      }, 1500)
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Login - Get user token
export const loginUser = userData => dispatch => {
  axios
    .post("/api/auth/login", userData)
    .then(res => {
      // Save to localStorage
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      // Set Token to Auth header
      setAuthToken(token);
      // Decode Token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Set login User function
export const setCurrentUser = decoded => ({
  type: SET_CURRENT_USER,
  payload: decoded
});

// Log user out
export const logoutUser = () => dispatch => {
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  // Remove Auth Header for future requests
  setAuthToken(false);
  // Set current user to {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};

// Get current user
export const getUserInfo = id => dispatch => {
  axios
    .get(`/api/users/${id}`)
    .then(res =>
      dispatch({
        type: GET_USER_INFO,
        payload: res.data
      })
    )
    .catch(() =>
      dispatch({
        type: GET_USER_INFO,
        payload: null
      })
    );
};

// Clear Errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
    errors: {}
  };
};
