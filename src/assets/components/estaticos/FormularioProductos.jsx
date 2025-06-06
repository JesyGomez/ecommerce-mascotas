import React from 'react';

function FormularioProductos({ form, onChange, onSubmit, editando, errores }) {
  return (
    <form onSubmit={onSubmit} className="admin-form">
      <h2>{editando ? 'Editar Producto' : 'Agregar Producto'}</h2>

      <label>Nombre:</label>
      <input
        type="text"
        name="nombre"
        value={form.nombre}
        onChange={onChange}
        placeholder="Nombre del producto"
      />
      {errores.nombre && <p className="error">{errores.nombre}</p>}

      <label>Precio:</label>
      <input
        type="number"
        name="precio"
        value={form.precio}
        onChange={onChange}
        placeholder="Precio en $"
      />
      {errores.precio && <p className="error">{errores.precio}</p>}

      <label>Descripción:</label>
      <textarea
        name="descripcion"
        value={form.descripcion}
        onChange={onChange}
        placeholder="Describe el producto"
      />
      {errores.descripcion && <p className="error">{errores.descripcion}</p>}

      <label>Imagen (URL):</label>
      <input
        type="text"
        name="imagen"
        value={form.imagen}
        onChange={onChange}
        placeholder="https://ejemplo.com/imagen.jpg"
      />
      {errores.imagen && <p className="error">{errores.imagen}</p>}

      <button type="submit">{editando ? 'Actualizar Producto' : 'Agregar Producto'}</button>
    </form>
  );
}

export default FormularioProductos;
