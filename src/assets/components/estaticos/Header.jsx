import React, { useState } from "react";
import { Link } from "react-router-dom";
import Cart from "./Cart";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket, faShoppingCart, faBars, faUser } from '@fortawesome/free-solid-svg-icons';
const Header = ({ cartItems, onOpenCart, onLogout, isAuthenticated, currentUser }) => {
  const [isCartOpen, setCartOpen] = useState(false);
const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">🐾 Patitas</Link>
      </div>

      <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        <FontAwesomeIcon icon={faBars} />
      </button>

      <ul className={`navbar-links ${menuOpen ? 'active' : ''}`}>
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
        <button onClick={onOpenCart} title="Ver carrito" className="cart-button">
          <FontAwesomeIcon icon={faShoppingCart} className="cart-icon" />
        </button>

        <Cart
          cartItems={cartItems}
          isOpen={isCartOpen}
          onClose={() => setCartOpen(false)}
        />
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
<Link to="/login" title="Iniciar sesión" className="login-button">
  <FontAwesomeIcon icon={faUser} className="login-icon" />
</Link>
        )}

      </div>
    </nav>
  );
};

export default Header;
