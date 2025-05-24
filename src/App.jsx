import React, { useEffect, useState } from 'react';
import { Routes, Route } from "react-router-dom";

import Loader from './assets/components/Loader';
import Header from "./assets/components/estaticos/Header";
import Footer from "./assets/components/estaticos/Footer";
import Home from "./assets/components/pages/Home";
import Productos from "./assets/components/pages/productos";
import Tienda from "./assets/components/pages/Tienda";
import Nosotros from "./assets/components/pages/Nosotros";
import Contacto from "./assets/components/pages/Contacto";
import Login from "./assets/components/pages/Login";
import NotFound from "./assets/components/NotFound";
import Gallery from './assets/components/Gallery';
import Cart from './assets/components/estaticos/Cart';

function App() {
  const [loading, setLoading] = useState(true);
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cart, setCart] = useState([]); 

  const handleOpenCart = () => setIsCartOpen(true);
  const handleCloseCart = () => setIsCartOpen(false);

 // --- Funciones del Carrito ---
  const handleAddToCart = (productToAdd) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === productToAdd.id);

      if (existingItem) {
        // Si el producto ya está en el carrito, incrementa la cantidad
        return prevCart.map((item) =>
          item.id === productToAdd.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Si el producto no está, agrégalo con cantidad 1
        return [...prevCart, { ...productToAdd, quantity: 1 }];
      }
    });
  };

  const handleRemoveFromCart = (idToRemove) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== idToRemove));
  };

  const handleUpdateQuantity = (idToUpdate, newQuantity) => {
    setCart((prevCart) => {
      if (newQuantity <= 0) {
        // Si la cantidad es 0 o menos, elimina el ítem
        return prevCart.filter((item) => item.id !== idToUpdate);
      } else {
        // Actualizo la cantidad del ítem
        return prevCart.map((item) =>
          item.id === idToUpdate ? { ...item, quantity: newQuantity } : item
        );
      }
    });
  };
   // Función para Finalizar Compra
  const handleCheckout = () => {
    if (cart.length === 0) {
      alert("Tu carrito está vacío. ¡Agrega algunos productos antes de finalizar la compra!");
      return;
    }

    let resumen = "Resumen de tu compra:\n\n";
    let totalCompra = 0;

    cart.forEach(item => {
      resumen += `${item.nombre} x ${item.quantity} = $${(item.precio * item.quantity).toFixed(2)}\n`;
      totalCompra += item.precio * item.quantity;
    });

    resumen += `\nTotal a pagar: $${totalCompra.toFixed(2)}`;

    alert(resumen); // Muestro el resumen en un alert

    setCart([]); // Vacio el carrito
    setIsCartOpen(false); // Cierro el carrito
  };

  // --- Carga de Productos ---
  useEffect(() => {
    fetch('data/data.json')
      .then(respuesta => {
        if (!respuesta.ok) {
          throw new Error(`HTTP error! status: ${respuesta.status}`);
        }
        return respuesta.json();
      })
      .then(datos => {
        setTimeout(() => {
          setProductos(datos);
          setLoading(false);
        }, 2000);
      })
      .catch(error => {
        console.error("Error al cargar los productos:", error);
        setError(true); // Establecemos error a true
        setLoading(false);
      });
  }, []);

  return (
    <>
  <Header cartItems={cart} onOpenCart={handleOpenCart} />

      <Gallery />

      <main>
        <Routes>
           <Route path="/" element={<Home cart={cart} productos={productos} cargando={loading} error={error} />} />
          <Route
            path="/tienda"
            element={
              <Tienda
                cart={cart}
                productos={productos}
                cargando={loading}
                error={error}
                onAddToCart={handleAddToCart}
              />
            }
          />
          <Route
            path="/productos"
            element={
              <Productos
                cart={cart}
                productos={productos}
                cargando={loading}
                error={error}
                onAddToCart={handleAddToCart} 
              />
            }
          />
          <Route path="/nosotros" element={<Nosotros cart={cart} />} />
          <Route path="/contacto" element={<Contacto cart={cart} />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {isCartOpen && (
              <Cart
                cartItems={cart}
                isOpen={isCartOpen}
                onClose={handleCloseCart}
                onRemoveItem={handleRemoveFromCart}
                onUpdateQuantity={handleUpdateQuantity}
                onCheckout={handleCheckout} 
              />
            )}
      <Footer />
    </>
  );
}

export default App;
