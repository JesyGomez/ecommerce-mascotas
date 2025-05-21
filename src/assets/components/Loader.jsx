import React from 'react';
import "../components/estaticos/Estilos.css";

const Loader = () => {
  return (
    <div className="loader-container">
 <img
        src="https://i.gifer.com/46sy.gif"
        alt="Cargando animalitos"
        className="gif-animalitos"
      />
      <p className="loader-text">Cargando amiguitos...</p>
    </div>
  );
};

export default Loader;
