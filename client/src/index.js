import React from "react";
import { render } from "react-snapshot";

// SERVICE WORKER
import * as serviceWorker from "./serviceWorker";

// MAIN APP COMPONENT
import App from "./App";

const rootElement = document.getElementById("root");
render(<App />, rootElement);
//  More about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
