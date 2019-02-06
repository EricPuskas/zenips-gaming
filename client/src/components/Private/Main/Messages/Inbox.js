// Dependencies
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classNames from "classnames";
import "./Messages.css";
// Actions
import {
  getInitMessages,
  getMoreMessages,
  moveMessages,
  deleteSelected
} from "../../../../actions/messagesActions";
import { loadModal } from "../../../../actions/modalActions";
// Components
import Message from "./Message";
import LoaderLarge from "../../../Common/Loader/LoaderLarge";
import LoaderSmall from "../../../Common/Loader/LoaderSmall";
import LoaderSuccess from "../../../Common/Loader/LoaderSuccess";
import ScrollToTop from "../../../Common/ScrollToTop/ScrollToTop";

class Inbox extends Component {
  constructor() {
    super();
    this.state = {
      hideScrollTopButton: true,
      checkAll: false,
      initMount: true,
      selected: []
    };
  }

  componentDidMount() {
    document.title = "Zenips Gaming | Inbox";
    const { per, page } = this.props.messages;
    this.props.getInitMessages(per, page, "inbox");
  }

  addMsgToArray = msg_id => {
    this.setState(prevState => ({
      selected: [...prevState.selected, msg_id],
      initMount: false
    }));
  };

  removeMsgFromArray = msg_id => {
    this.setState({
      selected: this.state.selected.filter(msg => msg !== msg_id)
    });
  };

  toggleSelectAll = messages => {
    if (this.state.checkAll === false) {
      this.setState({ checkAll: true });
      messages.forEach(message => {
        if (this.state.selected.indexOf(message._id) === -1)
          this.addMsgToArray(message._id);
      });
    } else {
      this.setState({ checkAll: false, selected: [] });
    }
  };

  handleScroll = (scrolling, totalPages, page, per) => {
    const container = document.getElementById("container");
    const offset = document.getElementById("offset");
    const target = document.getElementById("target");
    if (container && offset && target) {
      container.scrollTop <= 1100 &&
        container.scrollTop > 400 &&
        this.setState({ hideScrollTopButton: false });

      container.scrollTop <= 400 &&
        container.scrollTop >= 100 &&
        this.setState({ hideScrollTopButton: true });

      if (scrolling) return;
      if (totalPages <= page) return;

      const targetOffset = target.offsetTop;
      const containerOffset = container.offsetTop + container.clientHeight;
      const pageOffset = container.scrollTop + offset.offsetTop;

      let result = pageOffset + containerOffset;
      if (result > targetOffset + (container.offsetTop - container.scrollTop)) {
        this.props.getMoreMessages(per, page + 1, "inbox");
      }
    }
  };

  moveMessages = () => {
    this.setState({ selected: [], checkAll: false });
    let data = {
      messages: this.state.selected
    };
    this.props.moveMessages(data, "archive");
  };

  deleteSelected = data => {
    this.setState({ selected: [], checkAll: false });
    this.props.deleteSelected(data, "inbox");
  };

  render() {
    const container = document.getElementById("container");
    const { expandContent } = this.props;
    const {
      scrolling,
      totalPages,
      page,
      per,
      loading,
      init_loading,
      update_loading,
      messages
    } = this.props.messages;
    let main, endLoad, loader_icon;

    const AllMessages = messages.map(message => (
      <Message
        key={message._id}
        selected={this.state.selected}
        message={message}
        checkAll={this.state.checkAll}
        addMsgToArray={this.addMsgToArray}
        removeMsgFromArray={this.removeMsgFromArray}
        handleCheckbox={this.handleCheckbox}
      />
    ));

    let content;
    messages === null || init_loading
      ? (content = <LoaderLarge msg={"Loading messages..."} margin="5vh" />)
      : (content = AllMessages);

    let mainContainer = classNames({
      "main-container": true,
      minContent: expandContent,
      maxContent: !expandContent
    });

    if (update_loading)
      content = <LoaderSuccess msg={"Moved to archive."} margin="5vh" />;

    if (totalPages === page && page > 1 && !loading) {
      endLoad = <div className="fadeInEnd">You've reached the end.</div>;
    }

    loading ? (loader_icon = <LoaderSmall />) : (loader_icon = "");

    let message_text;
    this.state.selected.length > 1
      ? (message_text = "messages")
      : (message_text = "message");

    let MODAL_PROPS = {
      data: {
        messages: this.state.selected
      },
      width: "40%",
      left: "30%",
      submitForm: this.deleteSelected,
      header: `You are about to permanently delete ${
        this.state.selected.length
      } ${message_text}.`,
      success: "All items have been deleted."
    };

    let show_selected;
    this.state.selected.length > 0
      ? (show_selected = (
          <small className="fadeIn-msg msg-version-selected">
            {this.state.selected.length} selected.
          </small>
        ))
      : (show_selected = (
          <small className="fadeOut-msg msg-version-selected">
            {this.state.selected.length} selected.
          </small>
        ));

    if (this.state.initMount === true) show_selected = "";

    main = (
      <div className="messages-container">
        <div className="col-12 reset-padding">
          <div className="messages-controls">
            <div className="select-all-chck">
              <input
                type="checkbox"
                checked={this.state.checkAll}
                onChange={() => this.toggleSelectAll(messages)}
              />
            </div>
            {show_selected}
            <div className="text-center messages-btn-group">
              <button
                disabled={!(this.state.selected.length > 0)}
                type="button"
                onClick={() => this.moveMessages()}
                className="btn btn-yellow-c"
              >
                <i className="fas fa-archive" /> Archive
              </button>
              <button
                disabled={!(this.state.selected.length > 0)}
                className="btn btn-red-c"
                onClick={() =>
                  this.props.loadModal("MSG_DEL_MODAL", MODAL_PROPS)
                }
              >
                <i className="fas fa-trash-alt" /> Delete
              </button>
            </div>
          </div>
        </div>
        <div className="col-12">
          <div
            id="container"
            onScroll={() => this.handleScroll(scrolling, totalPages, page, per)}
            className="messages-content"
          >
            {content}
          </div>
        </div>
      </div>
    );

    return (
      <div className={mainContainer}>
        <div id="offset">
          <div className="row">
            <div className="col-12">
              {main}
              {loader_icon}
            </div>
          </div>
          {endLoad}
          <div id="target">
            <ScrollToTop
              hideScrollTopButton={this.state.hideScrollTopButton}
              container={container}
              scrollStepInPx="50"
              delayInMs="5"
            />
          </div>
        </div>
      </div>
    );
  }
}

Inbox.propTypes = {
  messages: PropTypes.object.isRequired,
  getInitMessages: PropTypes.func.isRequired,
  getMoreMessages: PropTypes.func.isRequired,
  deleteSelected: PropTypes.func.isRequired,
  loadModal: PropTypes.func.isRequired,
  moveMessages: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  messages: state.messages
});

export default connect(
  mapStateToProps,
  {
    getInitMessages,
    deleteSelected,
    getMoreMessages,
    moveMessages,
    loadModal
  }
)(Inbox);
