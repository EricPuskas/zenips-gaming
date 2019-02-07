import {
  CREATE_ARTICLE,
  GET_INIT_ARTICLES,
  INIT_ARTICLES_LOADING,
  UPDATE_PAGE_ART,
  ARTICLES_LOADING,
  GET_MORE_ARTICLES,
  GET_ARTICLE,
  GET_SEARCH_ARTICLES,
  UPDATE_ARTICLE,
  UPDATE_ARTICLE_LOADING,
  DELETE_ARTICLE,
  DELETE_ARTICLE_LOADING,
  GET_TAGS
} from "../actions/types";

const initialState = {
  articles: [],
  article: {},
  tags: [],
  count: 0,
  per: 8,
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
    case CREATE_ARTICLE:
      return {
        ...state,
        articles: [],
        loading: true,
        page: 1
      };
    case UPDATE_ARTICLE:
      return {
        ...state,
        articles: [],
        page: 1
      };
    case UPDATE_ARTICLE_LOADING:
      return {
        ...state,
        update_loading: true
      };
    case DELETE_ARTICLE:
      return {
        ...state,
        delete_loading: false,
        articles: []
      };
    case DELETE_ARTICLE_LOADING:
      return {
        ...state,
        delete_loading: true
      };
    case GET_TAGS:
      return {
        ...state,
        tags: action.payload
      };
    case GET_INIT_ARTICLES:
      return {
        ...state,
        articles: action.payload.articles,
        totalPages: action.payload.pages,
        init_loading: false,
        update_loading: false,
        loading: false,
        scrolling: false
      };
    case GET_SEARCH_ARTICLES:
      return {
        ...state,
        articles: action.payload.articles,
        totalPages: action.payload.pages,
        count: action.payload.count,
        init_loading: false,
        update_loading: false,
        loading: false,
        scrolling: false
      };
    case GET_ARTICLE:
      return {
        ...state,
        article: action.payload,
        init_loading: false,
        update_loading: false
      };
    case GET_MORE_ARTICLES:
      return {
        ...state,
        articles: [...state.articles, ...action.payload],
        loading: false,
        scrolling: false
      };
    case INIT_ARTICLES_LOADING:
      return {
        ...state,
        article: {},
        update_loading: false,
        delete_loading: false,
        loading: false,
        init_loading: true
      };
    case ARTICLES_LOADING:
      return {
        ...state,
        loading: true
      };
    case UPDATE_PAGE_ART:
      return {
        ...state,
        page: action.payload,
        scrolling: true
      };
    default:
      return state;
  }
}
