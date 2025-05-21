import React from 'react';

const ProductList = ({ productos }) => {
  return (
    <>
    <div style={{flexWrap: 'wrap', justifyContent: 'space-evenly', }}>
    <div className="product-list">
      {productos.map((producto) => (
        <div className="producto-card" key={producto.id}>
          <img src={producto.imagen} alt={producto.nombre} />
          <h3>{producto.nombre}</h3>
          <p>{producto.descripcion}</p>
          <p className="precio">${producto.precio}</p>
          <p className="stock">Stock: {producto.stock}</p>
          <div className="cantidadContainer">
            <button className="btn-cantidad">-</button>
            <span className="cantidad">1</span>
            <button className="btn-cantidad">+</button>
          </div>
          <button className="btn">Agregar al carrito 🛒</button>
        </div>
      ))}
    </div>
    </div>
    </>
  );
};

export default ProductList;
