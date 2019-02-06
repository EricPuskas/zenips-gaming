import React from "react";
import UserInfo from "./UserInfo";
import AccountControls from "./AccountControls";
import UserBio from "./UserBio";
import UserDescription from "./UserDescription";
import UserProfileForm from "./UserProfileForm";
import UserSocial from "./UserSocial";
import roles from "../../../../../../utils/roles";
import "./profile.css";

const UserProfileBoxPrivate = ({
  user,
  firstName,
  lastName,
  email,
  member,
  error,
  submitForm,
  changeInput,
  loadModal,
  facebook,
  twitter,
  instagram,
  linkedin
}) => {
  const filteredRoles = roles.filter(
    roles => roles.props.value !== member.role
  );
  let socialInputs = (
    <UserSocial
      facebook={facebook}
      twitter={twitter}
      instagram={instagram}
      linkedin={linkedin}
      changeInput={changeInput}
    />
  );
  return (
    <div className="row">
      <div className="col-12 col-lg-6 col-xl-6">
        <UserInfo member={member} />
        <AccountControls
          username={member.username}
          id={member._id}
          avatar={member.avatar}
          email={member.email}
          error={error}
          submitForm={submitForm}
          changeInput={changeInput}
          loadModal={loadModal}
        />
      </div>
      <div className="col-12 col-lg-6 col-xl-6 bl-blue">
        <UserBio
          loadModal={loadModal}
          member={member}
          submitForm={submitForm}
          changeInput={changeInput}
          error={error}
        />
        <UserDescription
          loadModal={loadModal}
          member={member}
          submitForm={submitForm}
          changeInput={changeInput}
          error={error}
        />
      </div>
      <div className="col-12">
        <UserProfileForm
          submitForm={submitForm}
          changeInput={changeInput}
          firstName={firstName}
          lastName={lastName}
          email={email}
          role={member.role}
          user={user}
          error={error}
          roles={[filteredRoles]}
          socialInputs={socialInputs}
        />
      </div>
    </div>
  );
};

export default UserProfileBoxPrivate;
