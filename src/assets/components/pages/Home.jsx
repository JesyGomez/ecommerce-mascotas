import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../estaticos/Estilos.css";

const Home = () => { 
  const navigate = useNavigate();

  return (
    <>
      <div className="home-container">
        <header className="hero">
          <h1>Bienvenidos a Patitas 🐶🐱</h1>
          <p>Tu tienda online de confianza para consentir a tus mascotas</p>
          <button className="btn-hero" onClick={() => navigate('/productos')}>
            Explorar Productos
          </button>
        </header>

        <section className="about-us-home">
          <div className="about-us-content">
            <h2>Amor y Cuidado en Cada Producto 🧡</h2>
            <p>
              En Patitas, entendemos el vínculo especial que tienes con tus compañeros peludos.
              Por eso, seleccionamos cuidadosamente cada artículo, asegurando la más alta calidad
              y el bienestar de tus mascotas. Desde alimentos nutritivos hasta juguetes que los mantendrán
              felices y activos.
            </p>
            <button className="btn-secondary" onClick={() => navigate('/nosotros')}>
              Conoce Más Sobre Nosotros
            </button>
          </div>
          <div className="about-us-image">
            <img src="https://images.unsplash.com/photo-1623387641168-d9803ddd3f35?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2F0JTIwYW5kJTIwZG9nfGVufDB8fDB8fHww" alt="Mascotas felices y cuidadas" />
            <img src="https://www.infobae.com/resizer/v2/https%3A%2F%2Fs3.amazonaws.com%2Farc-wordpress-client-uploads%2Finfobae-wp%2Fwp-content%2Fuploads%2F2017%2F10%2F24115355%2FGettyImages-178786947.jpg?auth=a80a7c097f2345b6c1d89fba935445b6509da1806aecb7f21685d9f19d6c9716&smart=true&width=350&height=197&quality=85" alt="Mascotas felices y cuidadas" /> 
          </div>
        </section>

        <section className="destacados">
          <h2>¿Qué vas a encontrar?</h2>
          <div className="features">
            <div className="feature">
              <img src="https://media.istockphoto.com/id/1447483608/es/foto/bolas-de-juguete-para-perros-hueso-y-cuerda-aisladas-sobre-blanco.jpg?s=612x612&w=0&k=20&c=WkaUumpyt49jXaLTO915ZSAygRFO2e1dytx07ogDjLU=" alt="Juguetes" />
              <h3>Juguetes divertidos</h3>
              <p>Para que tu mascota se mantenga activa y feliz.</p>
            </div>
            <div className="feature">
              <img src="https://media.istockphoto.com/id/165907425/es/foto/comida-para-perro.jpg?s=612x612&w=0&k=20&c=anocdQoiLB7OaP9XAq3tyTpxwVIpOzn7yLhyR3y9d20=" alt="Alimentación" />
              <h3>Alimentos Premium</h3>
              <p>Nutrición de calidad para perros y gatos.</p>
            </div>
            <div className="feature">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPqKFM3aol11ltGt4voR5ehc6_k46BlajWqA&s" alt="Accesorios" />
              <h3>Accesorios cómodos</h3>
              <p>Camas, correas, cepillos y más.</p>
            </div>
          </div>
        </section>

        <section className="final-cta">
          <h2>¿Listo para consentir a tu mejor amigo?</h2>
          <p>Descubre todo lo que Patitas tiene para ofrecerle.</p>
          <button className="btn-hero" onClick={() => navigate('/productos')}>
            ¡Comprar Ahora!
          </button>
        </section>

      </div>
    </>
  );
};

export default Home;