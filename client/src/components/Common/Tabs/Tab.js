import React, { Component } from "react";
import PropTypes from "prop-types";

class Tab extends Component {
  static propTypes = {
    activeTab: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    changeTab: PropTypes.func.isRequired
  };

  onClick = () => {
    const { label, changeTab } = this.props;
    changeTab(label);
  };

  render() {
    let className = "tab-list-item";
    if (this.props.activeTab === this.props.label) {
      className += " tab-list-active";
    }

    return (
      <li className={className} onClick={this.onClick}>
        {this.props.label}
      </li>
    );
  }
}

export default Tab;
