import { Navigate } from "react-router-dom";

const RutaProtegida = ({ isAuthenticated, children }) => {
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default RutaProtegida;
