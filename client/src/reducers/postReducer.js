import {
  GET_INIT_POSTS,
  INIT_POST_LOADING,
  GET_MORE_POSTS,
  POST_LOADING,
  CREATE_POST,
  UPDATE_POST,
  UPDATE_POST_LOADING,
  DELETE_POST,
  DELETE_POST_LOADING,
  UPDATE_PAGE,
  GET_POST
} from "../actions/types";

const initialState = {
  posts: [],
  post: {},
  per: 3,
  page: 1,
  totalPages: null,
  scrolling: false,
  loading: false,
  init_loading: false,
  delete_loading: false,
  update_loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_INIT_POSTS:
      return {
        ...state,
        posts: action.payload.posts,
        totalPages: action.payload.pages,
        init_loading: false,
        update_loading: false,
        loading: false,
        scrolling: false
      };
    case INIT_POST_LOADING:
      return {
        ...state,
        post: {},
        update_loading: false,
        delete_loading: false,
        loading: false,
        init_loading: true
      };
    case GET_MORE_POSTS:
      return {
        ...state,
        posts: [...state.posts, ...action.payload],
        loading: false,
        scrolling: false
      };
    case POST_LOADING:
      return {
        ...state,
        loading: true
      };
    case CREATE_POST:
      return {
        ...state,
        posts: [],
        loading: true,
        page: 1
      };
    case GET_POST:
      return {
        ...state,
        post: action.payload,
        loading: false
      };
    case UPDATE_POST:
      return {
        ...state,
        posts: [],
        update_loading: true,
        page: 1
      };
    case UPDATE_POST_LOADING:
      return {
        ...state,
        update_loading: true
      };
    case DELETE_POST:
      return {
        ...state,
        delete_loading: false,
        posts: []
      };
    case DELETE_POST_LOADING:
      return {
        ...state,
        delete_loading: true
      };
    case UPDATE_PAGE:
      return {
        ...state,
        page: action.payload,
        scrolling: true
      };
    default:
      return state;
  }
}
