import { GET_VIDEOS, INIT_LOADING_VIDEOS } from "../actions/types";
const initialState = {
  videos: [],
  init_loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_VIDEOS:
      return {
        videos: action.payload,
        init_loading: false
      };
    case INIT_LOADING_VIDEOS:
      return {
        ...state,
        init_loading: true
      };
    default:
      return state;
  }
}
