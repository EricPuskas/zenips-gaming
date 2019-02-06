import React from "react";

const UserBio = ({ bio }) => {
  return (
    <div className="profile-bio-public">
      <div className="text-center">
        <h1>Bio</h1>
      </div>
      <p>{bio}</p>
    </div>
  );
};

export default UserBio;
