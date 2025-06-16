import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const RutaProtegida = ({ children, requiredRole }) => {
  const { isAuthenticated, currentUser } = useContext(AuthContext); 

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && currentUser?.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RutaProtegida;
