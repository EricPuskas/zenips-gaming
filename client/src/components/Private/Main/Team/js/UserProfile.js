// Dependencies
import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { connect } from "react-redux";
// Actions
import {
  getTeamMember,
  getUserInitPosts,
  clearErrors,
  updateUserProfile
} from "../../../../../actions/memberActions";
import { loadModal } from "../../../../../actions/modalActions";
import { getUserInfo } from "../../../../../actions/authActions";
// Utilities
import isEmpty from "../../../../../utils/isEmpty";
// Components
import LoaderSuccess from "../../../../Common/Loader/LoaderSuccess";
import LoaderLarge from "../../../../Common/Loader/LoaderLarge";
import UserProfileBox from "./Public/UserProfileBox";
import UserProfileBoxPrivate from "./Private/UserProfileBoxPrivate";
import UserHistory from "./UserHistory/UserHistory";

class UserProfile extends Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      role: "",
      facebook: "",
      linkedin: "",
      twitter: "",
      instagram: "",
      bio: "",
      description: "",
      modal: false,
      errors: {}
    };
  }

  componentDidMount() {
    const username = this.props.match.params.username;
    this.props.getTeamMember(username);
  }

  componentWillUnmount() {
    this.props.clearErrors();
  }

  componentDidUpdate(prevProps) {
    const username = this.props.match.params.username;
    prevProps.errors !== this.props.errors &&
      this.setState(() => ({ errors: this.props.errors }));

    prevProps.match.params.username !== username &&
      this.props.getTeamMember(username);
  }

  componentWillReceiveProps(nextProps) {
    nextProps.errors && this.setState({ errors: nextProps.errors });

    if (nextProps.member) {
      const member = nextProps.member.member;
      member.firstName = !isEmpty(member.firstName) ? member.firstName : "";
      member.lastName = !isEmpty(member.lastName) ? member.lastName : "";
      member.email = !isEmpty(member.email) ? member.email : "";
      member.role = !isEmpty(member.role) ? member.role : "";
      member.bio = !isEmpty(member.bio) ? member.bio : "";
      member.description = !isEmpty(member.description)
        ? member.description
        : "";
      member.social = !isEmpty(member.social) ? member.social : {};
      member.twitter = !isEmpty(member.social.twitter)
        ? member.social.twitter
        : "";
      member.facebook = !isEmpty(member.social.facebook)
        ? member.social.facebook
        : "";
      member.linkedin = !isEmpty(member.social.linkedin)
        ? member.social.linkedin
        : "";
      member.instagram = !isEmpty(member.social.instagram)
        ? member.social.instagram
        : "";

      // Set component fields state
      this.setState({
        firstName: member.firstName,
        lastName: member.lastName,
        email: member.email,
        role: member.role,
        facebook: member.facebook,
        linkedin: member.linkedin,
        twitter: member.twitter,
        instagram: member.instagram,
        bio: member.bio,
        description: member.description
      });
    }
  }

  submitForm = event => {
    event.preventDefault();
    const username = this.props.member.member.username;
    const id = this.props.member.member._id;
    const user_id = this.props.auth.user._id;
    let updateCurrentUser = false;
    const data = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      role: this.state.role,
      facebook: this.state.facebook,
      linkedin: this.state.linkedin,
      twitter: this.state.twitter,
      instagram: this.state.instagram,
      bio: this.state.bio,
      description: this.state.description
    };
    if (id === user_id) updateCurrentUser = true;
    this.props.updateUserProfile(username, id, data, updateCurrentUser);
  };

  changeInput = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { error } = this.props.errors;
    const {
      member,
      articles,
      posts,
      patch_notes,
      loading,
      update_loading
    } = this.props.member;
    const { user } = this.props.auth;
    let { expandContent } = this.props;
    let name = `${member.firstName} ${member.lastName}`;
    let main, mainContainer, content, side;

    member && (document.title = `${name} | Dashboard `);
    !isEmpty(member._id) ? (side = <UserHistory />) : (side = "");

    mainContainer = classNames({
      "main-container profile-container": true,
      minContent: expandContent,
      maxContent: !expandContent
    });
    user._id === member._id || user.role.includes("Developer")
      ? (main = (
          <UserProfileBoxPrivate
            member={member}
            user={user}
            firstName={this.state.firstName}
            lastName={this.state.lastName}
            email={this.state.email}
            error={error}
            submitForm={this.submitForm}
            changeInput={this.changeInput}
            loadModal={this.props.loadModal}
            facebook={this.state.facebook}
            twitter={this.state.twitter}
            instagram={this.state.instagram}
            linkedin={this.state.linkedin}
          />
        ))
      : (main = (
          <UserProfileBox
            member={member}
            articles={articles}
            posts={posts}
            patch_notes={patch_notes}
          />
        ));

    member === null || loading || Object.keys(member).length === 0
      ? (content = <LoaderLarge msg={"Loading Profile. Please wait."} />)
      : (content = (
          <div className="row">
            <div className="col-12 col-lg-6 col-xl-6">
              <div className="profile-box">{main}</div>
            </div>
            <div className="col-12 col-lg-6 col-xl-6">
              <div className="profile-box">{side}</div>
            </div>
          </div>
        ));

    update_loading &&
      (main = (
        <LoaderSuccess
          msg={"Your profile has been updated."}
          top="25vh"
          left="-5%"
        />
      ));

    return <div className={mainContainer}>{content}</div>;
  }
}

UserProfile.propTypes = {
  member: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object,
  getTeamMember: PropTypes.func.isRequired,
  updateUserProfile: PropTypes.func.isRequired,
  getUserInfo: PropTypes.func.isRequired,
  getUserInitPosts: PropTypes.func.isRequired,
  loadModal: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  member: state.member,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {
    getTeamMember,
    updateUserProfile,
    getUserInfo,
    getUserInitPosts,
    clearErrors,
    loadModal
  }
)(UserProfile);
