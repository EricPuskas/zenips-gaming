import React from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";

const UserInfo = ({ member }) => {
  return (
    <div>
      <div style={{ position: "absolute", left: "0" }}>
        <Link to="/dashboard/team">
          <i
            className="fas fa-arrow-circle-left"
            style={{ fontSize: "2rem" }}
          />
        </Link>
      </div>
      <div className="text-center">
        <img src={member.avatar} alt="user avatar" className="profile-avatar" />
        <span className="profile-details">{`${member.firstName} ${
          member.lastName
        }`}</span>
      </div>
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
    </div>
  );
};

export default UserInfo;
