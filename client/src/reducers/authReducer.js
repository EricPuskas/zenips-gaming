import {
  SET_CURRENT_USER,
  GET_USER_INFO,
  REGISTER_USER_LOADING,
  CREATE_NEW_USER
} from "../actions/types";
import isEmpty from "../utils/isEmpty";

const initialState = {
  isAuthenticated: false,
  loading: false,
  user: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        loading: false,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    case GET_USER_INFO:
      return {
        ...state,
        loading: false,
        user: action.payload
      };
    case REGISTER_USER_LOADING:
      return {
        ...state,
        loading: true
      };
    case CREATE_NEW_USER:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
}
