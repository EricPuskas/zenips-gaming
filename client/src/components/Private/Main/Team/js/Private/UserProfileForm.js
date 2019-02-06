import React from "react";
import InputGroup from "../../../../../Common/InputGroup";
import SelectField from "../../../../../Common/SelectField";

const UserProfileForm = ({
  user,
  submitForm,
  changeInput,
  firstName,
  lastName,
  email,
  role,
  roles,
  socialInputs,
  error
}) => {
  let disabled = true;
  if (user.role === "Lead Developer") {
    disabled = false;
  }
  return (
    <form onSubmit={submitForm} className="user-details-form">
      <div className="row">
        <div className="col-12 col-lg-5 col-xs-5">
          <InputGroup
            placeholder="First Name"
            profileFormGroup={true}
            name="firstName"
            type="text"
            value={firstName}
            error={error.firstName}
            icon="far fa-id-card"
            onChange={e => changeInput(e)}
          />
          <InputGroup
            placeholder="Last Name"
            profileFormGroup={true}
            name="lastName"
            type="text"
            value={lastName}
            error={error.lastName}
            icon="far fa-id-card"
            onChange={e => changeInput(e)}
          />
          <InputGroup
            placeholder="Email Address"
            profileFormGroup={true}
            name="email"
            type="email"
            value={email}
            error={error.email}
            icon="far fa-envelope"
            onChange={e => changeInput(e)}
          />
          <SelectField
            disabled={disabled}
            name="role"
            onChange={e => changeInput(e)}
            profileFormGroup={true}
            defaultValue={role}
            options={[roles]}
          />
        </div>
        <div className="col-12 col-lg-7 col-xs-7">{socialInputs}</div>
        <div className="col-12 text-center">
          <button className="btn btn-primary btn-lg controls-btn">
            <i className="fas fa-check-circle" /> Update Profile
          </button>
        </div>
      </div>
    </form>
  );
};

export default UserProfileForm;
