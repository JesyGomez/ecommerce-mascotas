import React from "react";
import "../estaticos/Estilos.css";

function Login() {
  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Iniciar Sesión 🐾</h2>
        <form>
          <label htmlFor="usuario">Usuario</label>
          <input type="text" id="usuario" name="usuario" placeholder="Ingresá tu usuario" required />

          <label htmlFor="password">Contraseña</label>
          <input type="password" id="password" name="password" placeholder="Ingresá tu contraseña" required />

          <button type="submit">Ingresar</button>
        </form>
        <p className="login-footer">¿No tenés cuenta? <a href="/registro">Registrate</a></p>
      </div>
    </div>
  );
}

export default Login;
