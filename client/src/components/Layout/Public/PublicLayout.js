import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "../../Public/Main/Home";
import "./PublicLayout.css";

class PublicLayout extends React.Component {
  constructor() {
    super();
    this.state = {
      isOpen: false,
      showSearch: false
    };
  }
  toggleNav = () => {
    this.setState(prevState => {
      return {
        isOpen: !prevState.isOpen
      };
    });
  };

  toggleSearch = () => {
    this.setState(prevState => {
      return {
        showSearch: !prevState.showSearch
      };
    });
  };

  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </div>
    );
  }
}

export default PublicLayout;
