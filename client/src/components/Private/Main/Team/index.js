// Dependencies
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classNames from "classnames";
// Actions
import { getTeamMembers } from "../../../../actions/teamActions";
// Utilities
import isEmpty from "../../../../utils/isEmpty";
// Components
import LoaderLarge from "../../../Common/Loader/LoaderLarge";
import MemberBox from "./js/MemberBox";
// CSS
import "./css/Team.css";

class Team extends Component {
  componentDidMount() {
    document.title = "The Team | Dashboard";
    // Get the initial posts [per = 3 && page = 1];
    const { members } = this.props.team;
    if (isEmpty(members)) {
      this.props.getTeamMembers(true);
    }
  }

  render() {
    const { expandContent } = this.props;
    const { members, init_loading } = this.props.team;
    let main;

    const allMembers = members.map(member => (
      <MemberBox key={member._id} member={member} />
    ));

    let mainContainer = classNames({
      "main-container": true,
      minContent: expandContent,
      maxContent: !expandContent
    });

    members === null || init_loading
      ? (main = <LoaderLarge msg={"Loading Content. Please wait."} />)
      : (main = (
          <div id="offset" className="center-div">
            <div className="row">
              <div className="col-12 text-center">
                <div className="team-box">
                  <h1> Our Team </h1>
                  <div className="row">{allMembers}</div>
                </div>
              </div>
            </div>
          </div>
        ));
    return (
      <div id="container" className={mainContainer}>
        {main}
      </div>
    );
  }
}

Team.propTypes = {
  team: PropTypes.object.isRequired,
  getTeamMembers: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  team: state.team
});

export default connect(
  mapStateToProps,
  { getTeamMembers }
)(Team);
