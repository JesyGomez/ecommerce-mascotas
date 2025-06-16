import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRightFromBracket,
  faShoppingCart,
  faBars,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";

const Header = () => {
  const navigate = useNavigate();

  const { isAuthenticated, currentUser, handleLogout } = useContext(AuthContext);
  const { cartItems, setCartItems, handleOpenCart } = useContext(CartContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const logoutHandler = () => {
    if (currentUser?.username) {
      localStorage.setItem(`cart_${currentUser.username}`, JSON.stringify(cartItems));
    }
    return handleLogout().then(() => {
      setCartItems([]);
      setMenuOpen(false);
      navigate("/");
    });
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <NavLink to="/">🐾 Patitas</NavLink>
      </div>

      <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} type="button">
        <FontAwesomeIcon icon={faBars} />
      </button>

      <ul className={`navbar-links ${menuOpen ? "active" : ""}`}>
        <li>
          <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
            Inicio
          </NavLink>
        </li>
        <li className="dropdown">
          <NavLink to="/tienda" className={({ isActive }) => (isActive ? "active" : "")}>
            Tienda ▾
          </NavLink>
          <ul className="dropdown-menu">
            <li><NavLink to="/tienda">Juguetes</NavLink></li>
            <li><NavLink to="/tienda">Alimentación</NavLink></li>
            <li><NavLink to="/tienda">Higiene y Cuidado</NavLink></li>
            <li><NavLink to="/tienda">Transporte</NavLink></li>
          </ul>
        </li>
        <li>
          <NavLink to="/nosotros" className={({ isActive }) => (isActive ? "active" : "")}>
            Nosotros
          </NavLink>
        </li>
        <li>
          <NavLink to="/contacto" className={({ isActive }) => (isActive ? "active" : "")}>
            Contacto
          </NavLink>
        </li>

        {isAuthenticated && currentUser?.role === "admin" && (
          <li>
            <NavLink
              to="/admin"
              className={({ isActive }) => (isActive ? "active admin-button" : "admin-button")}
            >
              🛠️ Panel de Administración
            </NavLink>
          </li>
        )}

        <li>
          <button
            onClick={handleOpenCart}
            title="Ver carrito"
            className="cart-button"
            type="button"
          >
            <FontAwesomeIcon icon={faShoppingCart} className="cart-icon" />
            {cartItems.length > 0 && <span className="cart-count">{cartItems.length}</span>}
          </button>
        </li>
      </ul>

      <div className="navbar-icons">
        {isAuthenticated ? (
          <>
            <span className="user-saludo">👋 ¡Hola, {currentUser?.username || "Usuario"}!</span>
            <button
              onClick={logoutHandler}
              title="Cerrar sesión"
              className="logout-icon"
              type="button"
            >
              <FontAwesomeIcon icon={faRightFromBracket} />
            </button>
          </>
        ) : (
          <NavLink to="/login" title="Iniciar sesión" className="login-button">
            <FontAwesomeIcon icon={faUser} className="login-icon" />
          </NavLink>
        )}
      </div>
    </nav>
  );
};

export default Header;
