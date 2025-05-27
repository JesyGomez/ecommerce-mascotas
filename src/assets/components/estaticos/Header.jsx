import React, { useState } from "react";
import { Link } from "react-router-dom";
import Cart from "./Cart";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

const Header = ({ cartItems, onOpenCart, onLogout, isAuthenticated, currentUser }) => {
  const [isCartOpen, setCartOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">🐾 Patitas</Link>
      </div>

      <ul className="navbar-links">
        <li><Link to="/">Inicio</Link></li>
        <li className="dropdown">
          <Link to="/tienda">Tienda ▾</Link>
          <ul className="dropdown-menu">
            <li><Link to="/tienda">Juguetes</Link></li>
            <li><Link to="/tienda">Alimentación</Link></li>
            <li><Link to="/tienda">Higiene y Cuidado</Link></li>
            <li><Link to="/tienda">Transporte</Link></li>
          </ul>
        </li>
        <li><Link to="/nosotros">Nosotros</Link></li>
        <li><Link to="/contacto">Contacto</Link></li>
      </ul>

      <div className="navbar-icons">
        {isAuthenticated ? (
          <>
            <span className="user-saludo">👋 ¡Hola, {currentUser}!</span>
          <button onClick={onLogout} title="Cerrar sesión" className="logout-icon">
            <FontAwesomeIcon icon={faRightFromBracket} />
          </button>
          </>
        ) : (
          <Link to="/login">👤</Link>
        )}

        <button onClick={onOpenCart} title="Ver carrito">🛒</button>

        <Cart
          cartItems={cartItems}
          isOpen={isCartOpen}
          onClose={() => setCartOpen(false)}
        />
      </div>
    </nav>
  );
};

export default Header;
