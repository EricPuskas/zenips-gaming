// Dependencies
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Moment from "react-moment";
import classNames from "classnames";
import UserSocial from "../js/Public/UserSocial";
import { loadModal } from "../../../../../actions/modalActions";
class MemberBox extends Component {
  constructor() {
    super();
    this.state = {
      showControls: false
    };
  }
  toggleControls = () => {
    this.setState(prevState => {
      return { showControls: !prevState.showControls };
    });
  };
  render() {
    let controlsClass = classNames({
      "text-center member-controls": true,
      showControls: this.state.showControls
    });
    const { member, auth } = this.props;
    let DEL_ACC_MODAL_PROPS = {
      width: "40%",
      left: "30%"
    };
    return (
      <div className="col-12 col-lg-3 col-xl-3">
        <div
          className="member-box text-center"
          onMouseEnter={() => this.toggleControls()}
          onMouseLeave={() => this.toggleControls()}
        >
          <div>
            <Link to={`/dashboard/team/${member.username}`}>
              <img
                src={member.avatar}
                alt="user avatar"
                className="team-member-avatar"
              />
              <span className="member-details">{`${member.firstName} ${
                member.lastName
              }`}</span>
            </Link>
            <UserSocial member={member} classes="social-media-box" />
            <div>
              <ul className="member-info-box">
                <li className="member-info">
                  <span>
                    <i className="fas fa-certificate" /> Role:
                  </span>
                  <button className="btn btn-primary pull-right">
                    {member.role}
                  </button>
                </li>
                <li className="member-info">
                  <span>
                    <i className="far fa-envelope" /> Email:{" "}
                  </span>
                  <span className="pull-right">{member.email}</span>
                </li>
                <li className="member-info">
                  <span>
                    <i className="far fa-calendar-alt" /> Joined:{" "}
                  </span>
                  <span className="pull-right">
                    <Moment format="MMM DD, YYYY">{member.joined}</Moment>
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className={controlsClass}>
            {member._id === auth.user._id ||
            auth.user.role === "Lead Developer" ? (
              <div>
                <button
                  className="btn btn-red-c"
                  onClick={() =>
                    this.props.loadModal(
                      "DELETE_ACCOUNT_MODAL",
                      DEL_ACC_MODAL_PROPS
                    )
                  }
                >
                  <i className="fas fa-trash-alt" />
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

MemberBox.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { loadModal }
)(MemberBox);
