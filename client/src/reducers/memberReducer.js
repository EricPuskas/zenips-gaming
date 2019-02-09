import {
  UPDATE_TEAM_MEMBER_INFO,
  UPDATE_TEAM_MEMBER_LOADING,
  UPDATE_MEMBER_AVATAR,
  GET_TEAM_MEMBER,
  TEAM_LOADING,
  DELETE_TEAM_MEMBER_LOADING,
  SEND_RESET_PW_EMAIL,
  SEND_EMAIL_LOADING,
  STOP_EMAIL_LOADING,
  RESET_PW_SUCCESS,
  UPDATE_PASSWORD,
  GET_USER_INIT_POSTS,
  UPDATE_PAGE_UP,
  GET_MORE_USER_POSTS,
  USER_POSTS_LOADING,
  DELETE_USER_POST,
  GET_USER_INIT_PATCH_NOTES,
  UPDATE_PAGE_UPA,
  GET_MORE_USER_PATCH_NOTES,
  USER_PATCH_NOTES_LOADING,
  DELETE_USER_PATCH_NOTES,
  GET_USER_INIT_ARTICLES,
  UPDATE_PAGE_UART,
  GET_MORE_USER_ARTICLES,
  USER_ARTICLES_LOADING
} from "../actions/types";

const initialState = {
  member: {},
  posts: {
    posts: [],
    per: 3,
    page: 1,
    count: 0,
    totalPages: null,
    scrolling: false,
    loading: false,
    delete_loading: false
  },
  patch_notes: {
    patch_notes: [],
    per: 3,
    page: 1,
    count: 0,
    totalPages: null,
    scrolling: false,
    loading: false,
    delete_loading: false
  },
  articles: {
    articles: [],
    per: 2,
    page: 1,
    count: 0,
    totalPages: null,
    scrolling: false,
    loading: false,
    delete_loading: false
  },
  reset_pw: false,
  sending_email: false,
  loading: false,
  init_loading: false,
  delete_loading: false,
  update_loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_USER_INIT_POSTS:
      return {
        ...state,
        posts: {
          ...state.posts,
          posts: action.payload.posts,
          totalPages: action.payload.pages,
          count: action.payload.count,
          scrolling: false,
          init_loading: false
        }
      };
    case GET_USER_INIT_PATCH_NOTES:
      return {
        ...state,
        patch_notes: {
          ...state.patch_notes,
          patch_notes: action.payload.patch_notes,
          totalPages: action.payload.pages,
          count: action.payload.count,
          scrolling: false,
          init_loading: false
        }
      };
    case GET_USER_INIT_ARTICLES:
      return {
        ...state,
        articles: {
          ...state.articles,
          articles: action.payload.articles,
          totalPages: action.payload.pages,
          count: action.payload.count,
          scrolling: false,
          init_loading: false
        }
      };
    case DELETE_USER_POST:
      return {
        ...state,
        posts: {
          ...state.posts,
          posts: state.posts.posts.filter(post => post._id !== action.payload)
        }
      };
    case DELETE_USER_PATCH_NOTES:
      return {
        ...state,
        patch_notes: {
          ...state.patch_notes,
          patch_notes: state.patch_notes.patch_notes.filter(
            patch_note => patch_note._id !== action.payload
          )
        }
      };
    case GET_MORE_USER_POSTS:
      return {
        ...state,
        posts: {
          ...state.posts,
          loading: false,
          scrolling: false,
          posts: [...state.posts.posts, ...action.payload]
        }
      };
    case GET_MORE_USER_PATCH_NOTES:
      return {
        ...state,
        patch_notes: {
          ...state.patch_notes,
          loading: false,
          scrolling: false,
          patch_notes: [...state.patch_notes.patch_notes, ...action.payload]
        }
      };
    case GET_MORE_USER_ARTICLES:
      return {
        ...state,
        articles: {
          ...state.articles,
          loading: false,
          scrolling: false,
          articles: [...state.articles.articles, ...action.payload]
        }
      };
    case USER_POSTS_LOADING:
      return {
        ...state,
        posts: {
          ...state.posts,
          loading: false
        }
      };
    case USER_PATCH_NOTES_LOADING:
      return {
        ...state,
        patch_notes: {
          ...state.patch_notes,
          loading: false
        }
      };
    case USER_ARTICLES_LOADING:
      return {
        ...state,
        articles: {
          ...state.articles,
          loading: false
        }
      };
    case UPDATE_PAGE_UP:
      return {
        ...state,
        posts: {
          ...state.posts,
          scrolling: true,
          page: action.payload
        }
      };
    case UPDATE_PAGE_UPA:
      return {
        ...state,
        patch_notes: {
          ...state.patch_notes,
          scrolling: true,
          page: action.payload
        }
      };
    case UPDATE_PAGE_UART:
      return {
        ...state,
        articles: {
          ...state.articles,
          scrolling: true,
          page: action.payload
        }
      };
    case SEND_RESET_PW_EMAIL:
      return {
        ...state,
        sending_email: false,
        reset_pw: false
      };
    case UPDATE_PASSWORD:
      return {
        ...state,
        sending_email: false,
        reset_pw: false
      };
    case SEND_EMAIL_LOADING:
      return {
        ...state,
        reset_pw: false,
        sending_email: true
      };
    case TEAM_LOADING:
      return {
        ...state,
        update_loading: false,
        delete_loading: false,
        loading: true,
        init_loading: false
      };
    case STOP_EMAIL_LOADING:
      return {
        ...state,
        sending_email: false
      };
    case RESET_PW_SUCCESS:
      return {
        ...state,
        sending_email: false,
        reset_pw: true
      };
    case GET_TEAM_MEMBER:
      return {
        ...state,
        member: action.payload,
        init_loading: false,
        update_loading: false,
        loading: false
      };
    case UPDATE_TEAM_MEMBER_INFO:
      return {
        ...state,
        init_loading: false,
        update_loading: false,
        loading: false
      };
    case UPDATE_MEMBER_AVATAR:
      return {
        ...state,
        member: action.payload
      };
    case UPDATE_TEAM_MEMBER_LOADING:
      return {
        ...state,
        update_loading: true
      };
    case DELETE_TEAM_MEMBER_LOADING:
      return {
        ...state,
        delete_loading: true
      };
    default:
      return state;
  }
}
