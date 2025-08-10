import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { sanitizeLocalStorage } from './utils/cacheUtils';

// Run sanitizer before mounting React to migrate any legacy localStorage values
try { sanitizeLocalStorage(); } catch (_) {}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
