import React from "react";
import { Link } from "react-router-dom";
const UserInfo = ({ member }) => {
  return (
    <div>
      <div className="profile-go-back-btn">
        <Link to="/dashboard/team">
          <i
            className="fas fa-arrow-circle-left"
            style={{ fontSize: "2rem" }}
          />
        </Link>
      </div>
      <div className="text-center">
        <img
          src={member.avatar}
          alt="user avatar"
          className="profile-avatar-public"
        />
        <span className="profile-details">{`${member.firstName} ${
          member.lastName
        }`}</span>
      </div>
    </div>
  );
};

export default UserInfo;
