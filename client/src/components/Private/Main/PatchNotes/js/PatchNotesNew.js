// Dependencies
import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
// Actions
import {
  createPatchNote,
  clearErrors
} from "../../../../../actions/patchNotesActions";

// Components
import LoaderSuccess from "../../../../Common/Loader/LoaderSuccess";
import PatchNotesForm from "./PatchNotesForm";

class PatchNotesNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      content: "",
      errors: {}
    };
  }

  componentDidMount() {
    document.title = "Zenips Gaming | New Patch";
    this.props.clearErrors();
  }

  static getDerivedStateFromProps(nextProps) {
    if (nextProps.errors) {
      return { errors: nextProps.errors };
    } else return null;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.errors !== this.props.errors) {
      this.setState(() => ({ errors: this.props.errors }));
    }
  }

  submitForm = event => {
    event.preventDefault();
    const data = {
      title: this.state.title,
      content: this.state.content
    };
    this.props.createPatchNote(data, this.props.history);
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
    const { patch_notes, loading } = this.props.patch_notes;
    const { error } = this.props.errors;
    const { title, content } = this.state;
    let patch_notes_form;
    let { expandContent } = this.props;
    let mainContainer = classNames({
      "main-container": true,
      minContent: expandContent,
      maxContent: !expandContent
    });

    patch_notes === null || loading
      ? (patch_notes_form = (
          <LoaderSuccess msg={"Data has been saved."} top="25vh" left="-5%" />
        ))
      : (patch_notes_form = (
          <PatchNotesForm
            error={error}
            changeContent={this.changeContent}
            changeInput={this.changeInput}
            submitForm={this.submitForm}
            title={title}
            action="create"
            content={content}
            goBack={this.goBack}
          />
        ));
    return <div className={mainContainer}>{patch_notes_form}</div>;
  }
}

PatchNotesNew.propTypes = {
  patch_notes: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  createPatchNote: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  patch_notes: state.patch_notes
});

export default connect(
  mapStateToProps,
  { createPatchNote, clearErrors }
)(withRouter(PatchNotesNew));
