import React from "react";
import "../estaticos/Estilos.css";
import ProductList from "../estaticos/ProductList";
import Loader from "../Loader";

const Productos = ({
  productos,
  cargando,
  error,
  onAddToCart,
  isAuthenticated,
}) => {
  return (
    <>
      <div className="productos-container">
        <h2>Nuestros productos</h2>
        {cargando ? (
          <Loader />
        ) : error ? (
          <p>Ocurrió un error al cargar los productos.</p>
        ) : (
          <div className="productos-grid">
            <ProductList
              productos={productos}
              onAddToCart={onAddToCart}
              isAuthenticated={isAuthenticated}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Productos;
