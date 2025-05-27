import React, { useState } from "react";
import "../estaticos/Estilos.css";
import ProductList from "../estaticos/ProductList";

// Recibe onAddToCart como prop
function Tienda({ cart, productos, cargando, error, onAddToCart, isAuthenticated }) {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);

  const productosFiltrados = categoriaSeleccionada
    ? productos.filter(
        (producto) => producto.categoria === categoriaSeleccionada
      )
    : productos;

  return (
    <div className="tienda-container">
      <h1>Nuestra Tienda</h1>
      <div>
        <button onClick={() => setCategoriaSeleccionada(null)}>Todos</button>
        <button onClick={() => setCategoriaSeleccionada("alimento")}>Alimentación</button>
        <button onClick={() => setCategoriaSeleccionada("juguetes")}>Juguetes</button>
        <button onClick={() => setCategoriaSeleccionada("higiene")}>Higiene</button>
        <button onClick={() => setCategoriaSeleccionada("transporte")}>Transporte</button>
      </div>

      <div className="productos-grid">
        {cargando ? (
          <p>Cargando productos...</p>
        ) : error ? (
          <p>Ocurrió un error al cargar los productos.</p>
        ) : productosFiltrados.length === 0 ? (
          <p>No hay productos en esta categoría.</p>
        ) : (
          <ProductList productos={productosFiltrados} onAddToCart={onAddToCart} isAuthenticated={isAuthenticated} /> 
        )}
      </div>
    </div>
  );
}

export default Tienda;