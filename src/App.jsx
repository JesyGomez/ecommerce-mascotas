import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./assets/components/estaticos/Header";
import Footer from "./assets/components/estaticos/Footer";
import Home from "./assets/components/pages/Home";
import Tienda from "./assets/components/pages/Tienda";
import Productos from "./assets/components/pages/Productos";
import Nosotros from "./assets/components/pages/Nosotros";
import Contacto from "./assets/components/pages/Contacto";
import NotFound from "./assets/components/NotFound";
import Gallery from "./assets/components/Gallery";
import Cart from "./assets/components/estaticos/Cart";
import ProductDetail from "./assets/components/estaticos/ProductDetail";
import Login from "./assets/components/auth/Login";
import RutaProtegida from "./assets/components/auth/RutasProtegidas";
import Registro from "./assets/components/auth/Registro";
import Admin from "./assets/components/pages/Admin";
import { CartContext } from "./assets/components/context/CartContext";
const App = () => {
  const {
    productos,
    loading,
    error,
    cartItems,
    isCartOpen,
    isAuthenticated,
    currentUser,
    handleLogin,
    handleLogout,
    handleAddToCart,
    handleRemoveItem,
    handleUpdateQuantity,
    handleOpenCart,
    handleCheckout,
    setIsCartOpen,
  } = useContext(CartContext);

  return (
    <>
      <Header
        cartItems={cartItems}
        onOpenCart={handleOpenCart}
        onLogout={handleLogout}
        isAuthenticated={isAuthenticated}
        currentUser={currentUser}
      />
      <Gallery />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/registro" element={<Registro />} />

          <Route
            path="/tienda"
            element={
              <RutaProtegida isAuthenticated={isAuthenticated}>
                <Tienda
                  productos={productos}
                  cargando={loading}
                  error={error}
                  onAddToCart={handleAddToCart}
                  isAuthenticated={isAuthenticated}
                />
              </RutaProtegida>
            }
          />
          <Route
            path="/productos"
            element={
              <Productos
                productos={productos}
                cargando={loading}
                error={error}
                onAddToCart={handleAddToCart}
                isAuthenticated={isAuthenticated}
              />
            }
          />
          <Route path="/producto/:id" element={<ProductDetail />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route
            path="/admin"
            element={
              <RutaProtegida
                isAuthenticated={isAuthenticated}
                requiredRole="admin"
              >
                <Admin />
              </RutaProtegida>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Cart
        cartItems={cartItems}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onRemoveItem={handleRemoveItem}
        onUpdateQuantity={handleUpdateQuantity}
        onCheckout={handleCheckout}
      />

      <Footer />
    </>
  );
};

export default App;
