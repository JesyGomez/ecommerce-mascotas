import React from "react";
import { Helmet } from "react-helmet-async";

function FormularioProductos({ form, onChange, onSubmit, editando, errores }) {
  return (
    <form onSubmit={onSubmit} className="admin-form">
      <Helmet>
        <title>
          {editando ? "Editar Producto" : "Agregar Producto"} | Admin - Patitas
        </title>
        <meta
          name="description"
          content="Formulario para agregar o editar productos en el e-commerce de Patitas."
        />
      </Helmet>

      <label>Nombre:</label>
      <input
        type="text"
        name="nombre"
        value={form.nombre}
        onChange={onChange}
        placeholder="Nombre del producto"
        aria-required="true"
      />
      {errores.nombre && <p className="error">{errores.nombre}</p>}

      <label>Precio:</label>
      <input
        type="number"
        name="precio"
        value={form.precio}
        onChange={onChange}
        placeholder="Precio en $"
        aria-required="true"
      />
      {errores.precio && <p className="error">{errores.precio}</p>}

      <label>Stock:</label>
      <input
        type="number"
        name="stock"
        value={form.stock}
        onChange={onChange}
        placeholder="Cantidad en stock"
        min="0"
        aria-required="true"
      />
      {errores.stock && <p className="error">{errores.stock}</p>}

      <label>Categoría:</label>
      <input
        type="text"
        name="categoria"
        value={form.categoria}
        onChange={onChange}
        placeholder="Ej. Sillas, Mesas, etc."
        aria-required="true"
      />
      {errores.categoria && <p className="error">{errores.categoria}</p>}

      <label>Descripción:</label>
      <textarea
        name="descripcion"
        value={form.descripcion}
        onChange={onChange}
        placeholder="Describe el producto"
        aria-required="true"
      />
      {errores.descripcion && <p className="error">{errores.descripcion}</p>}

      <label>Imagen (URL):</label>
      <input
        type="text"
        name="imagen"
        value={form.imagen}
        onChange={onChange}
        placeholder="https://ejemplo.com/imagen.jpg"
        aria-required="true"
      />
      {errores.imagen && <p className="error">{errores.imagen}</p>}

      <button type="submit">
        {editando ? "Actualizar Producto" : "Agregar Producto"}
      </button>
    </form>
  );
}

export default FormularioProductos;
