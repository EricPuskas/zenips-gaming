import axios from "axios";
import {
  GET_INIT_PATCH_NOTES,
  GET_MORE_PATCH_NOTES,
  GET_ERRORS,
  CLEAR_ERRORS,
  ERROR_LOADING,
  CREATE_PATCH_NOTE,
  UPDATE_PATCH_NOTE,
  GET_PATCH_NOTE,
  PATCH_NOTES_LOADING,
  UPDATE_PATCH_NOTE_LOADING,
  INIT_PATCH_NOTES_LOADING,
  UPDATE_PAGE_PATCH_NOTES,
  DELETE_PATCH_NOTE,
  DELETE_PATCH_NOTE_LOADING,
  HIDE_MODAL
} from "./types";
import { getUserInitPatchNotes } from "./memberActions";
// LOADING TIME - FOR SMOOTH but SHORT ANIMATIONS
const load_time = 1000;

// Create Patch Note
export const createPatchNote = (data, history) => dispatch => {
  dispatch(clearErrors());
  axios
    .post("/api/patchnotes", data)
    .then(() => dispatch(PatchNotesLoading()))
    .then(() =>
      dispatch({
        type: CREATE_PATCH_NOTE
      })
    )
    .then(() =>
      setTimeout(() => {
        history.push("/dashboard/patchnotes");
      }, load_time)
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Update a patch note
export const updatePatchNote = (id, data, history) => dispatch => {
  dispatch(clearErrors());
  axios
    .put(`/api/patchnotes/${id}`, data)
    .then(() => dispatch(UpdatePatchNoteLoading()))
    .then(() =>
      setTimeout(() => {
        dispatch({
          type: UPDATE_PATCH_NOTE
        });
      }, load_time)
    )
    .then(() =>
      setTimeout(() => {
        history.push("/dashboard/patchnotes");
      }, load_time)
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Get Initial Patch Notes
export const getInitPatchNotes = (per, page) => dispatch => {
  dispatch(InitPatchNotesLoading());
  dispatch(pageUpdate(1));
  axios
    .get(`/api/patchnotes?per=${per}&page=1`)
    .then(res =>
      dispatch({
        type: GET_INIT_PATCH_NOTES,
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

//  get patch note by id
export const getPatchNote = id => dispatch => {
  dispatch(PatchNotesLoading());
  axios
    .get(`/api/patchnotes/${id}`)
    .then(res =>
      dispatch({
        type: GET_PATCH_NOTE,
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

// Load more Patch notes
export const getMorePatchNotes = (per, page) => dispatch => {
  dispatch(PatchNotesLoading());
  dispatch(pageUpdate(page));
  axios
    .get(`/api/patchnotes?per=${per}&page=${page}`)
    .then(res =>
      dispatch({
        type: GET_MORE_PATCH_NOTES,
        payload: res.data.patchNotes
      })
    )
    .catch(() =>
      dispatch({
        type: GET_MORE_PATCH_NOTES,
        payload: null
      })
    );
};

// Delete a patch note
export const deletePatchNote = (id, username) => dispatch => {
  axios
    .delete(`/api/patchnotes/${id}`)
    .then(() => dispatch(DeletePatchNoteLoading()))
    .then(() =>
      setTimeout(() => {
        dispatch({
          type: DELETE_PATCH_NOTE,
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
        dispatch(getUserInitPatchNotes(username, 3, 1));
      }, load_time)
    )
    .then(() =>
      setTimeout(() => {
        dispatch(getInitPatchNotes(3, 1));
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
    type: UPDATE_PAGE_PATCH_NOTES,
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
export const InitPatchNotesLoading = () => {
  return {
    type: INIT_PATCH_NOTES_LOADING
  };
};

// Set loading state
export const PatchNotesLoading = () => {
  return {
    type: PATCH_NOTES_LOADING
  };
};

// Set Delete loading state
export const DeletePatchNoteLoading = () => {
  return {
    type: DELETE_PATCH_NOTE_LOADING
  };
};

// Get Patch Note loading state
export const UpdatePatchNoteLoading = () => {
  return {
    type: UPDATE_PATCH_NOTE_LOADING
  };
};

// Error Loading
export const errorLoading = () => {
  return {
    type: ERROR_LOADING
  };
};
