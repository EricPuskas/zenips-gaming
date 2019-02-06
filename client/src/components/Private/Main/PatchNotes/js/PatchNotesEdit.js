// Dependencies
import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
// Actions
import {
  updatePatchNote,
  getPatchNote
} from "../../../../../actions/patchNotesActions";
// Utilities
import isEmpty from "../../../../../utils/isEmpty";
// Components
import LoaderSuccess from "../../../../Common/Loader/LoaderSuccess";
import LoaderLarge from "../../../../Common/Loader/LoaderLarge";
import PatchNotesForm from "./PatchNotesForm";

class PatchNotesEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      content: "",
      errors: {}
    };
  }

  componentDidMount() {
    document.title = "Zenips Gaming | Update Post";
    this.props.getPatchNote(this.props.match.params.id);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.errors !== this.props.errors) {
      this.setState(() => ({ errors: this.props.errors }));
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.patch_notes.patch_note) {
      const patch_note = nextProps.patch_notes.patch_note;

      patch_note.title = !isEmpty(patch_note.title) ? patch_note.title : "";
      patch_note.content = !isEmpty(patch_note.content)
        ? patch_note.content
        : "";

      this.setState({
        title: patch_note.title,
        content: patch_note.content
      });
    }
  }

  submitForm = event => {
    event.preventDefault();
    let id = this.props.match.params.id;
    const data = {
      title: this.state.title,
      content: this.state.content
    };
    this.props.updatePatchNote(id, data, this.props.history);
  };

  changeInput = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  changeContent = content => {
    this.setState({ content });
  };

  goBack = () => {
    this.props.history.goBack();
  };

  render() {
    const { update_loading, loading, patch_note } = this.props.patch_notes;
    const { error } = this.state.errors;
    const { title, content } = this.state;
    let { expandContent } = this.props;
    let patch_notes_form;
    let mainContainer = classNames({
      "main-container": true,
      minContent: expandContent,
      maxContent: !expandContent
    });

    if (
      patch_note === null ||
      loading ||
      Object.keys(patch_note).length === 0
    ) {
      patch_notes_form = <LoaderLarge msg={"Loading Content. Please wait."} />;
    } else {
      patch_notes_form = (
        <PatchNotesForm
          error={error}
          changeContent={this.changeContent}
          changeInput={this.changeInput}
          submitForm={this.submitForm}
          title={title}
          action="update"
          content={content}
          goBack={this.goBack}
        />
      );
    }

    if (update_loading === true) {
      patch_notes_form = (
        <LoaderSuccess
          msg={"The patch notes have been updated."}
          top="25vh"
          left="-5%"
        />
      );
    }

    return <div className={mainContainer}>{patch_notes_form}</div>;
  }
}

PatchNotesEdit.propTypes = {
  patch_notes: PropTypes.object.isRequired,
  updatePatchNote: PropTypes.func.isRequired,
  getPatchNote: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  patch_notes: state.patch_notes
});

export default connect(
  mapStateToProps,
  { updatePatchNote, getPatchNote }
)(withRouter(PatchNotesEdit));
