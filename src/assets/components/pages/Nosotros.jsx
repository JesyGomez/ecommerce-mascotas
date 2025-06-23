import React from "react";
import "../estaticos/Estilos.css";

function Nosotros() {
  return (
    <>
    <div className="nosotros-container">
      <div className="nosotros-box">
        <h2>Sobre Patitas 🐾</h2>
        <p>
          En <strong>Patitas</strong> somos un equipo de amantes de las mascotas
          que cree en darles siempre lo mejor. Nuestra misión es ofrecerles a
          tus peluditos productos de alta calidad, pensados para su salud,
          comodidad y diversión.
        </p>
        <p>
          Nacimos con la idea de crear un espacio donde puedas encontrar
          fácilmente todo lo que tu mascota necesita: alimento premium,
          juguetes, accesorios de cuidado, y mucho más. Además, creemos en la
          educación y el bienestar animal, por lo que compartimos consejos y
          guías en nuestro blog.
        </p>
<div className="equipo">
  <div className="miembro">
    <i className="fas fa-user-md icono-equipo"></i>
    <h4>Ethan Ariel</h4>
    <p>Fundador & Veterinario</p>
  </div>
  <div className="miembro">
    <i className="fas fa-bullhorn icono-equipo"></i>
    <h4>Liam Ignacio</h4>
    <p>Marketing & Comunidad</p>
  </div>
  <div className="miembro">
    <i className="fas fa-headset icono-equipo"></i>
    <h4>Mia Abril</h4>
    <p>Atención al Cliente</p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default Nosotros;
