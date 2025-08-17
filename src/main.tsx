// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Portfolio from "./Portfolio"; // .tsx file, extension optional

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Portfolio />
  </React.StrictMode>
);
