import React from "react";
import ReactDOM from "react-dom";

// SERVICE WORKER
import * as serviceWorker from "./serviceWorker";

// MAIN APP COMPONENT
import App from "./App";

ReactDOM.render(<App />, document.getElementById("root"));

//  More about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
