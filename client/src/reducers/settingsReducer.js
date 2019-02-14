import {
  GET_ABOUT,
  GET_PRIVACY,
  GET_TERMS,
  GET_COOKIES,
  INIT_LOADING
} from "../actions/types";
const initialState = {
  about: {},
  privacy_policy: {},
  terms_of_use: {},
  cookies: {},
  init_loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ABOUT:
      return {
        ...state,
        init_loading: false,
        about: action.payload
      };
    case GET_PRIVACY:
      return {
        ...state,
        init_loading: false,
        privacy_policy: action.payload
      };
    case GET_TERMS:
      return {
        ...state,
        init_loading: false,
        terms_of_use: action.payload
      };
    case GET_COOKIES:
      return {
        ...state,
        init_loading: false,
        cookies: action.payload
      };
    case INIT_LOADING:
      return {
        ...state,
        init_loading: true
      };
    default:
      return state;
  }
}
