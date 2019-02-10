import React from "react";
import { hydrate, render } from "react-dom";

// SERVICE WORKER
import * as serviceWorker from "./serviceWorker";

// MAIN APP COMPONENT
import App from "./App";

const rootElement = document.getElementById("root");
if (rootElement.hasChildNodes()) {
  hydrate(<App />, rootElement);
} else {
  render(<App />, rootElement);
}
//  More about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
