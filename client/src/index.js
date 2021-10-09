import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Header from "./components/Header"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
} from "react-router-dom";

import { UserContextProvider } from "./context/userContext";
import { FilterContextProvider } from "./context/filterContext";

ReactDOM.render(
  <React.StrictMode>
    <UserContextProvider>
    <FilterContextProvider>
      <Router>
        <App />
      </Router>
    </FilterContextProvider>
    </UserContextProvider>
  </React.StrictMode>,
  document.getElementById("index")
);
reportWebVitals();

