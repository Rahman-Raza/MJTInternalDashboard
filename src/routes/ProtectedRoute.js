import React from "react";
import { Route,Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Comp, loggedIn, path,key, ...rest }) => {
  return (
    <Route
      path={path}
      key={key}
      {...rest}
      render={props => {
        return loggedIn ? (
          <Comp {...props} />
        ) : (
          <Redirect
            key={key} exact from={path} to={"/pages/login"} />
        );
      }}/>
  );
};

export  {ProtectedRoute}