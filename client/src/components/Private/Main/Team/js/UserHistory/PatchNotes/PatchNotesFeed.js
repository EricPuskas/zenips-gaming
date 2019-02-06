// Dependencies
import React, { Component } from "react";
import PropTypes from "prop-types";
// Utilities
import isEmpty from "../../../../../../../utils/isEmpty";
// Components
import PatchNotesItem from "./PatchNotesItem";

class PatchNotesFeed extends Component {
  render() {
    const { patch_notes } = this.props;
    const AllPatchNotes = patch_notes.map(patch_note => (
      <PatchNotesItem key={patch_note._id} patch_note={patch_note} />
    ));

    let content;
    isEmpty(patch_notes)
      ? (content = "")
      : (content = <ul className="timeline">{AllPatchNotes}</ul>);
    return content;
  }
}

PatchNotesFeed.propTypes = {
  patch_notes: PropTypes.array.isRequired
};

export default PatchNotesFeed;
