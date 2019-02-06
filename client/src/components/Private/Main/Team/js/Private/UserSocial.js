import React from "react";
import InputGroup from "../../../../../Common/InputGroup";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class UserSocial extends React.Component {
  constructor() {
    super();
    this.state = {
      errors: {}
    };
  }

  componentDidUpdate(prevProps) {
    prevProps.errors !== this.props.errors &&
      this.setState(() => ({ errors: this.props.errors }));
  }

  componentWillReceiveProps(nextProps) {
    nextProps.errors && this.setState({ errors: nextProps.errors });
  }
  render() {
    const { twitter, facebook, linkedin, instagram, changeInput } = this.props;
    const { error } = this.props.errors;
    return (
      <div>
        <InputGroup
          placeholder="Twitter Profile URL"
          name="twitter"
          icon="fab fa-twitter"
          value={twitter}
          profileFormGroup={true}
          error={error.twitter}
          onChange={e => changeInput(e)}
        />
        <InputGroup
          placeholder="Facebook Profile URL"
          name="facebook"
          icon="fab fa-facebook"
          value={facebook}
          profileFormGroup={true}
          error={error.facebook}
          onChange={e => changeInput(e)}
        />
        <InputGroup
          placeholder="Linkedin Profile URL"
          name="linkedin"
          icon="fab fa-linkedin"
          value={linkedin}
          profileFormGroup={true}
          error={error.linkedin}
          onChange={e => changeInput(e)}
        />
        <InputGroup
          placeholder="Instagram Page URL"
          name="instagram"
          icon="fab fa-instagram"
          value={instagram}
          profileFormGroup={true}
          error={error.instagram}
          onChange={e => changeInput(e)}
        />
      </div>
    );
  }
}

UserSocial.propTypes = {
  errors: PropTypes.object
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(mapStateToProps)(UserSocial);
