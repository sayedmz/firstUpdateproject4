import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./Css/components/loading.css";
import "./Pages/Auth/Auth.css";
import "./Css/components/button.css";
import "./Css/components/alerts.css";
import "./Css/components/google.css";

import App from "./App";

//bootstrap react
//npm install react-bootstrap bootstrap
import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter as Router } from "react-router-dom";
import MenuContext from "./Context/MenuContext";
import WindowContext from "./Context/WindowContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <WindowContext>
      <MenuContext>
        <Router>
          <App />
        </Router>
      </MenuContext>
    </WindowContext>
  </React.StrictMode>
);

//      bootstrap 2eme method  https://getbootstrap.com/
//npm install bootstrap@5.3.3
//gem install bootstrap -v 5.3.3
// import "bootstrap/dist/css/bootstrap.css";
// import "bootstrap/dist/js/bootstrap.js";
//npm uninstall bootstrap
