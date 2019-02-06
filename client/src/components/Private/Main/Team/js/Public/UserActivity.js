import React from "react";

const UserActivity = ({ posts, articles, patch_notes }) => {
  return (
    <ul className="profile-info-box pib-public">
      <li className="profile-info">
        <strong>
          <i className="fas fa-edit" /> Articles:{" "}
        </strong>
        <span>{articles.count}</span>
      </li>
      <li className="profile-info">
        <strong>
          <i className="fas fa-bell" /> Posts:{" "}
        </strong>
        <span>{posts.count}</span>
      </li>
      <li className="profile-info">
        <strong>
          <i className="fas fa-bug" /> Patch Notes:{" "}
        </strong>
        <span>{patch_notes.count}</span>
      </li>
    </ul>
  );
};

export default UserActivity;
