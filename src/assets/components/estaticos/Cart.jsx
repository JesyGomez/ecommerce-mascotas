import React, { useContext } from "react";
import { FaTrashAlt, FaPlus, FaMinus, FaTimes } from "react-icons/fa";
import { CartContext } from "../context/CartContext";

const Cart = () => {
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    handleRemoveItem,
    handleUpdateQuantity,
    handleCheckout,
  } = useContext(CartContext);

  // Validación de estructura
  if (!Array.isArray(cartItems)) {
    console.error("cartItems no es un array:", cartItems);
    return null;
  }

  // Filtro de items válidos para evitar errores
  const validCartItems = cartItems.filter(
    (item) =>
      item &&
      typeof item.precio === "number" &&
      typeof item.quantity === "number"
  );

  const total = validCartItems.reduce(
    (sum, item) => sum + item.precio * item.quantity,
    0
  );

  return (
    <div className={`cart-drawer ${isCartOpen ? "open" : ""}`}>
      <div className="cart-header">
        <h2>Carrito de Compras</h2>
        <button
          onClick={() => setIsCartOpen(false)}
          className="close-button"
          aria-label="Cerrar carrito"
        >
          <FaTimes />
        </button>
      </div>

      <div className="cart-content">
        {validCartItems.length === 0 ? (
          <p className="cart-empty-message">El carrito está vacío 😔</p>
        ) : (
          <>
            <ul className="cart-items">
              {validCartItems.map((item) => (
                <li key={item.id} className="cart-item">
                  <div className="item-info">
                    {item.imagen && (
                      <img
                        src={item.imagen}
                        alt={item.nombre || "Producto"}
                        className="item-image"
                      />
                    )}
                    <div>
                      <span className="item-name">{item.nombre || "Sin nombre"}</span>
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
                          handleUpdateQuantity(item.id, item.quantity - 1)
                        }
                        disabled={item.quantity <= 1}
                      >
                        <FaMinus />
                      </button>
                      <span className="quantity-display">{item.quantity}</span>
                      <button
                        className="btn-quantity"
                        onClick={() =>
                          handleUpdateQuantity(item.id, item.quantity + 1)
                        }
                      >
                        <FaPlus />
                      </button>
                    </div>
                    <button
                      className="remove-item-button"
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      <FaTrashAlt />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="cart-summary">
              <h3>Total: ${total.toFixed(2)}</h3>
              <button className="checkout-button" onClick={handleCheckout}>
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
