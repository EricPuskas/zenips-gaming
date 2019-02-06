import React from "react";
import "./Note.css";

const Note = () => {
  return (
    <div
      className="jumbotron"
      style={{
        marginTop: "10vh",
        background: "#06131b",
        height: "auto"
      }}
    >
      <h1 className="display-4">Hello, world!</h1>
      <p className="lead">
        This is a simple hero unit, a simple jumbotron-style component for
        calling extra attention to featured content or information.
      </p>
      <hr className="my-4" />
      <p>
        It uses utility class for typography and spacing to space content out
        within the larger container.
      </p>
      <p className="lead">
        <a className="btn btn-red-c" href="!#" role="button">
          Learn more
        </a>
      </p>
    </div>
  );
};

export default Note;
