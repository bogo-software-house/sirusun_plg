// src/main.js atau src/main.tsx
if (process.env.NODE_ENV === "production") {
  console.log = () => {};
  console.error = () => {};
  console.warn = () => {};
}

if (process.env.NODE_ENV === "Production") {
  const originalWarn = console.warn;
  console.warn = (...args) => {
    if (args[0] && args[0].includes("React Router Future Flag Warning")) {
      return; // Mengabaikan peringatan terkait React Router
    }
    originalWarn(...args); // Tetap menampilkan peringatan lain
  };
}

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
