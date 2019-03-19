import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";
import { Provider } from 'react-redux'
import { CookiesProvider } from 'react-cookie';
import indexRoutes from "routes/index.jsx";
import {configureStore} from 'App/store.js';
import "assets/scss/material-dashboard-pro-react.css?v=1.4.0";
import "assets/scss/customStyle.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import App from "App/App.js";
import { watcherSaga } from "./reducers/sagas";
const configuredStore = configureStore();
console.log("checking initial store",configuredStore.store.getState());

configuredStore.sagaMiddleWare.run(watcherSaga);
const hist = createBrowserHistory();
export default hist;

ReactDOM.render(
                <div>
                <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places"></script>
 <Provider store={configuredStore.store}>
   <CookiesProvider>

     <App/>

  </CookiesProvider>
  </Provider>
  </div>,
  document.getElementById("root")
);
