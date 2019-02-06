import { SHOW_MODAL, HIDE_MODAL } from "../actions/types";

/** Initial State */
const initialState = {
  type: null,
  props: {}
};

/** Modal reducer */
export default function(state = initialState, action) {
  switch (action.type) {
    case SHOW_MODAL:
      return {
        type: action.payload.type,
        props: action.payload.props
      };
    case HIDE_MODAL:
      return initialState;
    default:
      return state;
  }
}
