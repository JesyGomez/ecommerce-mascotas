import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./assets/components/context/CartContext";
import { AuthProvider } from "./assets/components/context/AuthContext";
import { AdminProvider } from "./assets/components/context/AdminContext";
import { HelmetProvider } from "react-helmet-async";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Estilos de toastify
import "sweetalert2/dist/sweetalert2.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
// AuthProvider debe envolver todo porque otros contextos dependen de la autenticación

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      {" "}
      {/* Envuelvo todo el árbol */}
      <AuthProvider>
        <CartProvider>
          <AdminProvider>
            <BrowserRouter>
              <App />
              <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
                tyle={{
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
                toastStyle={{
                  fontSize: "1.1rem",
                  padding: "1rem 1.5rem",
                  borderRadius: "10px",
                  textAlign: "center",
                }}
              />
            </BrowserRouter>
          </AdminProvider>
        </CartProvider>
      </AuthProvider>
    </HelmetProvider>
  </React.StrictMode>
);
