import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "../../Public/Main/Home";
import Article from "../../Public/Main/Article";
import News from "../../Public/Main/News";
import Reviews from "../../Public/Main/Reviews";
import Guides from "../../Public/Main/Guides";
import Videos from "../../Public/Main/Videos";
import Contact from "../../Public/Main/Contact";
import { loadReCaptcha } from "react-recaptcha-google";
import ArticlesSearch from "../../Public/Main/Articles/Search/ArticlesSearch";
// Modals
import ModalContainer from "../../Common/Modals/ModalContainer";
import "./PublicLayout.css";

class PublicLayout extends React.Component {
  componentDidMount() {
    loadReCaptcha();
  }

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
          <Route exact path="/news" component={News} />
          <Route exact path="/reviews" component={Reviews} />
          <Route exact path="/guides" component={Guides} />
          <Route exact path="/videos" component={Videos} />
          <Route exact path="/contact" component={Contact} />
          <Route exact path="/articles/results" component={ArticlesSearch} />
          <Route exact path="/articles/:id" component={Article} />
        </Switch>
        <ModalContainer />
      </div>
    );
  }
}

export default PublicLayout;
