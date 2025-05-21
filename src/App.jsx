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

function App() {
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState(false);
useEffect(() => {
  fetch('data/data.json')
    .then(respuesta => respuesta.json())
    .then(datos => {
      setTimeout(() => {
        setProductos(datos);
        setLoading(false);
      }, 2000); // Simulamos 2s de carga
    })
    .catch(error => {
      console.error("Error al cargar los productos:", error);
      setLoading(false); // Detenemos la carga aunque haya error
    });
}, []);

  return (
    <>
      <Header />
      <Gallery />

      <main>
        <Routes>
          <Route path="/" element={<Home productos={productos} cargando={loading} error={error}/>} />
          <Route path="/tienda" element={<Tienda />} />
          <Route path="/productos" element={<Productos productos={productos} cargando={loading} error={error} />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </>
  );
}

export default App;
