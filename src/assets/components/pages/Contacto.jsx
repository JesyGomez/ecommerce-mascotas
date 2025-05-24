import React from "react";
import "../estaticos/Estilos.css";

function Contacto() {
  return (
    <>
    <div className="contacto-container">
      <div className="contacto-box">
        <h2>¡Hablemos! 🐶🐱</h2>
        <p>¿Tenés dudas, sugerencias o querés colaborar? Completá el formulario y te responderemos pronto.</p>
        <form>
          <label htmlFor="nombre">Nombre</label>
          <input type="text" id="nombre" name="nombre" placeholder="Tu nombre" required />

          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" placeholder="tumail@gmail.com" required />

          <label htmlFor="mensaje">Mensaje</label>
          <textarea id="mensaje" name="mensaje" rows="4" placeholder="Dejanos tu mensaje y te contestaremos a la brevedad" required></textarea>

          <button type="submit">Enviar mensaje</button>
        </form>
      </div>
    </div>
    </>
  );
}

export default Contacto;
