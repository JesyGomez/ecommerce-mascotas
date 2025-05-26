import React, { useState } from "react";
import { Link } from "react-router-dom";
import Cart from "./Cart";



const Header = ({ cartItems, onOpenCart }) => {
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
        <Link to="/login">👤</Link>
        <button onClick={onOpenCart}>
        🛒
      </button>
        <Cart cartItems={cartItems} isOpen={isCartOpen} onClose={() => setCartOpen(false)}/>
      </div>
    </nav>
  );
}

export default Header;
