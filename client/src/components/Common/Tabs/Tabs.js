import React, { Component } from "react";
import PropTypes from "prop-types";
import Tab from "./Tab";
import "./Tabs.css";

class Tabs extends Component {
  static propTypes = {
    children: PropTypes.instanceOf(Array).isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      activeTab: this.props.children[0].props.label
    };
  }

  changeTab = tab => {
    this.setState({ activeTab: tab });
  };

  render() {
    return (
      <div className="tabs">
        <ol className="tab-list">
          {this.props.children.map(child => {
            const { label } = child.props;
            return (
              <Tab
                activeTab={this.state.activeTab}
                key={label}
                label={label}
                changeTab={this.changeTab}
              />
            );
          })}
        </ol>
        <div className="tab-content">
          {this.props.children.map(child => {
            if (child.props.label !== this.state.activeTab) return undefined;
            return child.props.children;
          })}
        </div>
      </div>
    );
  }
}

export default Tabs;
