import React from "react";
import { Navigate } from "react-router-dom";
import { hotelStore } from "./hotelStore";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const isAuth = hotelStore.getState().auth.isAuth;
  if (isAuth) {
    return children;
  }
  return <Navigate to="/" replace={false} />;
};

export default ProtectedRoute;
