import {
  GET_INIT_PATCH_NOTES,
  INIT_PATCH_NOTES_LOADING,
  GET_MORE_PATCH_NOTES,
  PATCH_NOTES_LOADING,
  CREATE_PATCH_NOTE,
  UPDATE_PATCH_NOTE,
  UPDATE_PATCH_NOTE_LOADING,
  DELETE_PATCH_NOTE,
  DELETE_PATCH_NOTE_LOADING,
  UPDATE_PAGE_PATCH_NOTES,
  GET_PATCH_NOTE
} from "../actions/types";

const initialState = {
  patch_notes: [],
  patch_note: {},
  per: 3,
  page: 1,
  totalPages: null,
  scrolling: false,
  loading: false,
  init_loading: false,
  update_loading: false,
  delete_loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_INIT_PATCH_NOTES:
      return {
        ...state,
        patch_notes: action.payload.patchNotes,
        totalPages: action.payload.pages,
        init_loading: false,
        update_loading: false,
        loading: false,
        scrolling: false
      };
    case INIT_PATCH_NOTES_LOADING:
      return {
        ...state,
        patch_note: {},
        update_loading: false,
        delete_loading: false,
        loading: false,
        init_loading: true
      };
    case GET_MORE_PATCH_NOTES:
      return {
        ...state,
        patch_notes: [...state.patch_notes, ...action.payload],
        loading: false,
        scrolling: false
      };
    case PATCH_NOTES_LOADING:
      return {
        ...state,
        loading: true
      };
    case CREATE_PATCH_NOTE:
      return {
        ...state,
        patch_notes: [],
        loading: true,
        page: 1
      };
    case GET_PATCH_NOTE:
      return {
        ...state,
        patch_note: action.payload,
        loading: false
      };
    case UPDATE_PATCH_NOTE:
      return {
        ...state,
        patch_notes: [],
        update_loading: true,
        page: 1
      };
    case UPDATE_PATCH_NOTE_LOADING:
      return {
        ...state,
        update_loading: true
      };
    case DELETE_PATCH_NOTE:
      return {
        ...state,
        delete_loading: false,
        patch_notes: []
      };
    case DELETE_PATCH_NOTE_LOADING:
      return {
        ...state,
        delete_loading: true
      };
    case UPDATE_PAGE_PATCH_NOTES:
      return {
        ...state,
        page: action.payload,
        scrolling: true
      };
    default:
      return state;
  }
}
