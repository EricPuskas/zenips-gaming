import {
  GET_INIT_MESSAGES,
  GET_PREVIEW_MSG,
  COUNT_INBOX,
  COUNT_ARCHIVE,
  INIT_MESSAGES_LOADING,
  GET_TOTAL_PAGES_MSG,
  UPDATE_PAGE_MSG,
  MESSAGES_LOADING,
  GET_MORE_MESSAGES,
  MOVE_MESSAGE,
  MOVE_MESSAGE_SUCCESS,
  DELETE_MESSAGE,
  DELETE_MESSAGE_LOADING,
  GET_MESSAGE,
  IS_READ_CHANGE
} from "../actions/types";
const initialState = {
  messages: [],
  message: {},
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
        messages: action.payload
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
    case GET_MESSAGE:
      return {
        ...state,
        message: action.payload
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
    case GET_TOTAL_PAGES_MSG:
      return {
        ...state,
        totalPages: action.payload
      };
    case COUNT_INBOX:
      return {
        ...state,
        inbox: action.payload
      };
    case COUNT_ARCHIVE:
      return {
        ...state,
        archive: action.payload
      };
    case GET_PREVIEW_MSG:
      return {
        ...state,
        preview: action.payload
      };
    default:
      return state;
  }
}
