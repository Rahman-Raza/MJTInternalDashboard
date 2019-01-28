import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";
import { CookiesProvider } from 'react-cookie';
import indexRoutes from "routes/index.jsx";

import "assets/scss/material-dashboard-pro-react.css?v=1.4.0";
import "assets/scss/customStyle.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import App from "App/App.js";


const hist = createBrowserHistory();
export default hist;

ReactDOM.render(
                <div>
                <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places"></script>

   <CookiesProvider>

     <App/>

  </CookiesProvider>
  </div>,
  document.getElementById("root")
);
