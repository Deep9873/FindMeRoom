import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { sanitizeLocalStorage } from './utils/cacheUtils';
import { installThirdPartyErrorFilters } from './utils/errorFilters';

// Run sanitizer before mounting React to migrate any legacy localStorage values
try { sanitizeLocalStorage(); } catch (_) {}

// Dev-only: silence generic cross-origin "Script error." from third‑party vendors
try { if (process.env.NODE_ENV !== 'production') installThirdPartyErrorFilters(); } catch (_) {}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);