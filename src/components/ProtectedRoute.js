import React from 'react';
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { getLoggedIn } from "../features/auth/authSlice";


const ProtectedRoute = ({ component: Component, ...props  }) => {
  const loggedIn = useSelector(getLoggedIn)

  return (
    <Route exact>
      {
        () => loggedIn ? <Component {...props} /> : <Redirect to="./signin" />
      }
    </Route>
)}

export default ProtectedRoute;