import axios from "axios";
import {
  GET_INIT_POSTS,
  GET_MORE_POSTS,
  GET_ERRORS,
  CLEAR_ERRORS,
  ERROR_LOADING,
  CREATE_POST,
  UPDATE_POST,
  GET_POST,
  POST_LOADING,
  UPDATE_POST_LOADING,
  INIT_POST_LOADING,
  UPDATE_PAGE,
  DELETE_POST,
  DELETE_POST_LOADING,
  HIDE_MODAL
} from "./types";

import { getUserInitPosts } from "./memberActions";
const load_time = 1000;

// Create Post
export const createPost = (postData, history) => dispatch => {
  dispatch(clearErrors());
  axios
    .post("/api/posts", postData)
    .then(() => dispatch(PostLoading()))
    .then(() =>
      dispatch({
        type: CREATE_POST
      })
    )
    .then(() =>
      setTimeout(() => {
        history.push("/dashboard");
      }, load_time)
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Update a Post
export const updatePost = (id, postData, history) => dispatch => {
  dispatch(clearErrors());
  axios
    .put(`/api/posts/${id}`, postData)
    .then(() => dispatch(UpdatePostLoading()))
    .then(() =>
      setTimeout(() => {
        dispatch({
          type: UPDATE_POST
        });
      }, load_time)
    )
    .then(() =>
      setTimeout(() => {
        history.push("/dashboard");
      }, load_time)
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Get Initial Posts
export const getInitPosts = (per, page) => dispatch => {
  dispatch(InitPostLoading());
  dispatch(pageUpdate(1));
  axios
    .get(`/api/posts?per=${per}&page=1`)
    .then(res =>
      dispatch({
        type: GET_INIT_POSTS,
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

// Get Initial Posts
export const getPost = id => dispatch => {
  dispatch(PostLoading());
  axios
    .get(`/api/posts/${id}`)
    .then(res =>
      dispatch({
        type: GET_POST,
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

// Get More Posts
export const getMorePosts = (per, page) => dispatch => {
  dispatch(PostLoading());
  dispatch(pageUpdate(page));
  axios
    .get(`/api/posts?per=${per}&page=${page}`)
    .then(res =>
      dispatch({
        type: GET_MORE_POSTS,
        payload: res.data.posts
      })
    )
    .catch(() =>
      dispatch({
        type: GET_MORE_POSTS,
        payload: null
      })
    );
};

// Delete Post
export const deletePost = (id, username, page) => dispatch => {
  axios
    .delete(`/api/posts/${id}`)
    .then(() => dispatch(DeletePostLoading()))
    .then(() =>
      setTimeout(() => {
        dispatch({
          type: DELETE_POST,
          payload: id
        });
      }, load_time)
    )
    .then(() =>
      setTimeout(() => {
        dispatch({
          type: HIDE_MODAL
        });
      }, load_time)
    )
    .then(() =>
      setTimeout(() => {
        dispatch(getUserInitPosts(username, 3, 1));
      }, load_time)
    )
    .then(() =>
      setTimeout(() => {
        dispatch(getInitPosts(3, 1));
      }, load_time)
    )
    .catch(err => {
      dispatch(errorLoading());
      throw err;
    })
    .catch(err =>
      setTimeout(() => {
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        });
      }, load_time)
    );
};

// UPDATE PAGE STATE
export const pageUpdate = page => {
  return {
    type: UPDATE_PAGE,
    payload: page
  };
};

// Clear Errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};

// Set Init loading state
export const InitPostLoading = () => {
  return {
    type: INIT_POST_LOADING
  };
};

// Set loading state
export const PostLoading = () => {
  return {
    type: POST_LOADING
  };
};

// Set Delete loading state
export const DeletePostLoading = () => {
  return {
    type: DELETE_POST_LOADING
  };
};

// Get Post loading state
export const UpdatePostLoading = () => {
  return {
    type: UPDATE_POST_LOADING
  };
};

// Error Loading
export const errorLoading = () => {
  return {
    type: ERROR_LOADING
  };
};
