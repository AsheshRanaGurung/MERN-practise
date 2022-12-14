import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import Provider from "./components/Provider/Provider";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider>
    <App />
  </Provider>
);
