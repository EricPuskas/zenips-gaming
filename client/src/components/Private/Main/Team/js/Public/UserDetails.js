import React from "react";
import Moment from "react-moment";

const UserDetails = ({ member }) => {
  return (
    <ul className="profile-info-box">
      <li className="profile-info">
        <strong>
          <i className="fas fa-certificate" /> Role:{" "}
        </strong>
        <button className="btn btn-primary pull-right">{member.role}</button>
      </li>
      <li className="profile-info">
        <strong>
          <i className="fas fa-user" /> Username:{" "}
        </strong>
        <span>{member.username}</span>
      </li>
      <li className="profile-info">
        <strong>
          <i className="far fa-envelope" /> Email:{" "}
        </strong>
        <span>{member.email}</span>
      </li>
      <li className="profile-info">
        <strong>
          <i className="far fa-calendar-alt" /> Joined:{" "}
        </strong>
        <span>
          <Moment format="MMM DD, YYYY">{member.joined}</Moment>
        </span>
      </li>
    </ul>
  );
};

export default UserDetails;
