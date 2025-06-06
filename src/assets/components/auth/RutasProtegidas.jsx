import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

const RutaProtegida = ({ isAuthenticated, children, requiredRole, redirectTo = "/login" }) => {
  const { currentUser } = useContext(CartContext);

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  if (requiredRole && currentUser?.role !== requiredRole) {
    // No tiene el rol correcto lo mandarlos al home
    return <Navigate to="/" replace />;
  }

  // Si todo bien, muestra el contenido protegido
  return children;
};

export default RutaProtegida;
