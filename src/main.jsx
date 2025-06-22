import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./assets/components/context/CartContext";
import { AuthProvider } from "./assets/components/context/AuthContext";
import { AdminProvider } from "./assets/components/context/AdminContext";
import { HelmetProvider } from "react-helmet-async";
import 'sweetalert2/dist/sweetalert2.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
  // AuthProvider debe envolver todo porque otros contextos dependen de la autenticación

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider> {/* Envuelvo todo el árbol */}
      <AuthProvider>
        <CartProvider>
          <AdminProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </AdminProvider>
        </CartProvider>
      </AuthProvider>
    </HelmetProvider>
  </React.StrictMode>
);

