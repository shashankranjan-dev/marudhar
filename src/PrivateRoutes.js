import React from "react";
import { Route, Redirect, useHistory } from "react-router-dom";
import { isAuthenticated, TOKEN } from "./services/AuthService";
import SelectQuotationListPage from "views/Pages/SelectQuotationList";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const history = useHistory();
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/auth",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
