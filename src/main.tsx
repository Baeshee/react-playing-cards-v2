import React from "react";
import ReactDOM from "react-dom/client";
import App from "./view/app";
import "./styles/global.scss";
import "./styles/base/_base.scss";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
