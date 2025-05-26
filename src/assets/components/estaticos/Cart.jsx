import React from "react";
import { FaTrashAlt, FaPlus, FaMinus, FaTimes } from "react-icons/fa";

const Cart = (props) => {
  const {
    cartItems,
    isOpen,
    onClose,
    onRemoveItem,
    onUpdateQuantity,
    onCheckout,
  } = props;
  console.log("Props recibidos en Cart:", props);
  console.log("Tipos recibidos:", {
    onRemoveItem: typeof onRemoveItem,
    onUpdateQuantity: typeof onUpdateQuantity,
    onCheckout: typeof onCheckout,
  }); // Me aseguro de que cartItems sea un array
  if (!Array.isArray(cartItems)) {
    console.error("cartItems no es un array:", cartItems);
    return null;
  }

  // Calcular el total del carrito
  const total = cartItems.reduce(
    (sum, item) => sum + item.precio * item.quantity,
    0
  );

  return (
    <div className={`cart-drawer ${isOpen ? "open" : ""}`}>
      <div className="cart-header">
        <h2>Carrito de Compras</h2>
        <button
          onClick={onClose}
          className="close-button"
          aria-label="Cerrar carrito"
        >
          <FaTimes />
        </button>
        
      </div>

      <div className="cart-content">
        {cartItems.length === 0 ? (
          <p className="cart-empty-message">El carrito está vacío 😔</p>
        ) : (
          <>
            <ul className="cart-items">
              {cartItems.map((item) => (
                <li key={item.id} className="cart-item">
                  <div className="item-info">
                    <img
                      src={item.imagen}
                      alt={item.nombre}
                      className="item-image"
                    />
                    <div>
                      <span className="item-name">{item.nombre}</span>
                      <span className="item-price">
                        ${item.precio.toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <div className="item-actions">
                    <div className="item-quantity-control">
                      <button
                        className="btn-quantity"
                        onClick={() =>
                          onUpdateQuantity(item.id, item.quantity - 1)
                        }
                      >
                        <FaMinus />
                      </button>
                      <span className="quantity-display">{item.quantity}</span>
                      <button
                        className="btn-quantity"
                        onClick={() =>
                          onUpdateQuantity(item.id, item.quantity + 1)
                        }
                      >
                        <FaPlus />
                      </button>
                    </div>
                    <button
                      className="remove-item-button"
                      onClick={() => onRemoveItem(item.id)}
                    >
                      <FaTrashAlt />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="cart-summary">
              <h3>Total: ${total.toFixed(2)}</h3>
              <button className="checkout-button" onClick={onCheckout}>
                Finalizar Compra
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
