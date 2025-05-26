import React from 'react';
import ProductCard from './ProductCard'; 

const ProductList = ({ productos, onAddToCart }) => {
  return (
    <div className="product-list">
      {productos.map((producto) => (
        <ProductCard
          key={producto.id}
          producto={producto}
          onAddToCart={onAddToCart} 
        />
      ))}
    </div>
  );
};

export default ProductList;
