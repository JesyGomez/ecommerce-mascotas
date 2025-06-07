import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const RutaProtegida = ({ children, requiredRole, redirectTo = "/login" }) => {
  const { isAuthenticated, currentUser } = useContext(AuthContext); 

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  if (requiredRole && currentUser?.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RutaProtegida;
