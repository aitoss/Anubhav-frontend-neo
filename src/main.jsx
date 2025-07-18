import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import "./index.css";

import { SuperTokensWrapper } from "supertokens-auth-react";
import { initSuperTokens } from "./supertokens.js";

initSuperTokens();

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <SuperTokensWrapper>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </SuperTokensWrapper>
  </BrowserRouter>
);
