import { combineReducers } from "redux";
import authReducer from "./authReducer";
import postReducer from "./postReducer";
import patchNotesReducer from "./patchNotesReducer";
import teamReducer from "./teamReducer";
import memberReducer from "./memberReducer";
import modalReducer from "./modalReducer";
import articleReducer from "./articleReducer";
import messagesReducer from "./messagesReducer";
import videoReducer from "./videoReducer";
import settingsReducer from "./settingsReducer";
import errorReducer from "./errorReducer";

export default combineReducers({
  auth: authReducer,
  messages: messagesReducer,
  articles: articleReducer,
  videos: videoReducer,
  settings: settingsReducer,
  posts: postReducer,
  patch_notes: patchNotesReducer,
  team: teamReducer,
  member: memberReducer,
  modal: modalReducer,
  errors: errorReducer
});
