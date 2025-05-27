import React from 'react';
import ProductCard from './ProductCard'; 

const ProductList = ({ productos, onAddToCart, isAuthenticated }) => {
  return (
    <div className="product-list">
      {productos.map((producto) => (
        <ProductCard
          key={producto.id}
          producto={producto}
          onAddToCart={onAddToCart}
          isAuthenticated={isAuthenticated}
        />
      ))}
    </div>
  );
};

export default ProductList;
