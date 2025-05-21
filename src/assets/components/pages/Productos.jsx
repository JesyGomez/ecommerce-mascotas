import React from 'react';
import "../estaticos/Estilos.css";
import ProductList from '../estaticos/ProductList';
import Loader from '../Loader';

const Productos = ({ productos, cargando, error }) => {
  return (
    <div className="productos-container">
      <h2>Nuestros productos</h2>
      {cargando ? (
        <Loader />
      ) : error ? (
        <p>Ocurrió un error al cargar los productos.</p>
      ) : (
        <ProductList productos={productos} />
      )}
    </div>
  );
};

export default Productos;
