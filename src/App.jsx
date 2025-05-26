import React, { useState, useEffect } from 'react';
import Productos from './assets/components/pages/Productos';
import { Routes, Route } from "react-router-dom";

import Loader from './assets/components/Loader';
import Header from "./assets/components/estaticos/Header";
import Footer from "./assets/components/estaticos/Footer";
import Home from "./assets/components/pages/Home";
import Tienda from "./assets/components/pages/Tienda";
import Nosotros from "./assets/components/pages/Nosotros";
import Contacto from "./assets/components/pages/Contacto";
import NotFound from "./assets/components/NotFound";
import Gallery from './assets/components/Gallery';
import Cart from './assets/components/estaticos/Cart';

const App = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleOpenCart = () => setIsCartOpen(true);
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

  // Agregar producto al carrito
  const handleAddToCart = (producto) => {
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

  // Actualizar cantidad
  const handleUpdateQuantity = (id, newQuantity) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, newQuantity) }
          : item
      )
    );
  };

  // Eliminar producto del carrito
  const handleRemoveItem = (id) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  // Finalizar compra
  const handleCheckout = () => {
    alert("¡Gracias por tu compra!");
    setCartItems([]);
    setIsCartOpen(false);
  };

  return (

    <div>
      <Header cartItems={cartItems} onOpenCart={handleOpenCart} />
      <Gallery />
      {loading && <p>Cargando productos...</p>}
      {error && <p>Error: {error}</p>}

      {!loading && !error && (
        <Productos
          productos={productos}
          cargando={false}
          error={null}
          onAddToCart={handleAddToCart}
        />
      )}

      <Cart
        cartItems={cartItems}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onRemoveItem={handleRemoveItem}
        onUpdateQuantity={handleUpdateQuantity}
        onCheckout={handleCheckout}
      />
    </div>
  );
};

export default App;
