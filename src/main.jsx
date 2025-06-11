import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./assets/components/context/CartContext";
import { AuthProvider } from "./assets/components/context/AuthContext";
import { AdminProvider } from "./assets/components/context/AdminContext";
ReactDOM.createRoot(document.getElementById("root")).render(
  // AuthProvider debe envolver todo porque otros contextos dependen de la autenticación

  <React.StrictMode>
    <AuthProvider>
      <CartProvider>
        <AdminProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </AdminProvider>
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>
);
