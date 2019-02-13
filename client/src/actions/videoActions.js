import axios from "axios";
import {
  GET_ERRORS,
  CLEAR_ERRORS,
  INIT_LOADING_VIDEOS,
  GET_VIDEOS
} from "./types";

// GET ALL TAGS
export const getVideos = () => dispatch => {
  dispatch(clearErrors());
  dispatch(InitVideoLoading());
  axios
    .get("/api/videos")
    .then(res =>
      dispatch({
        type: GET_VIDEOS,
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

export const getLatestVideo = () => dispatch => {
  dispatch(clearErrors());
  dispatch(InitVideoLoading());
  axios
    .get("/api/videos/latest")
    .then(res =>
      dispatch({
        type: GET_VIDEOS,
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
export const deleteVideos = data => dispatch => {
  axios
    .delete("/api/videos", { data })
    .then(() => dispatch(getVideos()))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Delete Post
export const addVideo = data => dispatch => {
  axios
    .post("/api/videos/new", data)
    .then(() => dispatch(getVideos()))
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

// Set Init loading state
export const InitVideoLoading = () => {
  return {
    type: INIT_LOADING_VIDEOS
  };
};
