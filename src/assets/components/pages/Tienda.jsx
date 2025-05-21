import React, { useState } from "react";
import "../estaticos/Estilos.css";

function Tienda() {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);

  const mostrarCategoria = (categoria) => {
    setCategoriaSeleccionada(categoria);
  };

  const renderContenido = () => {
    switch (categoriaSeleccionada) {
      case "alimentacion":
        return <p>Estos son nuestros productos de alimentación para mascotas.</p>;
      case "juguetes":
        return <p>Descubrí nuestros juguetes para perros y gatos.</p>;
      case "higiene":
        return <p>Productos de higiene y cuidado para tus mascotas.</p>;
      case "transporte":
        return <p>Transportadoras, mochilas y más para viajar con tu mascota.</p>;
      default:
        return <p>Elegí una categoría para ver los productos.</p>;
    }
  };

  return (
    <div className="tienda-container">
      <h1 className="tienda-titulo">Nuestra Tienda</h1>
      <p className="tienda-intro">Explorá nuestras categorías de productos para mascotas</p>

      <div className="categorias-grid">
        <div className="categoria-card">
          <img src="/img/alimento.png" alt="Alimentación" />           
          <h2>Alimentación</h2>
          <p>Comida premium para perros y gatos.</p>
          <button className="btn" onClick={() => mostrarCategoria("alimentacion")}>
            Ver productos
          </button>
        </div>

        <div className="categoria-card">
          <img src="/img/juguete.png" alt="Juguetes" />
          <h2>Juguetes</h2>
          <p>Juguetes divertidos para mantener a tu mascota activa.</p>
          <button className="btn" onClick={() => mostrarCategoria("juguetes")}>
            Ver productos
          </button>
        </div>

        <div className="categoria-card">
          <img src="/img/higiene.png" alt="Higiene y cuidado" />
          <h2>Higiene y Cuidado</h2>
          <p>Productos para el bienestar de tus mascotas.</p>
          <button className="btn" onClick={() => mostrarCategoria("higiene")}>
            Ver productos
          </button>
        </div>

        <div className="categoria-card">
          <img src="/img/transporte.png" alt="Transporte" />
          <h2>Transporte</h2>
          <p>Mochilas, transportadoras y más.</p>
          <button className="btn" onClick={() => mostrarCategoria("transporte")}>
            Ver productos
          </button>
        </div>
      </div>

      <div className="contenido-categoria">
        <h3>Productos</h3>
        {renderContenido()}
      </div>
    </div>
  );
}

export default Tienda;
