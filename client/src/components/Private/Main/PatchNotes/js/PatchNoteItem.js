// Dependencies
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Moment from "react-moment";
import Parser from "html-react-parser";
// Actions
import { deletePatchNote } from "../../../../../actions/patchNotesActions";
import { loadModal } from "../../../../../actions/modalActions";
// Utilities
import ytOptimizer from "../../../../../utils/ytOptimizer";

class PatchNoteItem extends Component {
  componentDidMount() {
    ytOptimizer();
  }

  render() {
    const { patch_note } = this.props;
    const { user } = this.props.auth;
    let content = Parser(patch_note.content);
    let id = patch_note._id;
    let title = patch_note.title;
    let patch_notes_user = patch_note.name;

    let MODAL_PROPS = {
      id,
      title,
      user: patch_notes_user,
      width: "30%",
      left: "36%",
      top: "10%",
      submitForm: this.props.deletePatchNote,
      header: "Delete Patch Note",
      message: "Are you sure you want to delete this patch note?",
      success: "Patch Note has been deleted."
    };
    return (
      <li className="timeline-inverted">
        <div className="timeline-badge">
          <span>
            <Moment format="MMM DD, YYYY">{patch_note.createdAt}</Moment>
          </span>
        </div>
        <div className="timeline-panel dark-background">
          <div className="timeline-heading center-on-mobile">
            <small className="user-info-post">
              <img
                src={patch_note.avatar}
                alt="User avatar"
                className="user-post-avatar"
              />
              <span id="user-post-username">{patch_note.name}</span>
              <span id="user-post-time">
                <i className="far fa-clock" />
                <Moment format="MMMM DD, YYYY h:mm A">
                  {patch_note.createdAt}
                </Moment>
              </span>
            </small>
            {user._id === patch_note.user || user.role.includes("Developer") ? (
              <div className="timeline-buttons text-center">
                <Link
                  className="btn btn-green-d"
                  to={`/dashboard/patchnotes/${patch_note._id}/edit`}
                >
                  <i className="far fa-edit" /> Edit
                </Link>
                <button
                  className="btn btn-red-c"
                  onClick={() =>
                    this.props.loadModal("PATCH_NOTES_MODAL", MODAL_PROPS)
                  }
                >
                  <i className="fas fa-trash-alt" /> Delete
                </button>
              </div>
            ) : (
              ""
            )}
            <hr />
            <h3 className="timeline-title text-center">{patch_note.title}</h3>
            <hr />
          </div>
          <div className="timeline-body">{content}</div>
        </div>
      </li>
    );
  }
}

PatchNoteItem.propTypes = {
  patch_notes: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deletePatchNote: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  patch_notes: state.patch_notes
});

export default connect(
  mapStateToProps,
  { deletePatchNote, loadModal }
)(PatchNoteItem);
