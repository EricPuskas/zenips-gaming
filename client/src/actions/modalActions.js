import { SHOW_MODAL, HIDE_MODAL } from "./types";

export const loadModal = (type, props) => {
  return {
    type: SHOW_MODAL,
    payload: { type, props }
  };
};

export const hideModal = () => {
  return {
    type: HIDE_MODAL
  };
};
