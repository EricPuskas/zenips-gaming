import React from "react";

const Footer = ({
  location,
  moveMessage,
  deleteMessage,
  id,
  isRead,
  onCloseModal,
  toggleRead
}) => {
  let mark_btn, move_btn;
  isRead === true
    ? (mark_btn = (
        <button className="btn btn-green-d" onClick={() => toggleRead(id)}>
          <i className="fas fa-eye-slash" /> Mark as Unread
        </button>
      ))
    : (mark_btn = (
        <button className="btn btn-green-d" onClick={() => toggleRead(id)}>
          <i className="fas fa-eye" /> Mark as Read
        </button>
      ));
  location === "archive"
    ? (move_btn = (
        <button className="btn btn-yellow-c" onClick={() => moveMessage(id)}>
          <i className="fas fa-inbox" /> Move to Inbox
        </button>
      ))
    : (move_btn = (
        <button className="btn btn-yellow-c" onClick={() => moveMessage(id)}>
          <i className="fas fa-archive" /> Archive
        </button>
      ));
  return (
    <div className="modal-footer-bio text-center">
      {mark_btn}
      {move_btn}
      <button className="btn btn-red-c" onClick={() => deleteMessage(id)}>
        <i className="fas fa-trash-alt" /> Delete
      </button>
    </div>
  );
};

export default Footer;
