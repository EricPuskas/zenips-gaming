import { GET_ERRORS, ERROR_LOADING, CLEAR_ERRORS } from "../actions/types";
const initialState = {
  error: "",
  error_loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return {
        error: action.payload,
        error_loading: false
      };
    case ERROR_LOADING:
      return {
        ...state,
        error_loading: true
      };
    case CLEAR_ERRORS:
      return initialState;
    default:
      return state;
  }
}
