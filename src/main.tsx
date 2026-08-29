import React from "react";
import { createRoot } from "react-dom/client";
import "@corvaui/tokens/css";
import "@corvaui/react/styles.css";
import { App } from "./App";
import "./styles.css";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Morrow Archive could not find its root element.");
}

createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
