import React, { useState } from 'react';

const ProductCard = ({ producto, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleDecrement = () => {
    setQuantity((prevQuantity) => Math.max(1, prevQuantity - 1));
  };

  const handleIncrement = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleAddClick = () => {
    onAddToCart({ ...producto, quantity: quantity });
    setQuantity(1); // Reseteo la cantidad a 1 después de agregar

    setShowSuccessMessage(true);

    // Oculto el mensaje 
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 2000); 
  };

  return (
    <div className="producto-card">
      <img src={producto.imagen} alt={producto.nombre} />
      <h3>{producto.nombre}</h3>
      <p>{producto.descripcion}</p>
      <p className="precio">${producto.precio.toFixed(2)}</p> 
      <p className="stock">Stock: {producto.stock}</p>
      <div className="cantidadContainer">
        <button className="btn-cantidad" onClick={handleDecrement}>-</button>
        <span className="cantidad">{quantity}</span>
        <button className="btn-cantidad" onClick={handleIncrement}>+</button>
      </div>
      <button className="btn" onClick={handleAddClick}>
        Agregar al carrito 🛒
      </button>

      {showSuccessMessage && (
        <span className="product-added-message">
          ¡Producto Agregado!
        </span>
      )}
    </div>
  );
};

export default ProductCard;