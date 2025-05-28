import React, { useState, useEffect } from 'react';
import { Routes, Route } from "react-router-dom";

import Header from "./assets/components/estaticos/Header";
import Footer from "./assets/components/estaticos/Footer";
import Home from "./assets/components/pages/Home";
import Tienda from "./assets/components/pages/Tienda";
import Productos from './assets/components/pages/Productos';
import Nosotros from "./assets/components/pages/Nosotros";
import Contacto from "./assets/components/pages/Contacto";
import NotFound from "./assets/components/NotFound";
import Gallery from './assets/components/Gallery';
import Cart from './assets/components/estaticos/Cart';
import ProductDetail from './assets/components/estaticos/ProductDetail';
import Login from './assets/components/auth/Login';
import RutaProtegida from './assets/components/auth/RutasProtegidas';
import Registro from './assets/components/auth/Registro';
const App = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
  const usuarios = JSON.parse(localStorage.getItem("usuarios"));

  if (!usuarios || usuarios.length === 0) {
    const usuariosIniciales = [
      { username: "Emiliano1", password: "1234" },
      { username: "Jesica", password: "1234" }
    ];
    localStorage.setItem("usuarios", JSON.stringify(usuariosIniciales));
  }
}, []);


  // Verificar si hay usuario logueado al iniciar
  useEffect(() => {
    const user = localStorage.getItem("usuarioActual");
    if (user) {
      setIsAuthenticated(true);
      setCurrentUser(user);
    }
  }, []);

  // Cargar productos
  useEffect(() => {
    fetch('/data/data.json')
      .then(res => {
        if (!res.ok) throw new Error('Error al cargar los datos');
        return res.json();
      })
      .then(data => {
        setProductos(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Login
  const handleLogin = (username, password) => {
    const usuariosGuardados = JSON.parse(localStorage.getItem("usuarios")) || [];
    const usuarioValido = usuariosGuardados.find(
      (u) => u.username === username && u.password === password
    );

    if (usuarioValido) {
      setIsAuthenticated(true);
      setCurrentUser(username);
      localStorage.setItem("usuarioActual", username);
      return true;
    } else {
      return false;
    }
  };

  // Logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    setCartItems([]); 
    setCurrentUser(null);
    localStorage.removeItem("usuarioActual");
  };

  // Carrito
  const handleOpenCart = () => setIsCartOpen(true);
  // const handleAddToCart = (producto) => {
  //   setCartItems((prevItems) => {
  //     const existingItem = prevItems.find(item => item.id === producto.id);
  //     if (existingItem) {
  //       return prevItems.map(item =>
  //         item.id === producto.id
  //           ? { ...item, quantity: item.quantity + producto.quantity }
  //           : item
  //       );
  //     } else {
  //       return [...prevItems, { ...producto }];
  //     }
  //   });
  // };
const handleAddToCart = (producto) => {
  if (!isAuthenticated) {
    alert("Debes iniciar sesión para agregar productos al carrito.");
    return;
  }

  setCartItems((prevItems) => {
    const existingItem = prevItems.find(item => item.id === producto.id);
    if (existingItem) {
      return prevItems.map(item =>
        item.id === producto.id
          ? { ...item, quantity: item.quantity + producto.quantity }
          : item
      );
    } else {
      return [...prevItems, { ...producto }];
    }
  });
};

  const handleUpdateQuantity = (id, newQuantity) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, newQuantity) }
          : item
      )
    );
  };

  const handleRemoveItem = (id) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const handleCheckout = () => {
    alert("¡Gracias por tu compra!");
    setCartItems([]);
    setIsCartOpen(false);
  };

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
