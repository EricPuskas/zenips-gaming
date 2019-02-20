import React, { Component } from "react";
import { connect } from "react-redux";
import classNames from "classnames";
// Actions
import {
  getTags,
  deleteTags,
  addTag,
  clearErrors
} from "../../../../actions/articleActions";
import Tag from "./js/Tag";
import InputGroup from "../../../Common/InputGroup";
import "./css/Tags.css";

class Tags extends Component {
  constructor() {
    super();
    this.state = {
      selected: [],
      tag: "",
      tags: [],
      initMount: true,
      errors: {}
    };
  }
  componentDidMount() {
    this.props.clearErrors();
    window.addEventListener("keydown", this.listenKeyboard, false);
    document.title = "Tags | Dashboard";
    this.props.getTags();
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.listenKeyboard, false);
  }

  listenKeyboard = event => {
    event.stopPropagation();
    if (event.which === 13 || event.keyCode === 13) {
      this.submitForm();
      this.setState({ tag: "" });
    }
  };

  static getDerivedStateFromProps(nextProps) {
    if (nextProps.errors) {
      return { errors: nextProps.errors };
    } else if (nextProps.articles.tags) {
      return { tags: nextProps.articles.tags };
    } else return null;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.errors !== this.props.errors) {
      this.setState(() => ({ errors: this.props.errors }));
    }
    if (prevProps.articles.tags !== this.props.articles.tags) {
      this.setState(() => ({ tags: this.props.articles.tags }));
    }
  }

  addTagToArray = tag_id => {
    this.setState(prevState => ({
      selected: [...prevState.selected, tag_id],
      initMount: false
    }));
  };

  removeTagFromArray = tag_id => {
    this.setState({
      selected: this.state.selected.filter(tag => tag !== tag_id)
    });
  };

  deleteSelected = () => {
    let data = {
      tags: this.state.selected
    };
    this.props.clearErrors();
    this.setState({ selected: [] });
    this.props.deleteTags(data);
  };

  changeInput = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  submitForm = () => {
    this.props.clearErrors();
    const data = {
      name: this.state.tag
    };
    this.props.addTag(data);
    this.props.clearErrors();
  };
  render() {
    const { expandContent } = this.props;
    const { error } = this.state.errors;
    const tagsArr = this.state.tags;

    const AllTags = tagsArr.map(tag => (
      <Tag
        key={tag._id}
        removeTagFromArray={this.removeTagFromArray}
        addTagToArray={this.addTagToArray}
        tag={tag}
      />
    ));
    let mainContainer = classNames({
      "main-container": true,
      minContent: expandContent,
      maxContent: !expandContent
    });
    let DelBtn;
    this.state.selected.length > 0 && this.state.initMount === false
      ? (DelBtn = (
          <div className="fadeInEnd-quick-simple">
            <button
              className="btn btn-red-c"
              onClick={() => this.deleteSelected()}
            >
              Delete Selected
            </button>
          </div>
        ))
      : (DelBtn = (
          <div className="fadeOutEnd-quick-simple">
            <button className="btn btn-red-c">Delete Selected</button>
          </div>
        ));
    if (this.state.initMount === true) {
      DelBtn = "";
    }
    return (
      <div className={mainContainer}>
        <div className="row">
          <div className="col-12 col-lg-3 col-xl-3 center-div text-center">
            <h1>
              <i className="fas fa-tags" /> All Tags
            </h1>
            <div>{AllTags}</div>
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-lg-3 col-xl-3 center-div text-center newTag-input">
            <InputGroup
              placeholder="Tag Name"
              name="tag"
              type="text"
              value={this.state.tag}
              icon="fas fa-tag"
              profileFormGroup={true}
              onChange={this.changeInput}
              error={error.tags}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-lg-3 col-xl-3 center-div text-center">
            <div>{DelBtn}</div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  articles: state.articles,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addTag, getTags, deleteTags, clearErrors }
)(Tags);
