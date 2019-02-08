// Dependencies //
import React from "react";
import { connect } from "react-redux";

// Modal Components //
import BioModal from "./BioModal/BioModal";
import PostModal from "./PostModal/PostModal";
import PatchNotesModal from "./PatchNotesModal/PatchNotesModal";
import AvatarModal from "./AvatarModal/AvatarModal";
import DelAccModal from "./DelAccModal/DelAccModal";
import ChangePwModal from "./ChangePwModal/ChangePwModal";
import DescriptionModal from "./DescriptionModal/DescriptionModal";
import ThumbnailModal from "./ThumbnailModal/ThumbnailModal";
import CreditsModal from "./CreditsModal/CreditsModal";
import ArticleDeleteModal from "./ArticleDeleteModal/ArticleDeleteModal";
import MessagesDeleteModal from "./MessagesDeleteModal/MessagesDeleteModal";
import Toolbox from "./Toolbox/Toolbox";
import Message from "./Message/Message";
import UpdateModal from "./UpdateModal/UpdateModal";

const MODAL_COMPONENTS = {
  BIO_MODAL: BioModal,
  POST_MODAL: PostModal,
  PATCH_NOTES_MODAL: PatchNotesModal,
  AVATAR_MODAL: AvatarModal,
  DELETE_ACCOUNT_MODAL: DelAccModal,
  CHANGE_PW_MODAL: ChangePwModal,
  DESCRIPTION_MODAL: DescriptionModal,
  THUMBNAIL_MODAL: ThumbnailModal,
  CREDITS_MODAL: CreditsModal,
  ARTICLE_DEL_MODAL: ArticleDeleteModal,
  MSG_DEL_MODAL: MessagesDeleteModal,
  TOOLBOX: Toolbox,
  MESSAGE: Message,
  UPDATE_MODAL: UpdateModal
};

const ModalContainer = props => {
  if (!props.modal.type) {
    return null;
  }

  const SpecificModal = MODAL_COMPONENTS[props.modal.type];
  return <SpecificModal props={props.modal.props} />;
};

const mapStateToProps = state => ({
  modal: state.modal
});

export default connect(mapStateToProps)(ModalContainer);
