import {
  GET_INIT_MESSAGES,
  GET_PREVIEW_MSG,
  INIT_MESSAGES_LOADING,
  UPDATE_PAGE_MSG,
  MESSAGES_LOADING,
  GET_MORE_MESSAGES,
  MOVE_MESSAGE,
  MOVE_MESSAGE_SUCCESS,
  DELETE_MESSAGE,
  DELETE_MESSAGE_LOADING,
  IS_READ_CHANGE
} from "../actions/types";
const initialState = {
  messages: [],
  preview: [],
  per: 20,
  page: 1,
  inbox: 0,
  archive: 0,
  totalPages: null,
  scrolling: false,
  loading: false,
  init_loading: false,
  delete_loading: false,
  update_loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_INIT_MESSAGES:
      return {
        ...state,
        init_loading: false,
        update_loading: false,
        loading: false,
        scrolling: false,
        messages: action.payload.messages,
        totalPages: action.payload.pages,
        inbox: action.payload.inbox,
        archive: action.payload.archive
      };
    case INIT_MESSAGES_LOADING:
      return {
        ...state,
        message: {},
        update_loading: false,
        delete_loading: false,
        loading: false,
        init_loading: true
      };
    case MOVE_MESSAGE:
      return {
        ...state,
        messages: []
      };
    case IS_READ_CHANGE:
      return {
        ...state
      };
    case GET_MORE_MESSAGES:
      return {
        ...state,
        messages: [...state.messages, ...action.payload],
        loading: false,
        scrolling: false
      };
    case MESSAGES_LOADING:
      return {
        ...state,
        loading: true
      };
    case DELETE_MESSAGE:
      return {
        ...state,
        delete_loading: false,
        messages: []
      };
    case DELETE_MESSAGE_LOADING:
      return {
        ...state,
        delete_loading: true
      };
    case MOVE_MESSAGE_SUCCESS:
      return {
        ...state,
        update_loading: true
      };
    case UPDATE_PAGE_MSG:
      return {
        ...state,
        page: action.payload,
        scrolling: true
      };
    case GET_PREVIEW_MSG:
      return {
        ...state,
        preview: action.payload.messages,
        inbox: action.payload.inbox,
        archive: action.payload.archive
      };
    default:
      return state;
  }
}
