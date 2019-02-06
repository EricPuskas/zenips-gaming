// Dependencies
import React, { Component } from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { loadModal } from "../../../../actions/modalActions";
import {
  isReadChange,
  moveMessages,
  deleteSelected
} from "../../../../actions/messagesActions";

class Message extends Component {
  constructor() {
    super();
    this.state = {
      selected: false,
      isRead: false
    };
  }
  componentDidMount() {
    if (this.props.checkAll === true) {
      this.props.addMsgToArray(this.props.message._id);
      this.setState({ selected: true });
    }
    this.setState({ isRead: this.props.message.isRead });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.checkAll !== this.props.checkAll) {
      this.setState(() => ({ selected: this.props.checkAll }));
    }
    if (prevProps.message.isRead !== this.props.message.isRead) {
      this.setState(() => ({ isRead: this.props.message.isRead }));
    }
  }

  toggleSelected = id => {
    if (this.state.selected === false) {
      this.props.addMsgToArray(id);
      this.setState({ selected: true });
    } else if (this.state.selected === true) {
      this.props.removeMsgFromArray(id);
      this.setState({ selected: false });
    }
  };

  markAsUnread = id => {
    let data = {
      isRead: false,
      location: this.props.message.location
    };
    this.setState({ isRead: false });
    this.props.isReadChange(id, data);
  };

  markAsRead = id => {
    let data = {
      isRead: true,
      location: this.props.message.location
    };
    this.setState({ isRead: true });
    this.props.isReadChange(id, data);
  };

  deleteMessage = id => {
    let data = {
      messages: [id]
    };
    this.props.deleteSelected(data, this.props.message.location);
  };

  moveMessage = id => {
    let data = {
      messages: [id]
    };
    if (this.props.message.location === "archive") {
      this.props.moveMessages(data, "inbox");
    } else {
      this.props.moveMessages(data, "archive");
    }
  };

  TriggerOpenMessage = (id, props) => {
    this.props.loadModal("MESSAGE", props);
    if (this.state.isRead === false) {
      let data = {
        isRead: true,
        location: this.props.message.location
      };
      setTimeout(() => {
        this.props.isReadChange(id, data);
        this.setState({ isRead: true });
      }, 400);
    }
  };

  render() {
    const { message } = this.props;
    let name = message.sender.name;
    let subject = message.subject;
    if (message.subject.length > 100) subject += "...";
    let circle;
    let MSG_PROPS = {
      width: "60%",
      left: "20%",
      markAsUnread: this.markAsUnread,
      markAsRead: this.markAsRead,
      moveMessage: this.moveMessage,
      deleteMessage: this.deleteMessage,
      message
    };

    this.state.isRead
      ? (circle = "")
      : (circle = <div className="blue-circle" />);

    let subjectClass = classNames({
      "message-subject": true,
      "msg-subj-isread": this.state.isRead
    });

    let senderClass = classNames({
      "message-sender": true,
      "msg-sender-isread": this.state.isRead
    });

    let dateClass = classNames({
      "message-date": true,
      "msg-date-isread": this.state.isRead
    });

    return (
      <div className="message-item">
        <div className="message-check">
          <input
            type="checkbox"
            value={message._id}
            name="message"
            checked={this.state.selected}
            onChange={() => this.toggleSelected(message._id)}
            className="msg-chck"
          />
        </div>
        <div
          onClick={() => this.TriggerOpenMessage(message._id, MSG_PROPS)}
          className="message-box-1"
        >
          {circle}
          <div className={senderClass}>{name}</div>
        </div>
        <div
          onClick={() => this.TriggerOpenMessage(message._id, MSG_PROPS)}
          className="message-box-2"
        >
          <div
            className={subjectClass}
            onClick={() => this.TriggerOpenMessage(message._id, MSG_PROPS)}
          >
            <h1>{subject}</h1>
          </div>
        </div>
        <div
          className="message-box-3"
          onClick={() => this.TriggerOpenMessage(message._id, MSG_PROPS)}
        >
          <span className={dateClass}>
            <Moment fromNow>{message.createdAt}</Moment>
          </span>
        </div>
      </div>
    );
  }
}

Message.propTypes = {
  messages: PropTypes.object.isRequired,
  loadModal: PropTypes.func.isRequired,
  isReadChange: PropTypes.func.isRequired,
  moveMessages: PropTypes.func.isRequired,
  deleteSelected: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  messages: state.messages
});

export default connect(
  mapStateToProps,
  { loadModal, isReadChange, moveMessages, deleteSelected }
)(Message);
