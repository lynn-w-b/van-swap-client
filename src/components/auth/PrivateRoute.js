import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({
  component: Component,
  authenticated,
  user,
  accessToken,
  vans,
  inputValue,
  ...rest
}) => {
  return (
    <Route
      render={(props) =>
        authenticated ? (
          <Component {...props} {...rest} user={user} accessToken={accessToken} vans={vans} inputValue={inputValue}/>
        ) : (
          <Redirect to="/" />
        )
      }
      {...rest}
    />
  );
};
export default PrivateRoute;
