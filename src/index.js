import React, { StrictMode } from "react";
import ReactDOM from "react-dom";
import App from "./components/App";

if (module.hot) {
  module.hot.accept();
}

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.querySelector("#root")
);
