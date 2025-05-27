import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Registro = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();

  const handleRegistro = (e) => {
    e.preventDefault();

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const existe = usuarios.find(u => u.username === username);

    if (existe) {
      setMensaje("⚠️ El usuario ya existe.");
      return;
    }

    const nuevoUsuario = { username, password };
    usuarios.push(nuevoUsuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    setMensaje("✅ Usuario registrado con éxito.");
    setTimeout(() => {
      navigate("/login");
    }, 1500);
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Registrarse 🐾</h2>
        <form onSubmit={handleRegistro}>
          <input
            type="text"
            placeholder="Usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          /><br />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          /><br />
          <button type="submit">Registrarme</button>
        </form>
        {mensaje && <p style={{ color: mensaje.includes("✅") ? "green" : "red" }}>{mensaje}</p>}
        <p className="login-footer">¿Ya tenés cuenta? <a href="/login">Iniciar sesión</a></p>
      </div>
    </div>
  );
};

export default Registro;
