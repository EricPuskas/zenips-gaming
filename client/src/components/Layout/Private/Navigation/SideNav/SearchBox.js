import React from "react";

const SearchBox = () => {
  return (
    <div>
      <div className="row">
        <div className="input-group search-box-custom">
          <input
            disabled={true}
            className="form-control py-2 search-form search-box-custom"
            type="search"
            defaultValue="search"
            id="example-search-input"
          />
          <span className="input-group-append">
            <button className="btn btn-search search-button" type="button">
              <i className="fas fa-search" />
            </button>
          </span>
        </div>
      </div>
    </div>
  );
};
export default SearchBox;
