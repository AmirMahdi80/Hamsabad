import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import "./styles/tailwind.css";
import App from "./App";
// import { AuthProvider } from "./contexts/AuthContext";
// import { NotificationProvider } from "./contexts/NotificationContext";
import "./styles/tailwind.css";
import "./styles/index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
        <App />
  </React.StrictMode>
);
