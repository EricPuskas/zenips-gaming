import React from "react";

import UserInfo from "./UserInfo";
import UserBio from "./UserBio";
import UserDescription from "./UserDescription";
import UserSocial from "./UserSocial";
import UserActivity from "./UserActivity";
import UserDetails from "./UserDetails";

import "./profile.css";

const UserProfileBox = ({ member, articles, posts, patch_notes }) => {
  return (
    <div>
      <div className="row user-info-public">
        <div className="col-12 col-lg-4 col-xl-4">
          <UserInfo member={member} />
        </div>
        <div className="col-12 col-lg-8 col-xl-8">
          <UserDescription member={member} />
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-lg-4 col-xl-4">
          <UserSocial
            member={member}
            classes="social-media-box text-center public-profile-smb"
          />
          <UserActivity
            articles={articles}
            posts={posts}
            patch_notes={patch_notes}
          />
        </div>
        <div className="col-12 col-lg-8 col-xl-8">
          <UserDetails member={member} />
        </div>
        <div className="row">
          <div className="col-12">
            <UserBio bio={member.bio} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileBox;
