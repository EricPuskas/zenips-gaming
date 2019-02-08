import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "../../Public/Main/Home";
// Modals
import ModalContainer from "../../Common/Modals/ModalContainer";
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
        <ModalContainer />
      </div>
    );
  }
}

export default PublicLayout;
