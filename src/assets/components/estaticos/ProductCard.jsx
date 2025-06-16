import React, { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";

const ProductCard = ({ producto }) => {
  const [quantity, setQuantity] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const { handleAddToCart, handleOpenCart } = useContext(CartContext);

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
    handleAddToCart({ ...producto, quantity });
    setQuantity(1);
  };

  return (
    <div className="producto-card">
      {/* Imagen con fallback si no carga */}
      <img
        src={imagen}
        alt={nombre}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src =
            "https://via.placeholder.com/150?text=Imagen+no+disponible";
        }}
      />

      <h3>{nombre}</h3>
      <p>{descripcion}</p>
      <p className="precio">${Number(precio).toFixed(2)}</p>
      <p className="stock">Stock: {stock}</p>

      <div className="cantidadContainer">
        <button className="btn-cantidad" onClick={handleDecrement}>
          -
        </button>
        <span className="cantidad">{quantity}</span>
        <button className="btn-cantidad" onClick={handleIncrement}>
          +
        </button>
      </div>
      <button className="btn-ver-detalle" onClick={() => setShowModal(true)}>
        Ver más
      </button>

      <div className="producto-botones-wrapper">
        <div className="botones-container">
          <button className="btn" onClick={handleAddClick}>
            Agregar al carrito
          </button>
        </div>

        <div className="boton-carrito-container">
          <button className="btn-open-cart" onClick={handleOpenCart}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="#733702" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon-cart" viewBox="0 0 24 24">
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          </button>
        </div>
      </div>

      {/* Modal con validación y fallback */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="modal-close" onClick={() => setShowModal(false)}>
              ×
            </button>
            <img
              src={imagen}
              alt={nombre}
              className="modal-image"
              loading="lazy"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://via.placeholder.com/150?text=Sin+imagen";
              }}
            />
            <h2>{nombre}</h2>
            <p>{descripcion}</p>
            <p>
              <strong>Precio:</strong> ${Number(precio).toFixed(2)}
            </p>
            <p>
              <strong>Stock:</strong> {stock}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
