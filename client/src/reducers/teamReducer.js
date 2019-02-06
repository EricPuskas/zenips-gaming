import {
  GET_TEAM_MEMBERS,
  TEAM_LOADING,
  DELETE_TEAM_MEMBER,
  INIT_TEAM_LOADING,
} from "../actions/types";

const initialState = {
  members: [],
  loading: false,
  init_loading: false,
  delete_loading: false,
  update_loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_TEAM_MEMBERS:
      return {
        ...state,
        members: action.payload,
        init_loading: false,
        update_loading: false,
        delete_loading: false,
        loading: false
      };
    case INIT_TEAM_LOADING:
      return {
        ...state,
        update_loading: false,
        delete_loading: false,
        loading: false,
        init_loading: true
      };
    case TEAM_LOADING:
      return {
        ...state,
        update_loading: false,
        delete_loading: false,
        loading: true,
        init_loading: false
      };
    case DELETE_TEAM_MEMBER:
      return {
        ...state,
        members: state.members.filter(member => member._id !== action.payload)
      };
    default:
      return state;
  }
}
