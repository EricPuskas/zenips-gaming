import React from "react";

const UserDescription = ({ member }) => {
  return (
    <div className="profile-desc-public">
      <div className="text-center">
        <h1>Description</h1>
      </div>
      <p>{member.description}</p>
    </div>
  );
};

export default UserDescription;
