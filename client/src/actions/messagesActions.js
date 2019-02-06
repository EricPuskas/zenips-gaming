import axios from "axios";
import {
  GET_INIT_MESSAGES,
  COUNT_INBOX,
  GET_PREVIEW_MSG,
  GET_ERRORS,
  COUNT_ARCHIVE,
  CLEAR_ERRORS,
  INIT_MESSAGES_LOADING,
  GET_MORE_MESSAGES,
  MESSAGES_LOADING,
  GET_TOTAL_PAGES_MSG,
  UPDATE_PAGE_MSG,
  MOVE_MESSAGE,
  HIDE_MODAL,
  MOVE_MESSAGE_SUCCESS,
  DELETE_MESSAGE,
  DELETE_MESSAGE_LOADING,
  GET_MESSAGE,
  IS_READ_CHANGE
} from "./types";

// Get Initial Posts
export const getInitMessages = (per, page, search) => dispatch => {
  dispatch(InitMessagesLoading());
  dispatch(getTotalPagesMsg(per, 1, search));
  dispatch(pageUpdateMsg(1));
  dispatch(countInbox());
  dispatch(countArchive());
  axios
    .get(`/api/messages?per=${per}&page=1&search=${search}`)
    .then(res =>
      setTimeout(() => {
        dispatch({
          type: GET_INIT_MESSAGES,
          payload: res.data.messages
        });
      }, 300)
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Get Initial Posts
export const getMessage = id => dispatch => {
  axios
    .get(`/api/messages/${id}`)
    .then(res =>
      dispatch({
        type: GET_MESSAGE,
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
export const deleteSelected = (data, location) => dispatch => {
  axios
    .delete("/api/messages", { data })
    .then(() => dispatch(DeleteMsgLoading()))
    .then(() =>
      setTimeout(() => {
        dispatch({
          type: DELETE_MESSAGE
        });
      }, 1000)
    )
    .then(() =>
      setTimeout(() => {
        dispatch({
          type: HIDE_MODAL
        });
      }, 1000)
    )
    .then(() =>
      setTimeout(() => {
        dispatch(getInitMessages(20, 1, location));
      }, 1000)
    )
    .catch(err =>
      setTimeout(() => {
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        });
      }, 1000)
    );
};

// Get More Messages
export const getMoreMessages = (per, page, search) => dispatch => {
  dispatch(MessagesLoading());
  dispatch(pageUpdateMsg(page));
  axios
    .get(`/api/messages?per=${per}&page=${page}&search=${search}`)
    .then(res =>
      setTimeout(() => {
        dispatch({
          type: GET_MORE_MESSAGES,
          payload: res.data.messages
        });
      }, 300)
    )
    .catch(() =>
      dispatch({
        type: GET_MORE_MESSAGES,
        payload: null
      })
    );
};

// Get More Messages
export const moveMessages = (data, location) => dispatch => {
  let current_location;
  location === "inbox"
    ? (current_location = "archive")
    : (current_location = "inbox");
  dispatch(moveMessagesLoading());
  axios
    .put(`/api/messages/move/${location}`, data)
    .then(() =>
      setTimeout(() => {
        dispatch({
          type: MOVE_MESSAGE
        });
      }, 600)
    )
    .then(() =>
      setTimeout(() => {
        dispatch(getInitMessages(20, 1, current_location));
      }, 600)
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Preview Messages
export const getPreviewMessages = () => dispatch => {
  axios
    .get("/api/messages?per=3&page=1&search=inbox")
    .then(res =>
      dispatch({
        type: GET_PREVIEW_MSG,
        payload: res.data.messages
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//  Count Inbox
export const countInbox = () => dispatch => {
  axios
    .get("/api/messages?search=inbox")
    .then(res =>
      dispatch({
        type: COUNT_INBOX,
        payload: res.data.inbox
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//  Count Inbox
export const countArchive = () => dispatch => {
  axios
    .get("/api/messages?search=archive")
    .then(res =>
      dispatch({
        type: COUNT_ARCHIVE,
        payload: res.data.archive
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// GET TOTAL PAGES STATE
export const getTotalPagesMsg = (per, page, search) => dispatch => {
  axios
    .get(`/api/messages?per=${per}&page=${page}&search=${search}`)
    .then(res =>
      dispatch({
        type: GET_TOTAL_PAGES_MSG,
        payload: res.data.pages
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// GET TOTAL PAGES STATE
export const isReadChange = (id, data) => dispatch => {
  axios
    .put(`/api/messages/${id}`, data)
    .then(res =>
      dispatch({
        type: IS_READ_CHANGE,
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

// UPDATE PAGE STATE
export const pageUpdateMsg = page => {
  return {
    type: UPDATE_PAGE_MSG,
    payload: page
  };
};

export const InitMessagesLoading = () => {
  return {
    type: INIT_MESSAGES_LOADING
  };
};

export const MessagesLoading = () => {
  return {
    type: MESSAGES_LOADING
  };
};

export const DeleteMsgLoading = () => {
  return {
    type: DELETE_MESSAGE_LOADING
  };
};
export const moveMessagesLoading = () => {
  return {
    type: MOVE_MESSAGE_SUCCESS
  };
};

// Clear Errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
