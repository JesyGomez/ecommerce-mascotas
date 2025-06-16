import React, { useState } from "react";
import "../estaticos/Estilos.css";
import ProductList from "../estaticos/ProductList";

function Tienda({
  productos,
  cargando,
  error,
  onAddToCart,
  isAuthenticated,
  busqueda,
  setBusqueda,
}) {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);

  const productosVisibles = productos
    .filter((producto) =>
      producto.nombre.toLowerCase().includes(busqueda.toLowerCase())
    )
    .filter((producto) =>
      categoriaSeleccionada
        ? producto.categoria === categoriaSeleccionada
        : true
    );

  return (
    <div className="tienda-container">
      <h1>Nuestra Tienda</h1>
      <input
        type="text"
        placeholder="Buscar producto"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      ></input>
      <div>
        <button onClick={() => setCategoriaSeleccionada(null)}>Todos</button>
        <button onClick={() => setCategoriaSeleccionada("alimento")}>
          Alimentación
        </button>
        <button onClick={() => setCategoriaSeleccionada("juguetes")}>
          Juguetes
        </button>
        <button onClick={() => setCategoriaSeleccionada("higiene")}>
          Higiene
        </button>
        <button onClick={() => setCategoriaSeleccionada("transporte")}>
          Transporte
        </button>
      </div>

      <div className="productos-grid">
        {cargando ? (
          <Loader />
        ) : error ? (
          <p>Ocurrió un error al cargar los productos.</p>
        ) : productosVisibles.length === 0 ? (
          <p>No hay productos en esta categoría.</p>
        ) : (
          <ProductList
            productos={productosVisibles}
            onAddToCart={onAddToCart}
            isAuthenticated={isAuthenticated}
          />
        )}
      </div>
    </div>
  );
}

export default Tienda;
