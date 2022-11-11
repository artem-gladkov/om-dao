import React from "react";
import ReactDOM from "react-dom/client";
import "./app/styles/index.scss";
import { App } from "./app/app";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(<App />);
