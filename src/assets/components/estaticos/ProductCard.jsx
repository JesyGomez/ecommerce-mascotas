import React, { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";

const ProductCard = ({ producto, isAuthenticated }) => {
  const [quantity, setQuantity] = useState(1);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const { handleAddToCart } = useContext(CartContext);

  const handleDecrement = () => {
    setQuantity((prevQuantity) => Math.max(1, prevQuantity - 1));
  };

  const handleIncrement = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleAddClick = () => {
    if (isAuthenticated) {
      handleAddToCart({ ...producto, quantity });
      setQuantity(1);
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 2000);
    } else {
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 2000);
    }
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
      <button className="btn-ver-detalle" onClick={() => setShowModal(true)}>
        Ver más
      </button>

      <button className="btn" onClick={handleAddClick}>
        Agregar al carrito 🛒
      </button>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="modal-close" onClick={() => setShowModal(false)}>×</button>
            <img src={producto.imagen} alt={producto.nombre} className="modal-image" loading="lazy" />
            <h2>{producto.nombre}</h2>
            <p>{producto.descripcion}</p>
            <p><strong>Precio:</strong> ${producto.precio.toFixed(2)}</p>
            <p><strong>Stock:</strong> {producto.stock}</p>
          </div>
        </div>
      )}

      {showSuccessMessage && (
        <span className="product-added-message">
          {isAuthenticated ? "¡Producto Agregado!" : "Debes iniciar sesión para agregar productos al carrito"}
        </span>
      )}
    </div>
  );
};

export default ProductCard;
