import React, { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";

const ProductCard = ({ producto, isAuthenticated }) => {
  const [quantity, setQuantity] = useState(1);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const { handleAddToCart } = useContext(CartContext);

  // Validación previa: si no hay producto, no renderizamos
  if (!producto) return null;

  // Desestructuramos con valores por defecto
  const {
    nombre = "Producto sin nombre",
    descripcion = "Sin descripción",
    precio = 0,
    stock = 0,
    imagen,
  } = producto;

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
      {/* Imagen con fallback si no carga */}
      <img
        src={imagen}
        alt={nombre}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "https://via.placeholder.com/150?text=Imagen+no+disponible";
        }}
      />

      <h3>{nombre}</h3>
      <p>{descripcion}</p>
      <p className="precio">${Number(precio).toFixed(2)}</p>
      <p className="stock">Stock: {stock}</p>

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

      {/* Modal con validación y fallback */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="modal-close" onClick={() => setShowModal(false)}>×</button>
            <img
              src={imagen}
              alt={nombre}
              className="modal-image"
              loading="lazy"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://via.placeholder.com/150?text=Sin+imagen";
              }}
            />
            <h2>{nombre}</h2>
            <p>{descripcion}</p>
            <p><strong>Precio:</strong> ${Number(precio).toFixed(2)}</p>
            <p><strong>Stock:</strong> {stock}</p>
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
