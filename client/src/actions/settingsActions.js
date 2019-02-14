import axios from "axios";
import {
  GET_ERRORS,
  CLEAR_ERRORS,
  GET_ABOUT,
  GET_PRIVACY,
  GET_TERMS,
  GET_COOKIES,
  INIT_LOADING
} from "./types";

// GET ALL TAGS
export const getAbout = () => dispatch => {
  dispatch(initLoading());
  axios
    .get("/api/about")
    .then(res =>
      dispatch({
        type: GET_ABOUT,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const getPrivacy = () => dispatch => {
  dispatch(initLoading());
  axios
    .get("/api/privacy")
    .then(res =>
      dispatch({
        type: GET_PRIVACY,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const getTerms = () => dispatch => {
  dispatch(initLoading());
  axios
    .get("/api/terms")
    .then(res =>
      dispatch({
        type: GET_TERMS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const getCookies = () => dispatch => {
  dispatch(initLoading());
  axios
    .get("/api/cookies")
    .then(res =>
      dispatch({
        type: GET_COOKIES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Delete Post
export const deleteAbout = () => dispatch => {
  axios
    .delete("/api/about")
    .then(() => dispatch(getAbout()))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const deletePrivacy = () => dispatch => {
  axios
    .delete("/api/privacy")
    .then(() => dispatch(getPrivacy()))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const deleteTerms = () => dispatch => {
  axios
    .delete("/api/terms")
    .then(() => dispatch(getTerms()))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const deleteCookies = () => dispatch => {
  axios
    .delete("/api/cookies")
    .then(() => dispatch(getCookies()))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Delete Post
export const newAbout = (data, history) => dispatch => {
  axios
    .post("/api/about", data)
    .then(() => history.push("/dashboard/settings/about"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const newPrivacy = (data, history) => dispatch => {
  axios
    .post("/api/privacy", data)
    .then(() => history.push("/dashboard/settings/privacy"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const newTerms = (data, history) => dispatch => {
  axios
    .post("/api/terms", data)
    .then(() => history.push("/dashboard/settings/terms"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const newCookies = (data, history) => dispatch => {
  axios
    .post("/api/cookies", data)
    .then(() => history.push("/dashboard/settings/cookies"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Clear Errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};

export const initLoading = () => {
  return {
    type: INIT_LOADING
  };
};
