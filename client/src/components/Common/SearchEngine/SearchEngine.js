import React from "react";
import "./SearchEngine.css";

class SearchEngine extends React.Component {
  constructor(props) {
    super(props);
    this.listenKeyboard.bind(this);
  }
  componentDidMount() {
    window.addEventListener("keydown", this.listenKeyboard, false);
  }

  listenKeyboard = event => {
    event.stopPropagation();
    if (event.which === 13 || event.keyCode === 13) {
      this.props.onSearchSubmit();
    }
  };

  componentWillUnmount() {
    window.removeEventListener("keydown", this.listenKeyboard, false);
  }
  render() {
    const { value, onSearchSubmit, onSearchChange } = this.props;
    return (
      <div className="row">
        <div className="col-12 col-lg-3 col-xl-3 center-div">
          <div className="input-group search-engine-box">
            <input
              className="form-control"
              type="search"
              onChange={e => onSearchChange(e)}
              placeholder="search"
              defaultValue={value}
            />
            <span className="input-group-append">
              <button
                className="btn btn-search search-button"
                type="button"
                onClick={() => onSearchSubmit()}
              >
                <i className="fas fa-search" />
              </button>
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default SearchEngine;
