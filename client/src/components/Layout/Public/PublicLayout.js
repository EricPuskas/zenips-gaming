import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "../../Public/Main/Home";
import Article from "../../Public/Main/Article";
import News from "../../Public/Main/News";
import Reviews from "../../Public/Main/Reviews";
import Guides from "../../Public/Main/Guides";
import Videos from "../../Public/Main/Videos";
import Contact from "../../Public/Main/Contact";
import Helmet from "react-helmet";
import Brand from "../../../assets/img/favicon-32x32.png";
import ArticlesSearch from "../../Public/Main/Articles/Search/ArticlesSearch";
import About from "../../Public/Main/About/About";
import Privacy from "../../Public/Main/Privacy/Privacy";
import Cookies from "../../Public/Main/Cookies/Cookies";
import Terms from "../../Public/Main/Terms/Terms";

// Modals
import ModalContainer from "../../Common/Modals/ModalContainer";
import NotFound from "../../Common/NotFound";
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
        <Helmet>
          <link rel="shortcut icon" href={Brand} />
        </Helmet>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/news" component={News} />
          <Route exact path="/reviews" component={Reviews} />
          <Route exact path="/guides" component={Guides} />
          <Route exact path="/videos" component={Videos} />
          <Route exact path="/contact" component={Contact} />
          <Route exact path="/about" component={About} />
          <Route exact path="/privacy" component={Privacy} />
          <Route exact path="/cookies" component={Cookies} />
          <Route exact path="/terms" component={Terms} />
          <Route exact path="/articles/results" component={ArticlesSearch} />
          <Route exact path="/articles/:id" component={Article} />
          <Route component={NotFound} />
        </Switch>
        <ModalContainer />
      </div>
    );
  }
}

export default PublicLayout;
