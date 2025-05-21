import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../estaticos/Estilos.css";
import ProductList from '../estaticos/ProductList';
import Loader from '../Loader';

function Home({ productos, cargando, error }) {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <header className="hero">
        <h1>Bienvenidos a Patitas 🐶🐱</h1>
        <p>Tu tienda online de confianza para consentir a tus mascotas</p>
        <button className="btn-hero" onClick={() => navigate('/productos')}>
          Explorar productos
        </button>
      </header>

      {/* Mostrar loader si cargando es true */}
      {cargando ? (
        <Loader />
      ) : error ? (
        <p>Ocurrió un error al cargar los productos.</p>
      ) : (
    <ProductList productos={productos.slice(0, 4)} />
      )}

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
    </div>
  );
}

export default Home;
