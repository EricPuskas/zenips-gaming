import axios from "axios";
import { logoutUser, getUserInfo } from "./authActions";
import { getTeamMembers } from "./teamActions";
import {
  UPDATE_TEAM_MEMBER_INFO,
  UPDATE_TEAM_MEMBER_LOADING,
  UPDATE_MEMBER_AVATAR,
  DELETE_TEAM_MEMBER,
  DELETE_TEAM_MEMBER_LOADING,
  TEAM_LOADING,
  GET_TEAM_MEMBER,
  GET_ERRORS,
  CLEAR_ERRORS,
  ERROR_LOADING,
  SEND_RESET_PW_EMAIL,
  SEND_EMAIL_LOADING,
  STOP_EMAIL_LOADING,
  RESET_PW_SUCCESS,
  UPDATE_PASSWORD,
  HIDE_MODAL,
  GET_USER_INIT_POSTS,
  GET_USER_INIT_PATCH_NOTES,
  UPDATE_PAGE_UP,
  UPDATE_PAGE_UPA,
  USER_POSTS_LOADING,
  USER_PATCH_NOTES_LOADING,
  GET_MORE_USER_POSTS,
  GET_MORE_USER_PATCH_NOTES,
  DELETE_USER_POST,
  DELETE_USER_PATCH_NOTES,
  GET_MORE_USER_ARTICLES,
  USER_ARTICLES_LOADING,
  UPDATE_PAGE_UART,
  GET_USER_INIT_ARTICLES,
  SUBSCRIBE,
  CLEAR_SUBSCRIBE_MSG
} from "./types";
const load_time = 500;

export const addSubscriber = data => dispatch => {
  axios
    .post("/api/newsletter", data)
    .then(res =>
      dispatch({
        type: SUBSCRIBE,
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
export const getUserInitPosts = (username, per, page) => dispatch => {
  dispatch(pageUpdateUPosts(page));
  axios
    .get(`/api/posts/user/${username}?per=${per}&page=${page}`)
    .then(res =>
      dispatch({
        type: GET_USER_INIT_POSTS,
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
export const getUserInitPatchNotes = (username, per, page) => dispatch => {
  dispatch(pageUpdateUPatchNotes(page));
  axios
    .get(`/api/patchnotes/user/${username}?per=${per}&page=${page}`)
    .then(res =>
      dispatch({
        type: GET_USER_INIT_PATCH_NOTES,
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
export const getUserInitArticles = (username, per, page) => dispatch => {
  dispatch(pageUpdateUArticles(page));
  axios
    .get(`/api/articles/user/${username}?per=${per}&page=${page}`)
    .then(res =>
      dispatch({
        type: GET_USER_INIT_ARTICLES,
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
export const getMoreUserPosts = (username, per, page) => dispatch => {
  dispatch(UserPostsLoading());
  dispatch(pageUpdateUPosts(page));
  axios
    .get(`/api/posts/user/${username}?per=${per}&page=${page}`)
    .then(res =>
      dispatch({
        type: GET_MORE_USER_POSTS,
        payload: res.data.posts
      })
    )
    .catch(() =>
      dispatch({
        type: GET_MORE_USER_POSTS,
        payload: null
      })
    );
};

export const getMoreUserPatchNotes = (username, per, page) => dispatch => {
  dispatch(UserPatchNotesLoading());
  dispatch(pageUpdateUPatchNotes(page));
  axios
    .get(`/api/patchnotes/user/${username}?per=${per}&page=${page}`)
    .then(res =>
      dispatch({
        type: GET_MORE_USER_PATCH_NOTES,
        payload: res.data.patch_notes
      })
    )
    .catch(() =>
      dispatch({
        type: GET_MORE_USER_PATCH_NOTES,
        payload: null
      })
    );
};

// Get More Posts
export const getMoreUserArticles = (username, per, page) => dispatch => {
  dispatch(UserArticlesLoading());
  dispatch(pageUpdateUArticles(page));
  axios
    .get(`/api/articles/user/${username}?per=${per}&page=${page}`)
    .then(res =>
      dispatch({
        type: GET_MORE_USER_ARTICLES,
        payload: res.data.articles
      })
    )
    .catch(() =>
      dispatch({
        type: GET_MORE_USER_ARTICLES,
        payload: null
      })
    );
};

// Get Team Member
export const getTeamMember = username => dispatch => {
  dispatch(teamLoading());
  dispatch(getUserInitPosts(username, 3, 1));
  dispatch(getUserInitPatchNotes(username, 3, 1));
  dispatch(getUserInitArticles(username, 2, 1));
  axios
    .get(`/api/users/handle/${username}`)
    .then(res =>
      dispatch({
        type: GET_TEAM_MEMBER,
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
export const deleteUserPost = id => dispatch => {
  dispatch({
    type: DELETE_USER_POST,
    payload: id
  });
};

// Delete Post
export const deleteUserPatchNote = id => dispatch => {
  dispatch({
    type: DELETE_USER_PATCH_NOTES,
    payload: id
  });
};

// Update a team member info
export const updateUserProfile = (
  username,
  id,
  data,
  updateCurrentUser
) => dispatch => {
  dispatch(clearErrors());
  axios
    .put(`/api/users/${id}`, data)
    .then(() =>
      setTimeout(() => {
        if (updateCurrentUser === true) {
          dispatch(getUserInfo(id));
        }
      }, load_time)
    )
    .then(() => dispatch(updateTeamMemberLoading()))
    .then(() =>
      setTimeout(() => {
        dispatch({
          type: UPDATE_TEAM_MEMBER_INFO
        });
      }, load_time)
    )
    .then(() =>
      setTimeout(() => {
        dispatch(getTeamMember(username));
      }, load_time)
    )
    .then(() =>
      setTimeout(() => {
        dispatch(getTeamMembers(false));
      }, load_time)
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Update a team member avatar
export const updateUserAvatar = (id, username, data) => dispatch => {
  dispatch({
    type: HIDE_MODAL
  });
  dispatch(updateTeamMemberLoading());
  axios
    .put(`/api/users/${id}/avatar`, data)
    .then(res =>
      dispatch({
        type: UPDATE_MEMBER_AVATAR,
        payload: res.data
      })
    )
    .then(() => dispatch(getTeamMembers()))
    .then(() => dispatch(getTeamMember(username)))
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

// Send reset pw email
export const sendResetPwEmail = data => dispatch => {
  dispatch(clearErrors());
  dispatch(sendEmailLoading());
  axios
    .post(`/api/users/reset`, data)
    .then(() =>
      dispatch({
        type: RESET_PW_SUCCESS
      })
    )
    .then(() =>
      setTimeout(() => {
        dispatch({
          type: SEND_RESET_PW_EMAIL
        });
      }, 3000)
    )
    .then(() =>
      setTimeout(() => {
        dispatch({
          type: HIDE_MODAL
        });
      }, 3000)
    )
    .catch(err =>
      setTimeout(() => {
        dispatch(stopEmailLoading());
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        });
      }, 0)
    );
};

// Send forgot pw email
export const sendForgotPwEmail = (data, history) => dispatch => {
  dispatch(clearErrors());
  dispatch(sendEmailLoading());
  axios
    .post(`/api/users/forgot`, data)
    .then(() =>
      dispatch({
        type: RESET_PW_SUCCESS
      })
    )
    .then(() =>
      setTimeout(() => {
        dispatch({
          type: SEND_RESET_PW_EMAIL
        });
      }, 3000)
    )
    .then(() =>
      setTimeout(() => {
        history.push("/auth/login");
      }, 3000)
    )
    .catch(err =>
      setTimeout(() => {
        dispatch(stopEmailLoading());
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        });
      }, 0)
    );
};

// Update password
export const updatePassword = (id, data, history) => dispatch => {
  dispatch({
    type: SEND_EMAIL_LOADING
  });
  axios
    .put(`/api/users/changepw/${id}`, data)
    .then(() =>
      dispatch({
        type: RESET_PW_SUCCESS
      })
    )
    .then(() =>
      setTimeout(() => {
        dispatch({
          type: UPDATE_PASSWORD
        });
      }, load_time)
    )
    .then(() =>
      setTimeout(() => {
        history.push("/dashboard");
      }, load_time)
    )
    .catch(err =>
      setTimeout(() => {
        dispatch(stopEmailLoading());
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        });
      }, 0)
    );
};

// Update password
export const updatePasswordPublic = (id, data, history) => dispatch => {
  dispatch(clearErrors());
  dispatch({
    type: SEND_EMAIL_LOADING
  });
  axios
    .put(`/api/users/changepw/${id}`, data)
    .then(() =>
      dispatch({
        type: RESET_PW_SUCCESS
      })
    )
    .then(() =>
      setTimeout(() => {
        dispatch({
          type: UPDATE_PASSWORD
        });
      }, load_time)
    )
    .then(() =>
      setTimeout(() => {
        history.push("/auth/login");
      }, load_time)
    )
    .catch(err =>
      setTimeout(() => {
        dispatch(stopEmailLoading());
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        });
      }, load_time)
    );
};

export const sendEmailLoading = () => {
  return {
    type: SEND_EMAIL_LOADING
  };
};
// Set Init loading state
export const stopEmailLoading = () => {
  return {
    type: STOP_EMAIL_LOADING
  };
};

// Set loading state
export const teamLoading = () => {
  return {
    type: TEAM_LOADING
  };
};

// Set loading state
export const UserPostsLoading = () => {
  return {
    type: USER_POSTS_LOADING
  };
};

export const UserPatchNotesLoading = () => {
  return {
    type: USER_PATCH_NOTES_LOADING
  };
};

export const UserArticlesLoading = () => {
  return {
    type: USER_ARTICLES_LOADING
  };
};
// Update Team member loading
export const updateTeamMemberLoading = () => {
  return {
    type: UPDATE_TEAM_MEMBER_LOADING
  };
};

// UPDATE PAGE STATE
export const pageUpdateUPosts = page => {
  return {
    type: UPDATE_PAGE_UP,
    payload: page
  };
};

// UPDATE PAGE STATE
export const pageUpdateUPatchNotes = page => {
  return {
    type: UPDATE_PAGE_UPA,
    payload: page
  };
};

// UPDATE PAGE STATE
export const pageUpdateUArticles = page => {
  return {
    type: UPDATE_PAGE_UART,
    payload: page
  };
};

export const clearSubscribeMsg = () => {
  return {
    type: CLEAR_SUBSCRIBE_MSG
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
