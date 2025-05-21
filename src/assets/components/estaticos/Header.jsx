import React from "react";
import { Link } from "react-router-dom";


function Header() {
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
        <Link to="/login">👤</Link>
        <Link to="/carrito">🛒</Link>
      </div>
    </nav>
  );
}

export default Header;
