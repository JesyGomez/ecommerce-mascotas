import React from 'react';
import "../estaticos/Estilos.css";
import ProductList from '../estaticos/ProductList';
import Loader from '../Loader';

const Productos = ({ cart, productos, cargando, error, onAddToCart, isAuthenticated }) => {
  return (
    <>
      <div className="productos-container">
        <h2>Nuestros productos</h2>
        {cargando ? (
          <Loader />
        ) : error ? (
          <p>Ocurrió un error al cargar los productos.</p>
        ) : (
          <ProductList productos={productos} onAddToCart={onAddToCart} isAuthenticated={isAuthenticated} /> 
        )}
      </div>
    </>
  );
};

export default Productos;
