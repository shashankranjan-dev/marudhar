/*!

=========================================================
* Material Dashboard PRO React - v1.10.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-pro-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import "./index.css";

import AuthLayout from "layouts/Auth.js";
import AdminLayout from "layouts/Admin.js";
import PrivateRoute from "PrivateRoutes";

import "assets/scss/material-dashboard-pro-react.scss?v=1.10.0";
import { StateProvider } from "./context/context";
import { initialState } from "./context/reducer";
import reducer from "./context/reducer";
import theme from "./theme/theme";
import { ThemeProvider } from "@material-ui/core";
import SelectLocationPage from "views/Pages/SelectLocationPage";
import IdleTimerContainer from './layouts/IdleTimerContainer'
import { CookiesProvider } from 'react-cookie';
ReactDOM.render(
  <BrowserRouter>
  
      {/* <IdleTimerContainer /> */}

    <StateProvider initialState={initialState} reducer={reducer}>
    <CookiesProvider>
      <ThemeProvider muiTheme={theme}>
        <Switch>
          <Route path="/auth" component={AuthLayout} />
          <Route path="/admin" component={AdminLayout} />
          <Redirect from="/" to="/auth" />
        </Switch>
      </ThemeProvider>
     

      </CookiesProvider>
      {/* <IdleTimerContainer /> */}

    </StateProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
