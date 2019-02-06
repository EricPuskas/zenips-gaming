import axios from "axios";
import { logoutUser } from "./authActions";
import {
  INIT_TEAM_LOADING,
  DELETE_TEAM_MEMBER,
  DELETE_TEAM_MEMBER_LOADING,
  TEAM_LOADING,
  GET_TEAM_MEMBERS,
  GET_ERRORS,
  CLEAR_ERRORS,
  ERROR_LOADING,
  HIDE_MODAL
} from "./types";

const load_time = 1000;

// Get Initial Team Members
export const getTeamMembers = withLoader => dispatch => {
  withLoader && dispatch(initTeamLoading());
  axios
    .get(`/api/users`)
    .then(res =>
      dispatch({
        type: GET_TEAM_MEMBERS,
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

// Delete a user as Admin
export const deleteUserAdmin = (id, history) => dispatch => {
  axios
    .delete(`/api/users/${id}`)
    .then(() => dispatch(deleteTeamMemberLoading()))
    .then(() =>
      setTimeout(() => {
        dispatch({
          type: DELETE_TEAM_MEMBER,
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
        history.push("/dashboard/team");
      }, load_time)
    )
    .catch(err =>
      setTimeout(() => {
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        });
      }, load_time)
    );
};

// Delete User as the user himself
export const deleteUser = (id, history) => dispatch => {
  axios
    .delete(`/api/users/${id}`)
    .then(() => dispatch(deleteTeamMemberLoading()))
    .then(() =>
      setTimeout(() => {
        dispatch(logoutUser());
      }, load_time)
    )
    .then(() =>
      setTimeout(() => {
        history.push("/auth/login");
      }, load_time)
    )
    .then(() =>
      setTimeout(() => {
        dispatch({
          type: DELETE_TEAM_MEMBER,
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
    .catch(err =>
      setTimeout(() => {
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        });
      }, load_time)
    );
};

// Set Init loading state
export const initTeamLoading = () => {
  return {
    type: INIT_TEAM_LOADING
  };
};

// Set loading state
export const teamLoading = () => {
  return {
    type: TEAM_LOADING
  };
};

// Delete Team member loading
export const deleteTeamMemberLoading = () => {
  return {
    type: DELETE_TEAM_MEMBER_LOADING
  };
};

// Clear Errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};

// Error Loading
export const errorLoading = () => {
  return {
    type: ERROR_LOADING
  };
};
