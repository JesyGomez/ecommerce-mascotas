import React, { useState } from "react";
import "../estaticos/Estilos.css";
import ProductList from "../estaticos/ProductList";
import { Helmet } from "react-helmet-async";

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
      <Helmet>
        <title>Tienda | Patitas 🐾</title>
        <meta
          name="description"
          content="Explorá nuestra tienda y descubrí alimentos, juguetes y más productos pensados para el bienestar de tus mascotas."
        />
      </Helmet>
      <input
        type="text"
        aria-label="Buscar producto por nombre"
        placeholder="Buscar producto"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      ></input>
      <div>
        <button aria-label="Buscar producto por categoría" onClick={() => setCategoriaSeleccionada(null)}>Todos</button>
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
