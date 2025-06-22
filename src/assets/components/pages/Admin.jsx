import React, { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import Loader from "../Loader";
import "../estaticos/Estilos.css";
import { Helmet } from "react-helmet-async";

const Admin = () => {
  const {
    productos,
    loading,
    error,
    editando,
    mensaje,
    form,
    handleAgregar,
    handleEliminar,
    handleEditar,
    handleActualizar,
    handleChange,
  } = useContext(AdminContext);

  if (loading) return <Loader />;
  if (error) return <p className="error">Error al cargar productos 😓</p>;

  return (
    <div className="admin-container">
      <Helmet>
        <title>Panel de Administración</title>
        <meta
          name="panel de administración"
          content="Panel para agregar o editar productos en el e-commerce de Patitas."
        />
      </Helmet>

      <h1>Panel de Administración</h1>

      {mensaje && (
        <div
          className={`mensaje-exito ${
            mensaje.includes("eliminado") ? "mensaje-eliminado" : ""
          }`}
        >
          {mensaje}
        </div>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          editando ? handleActualizar() : handleAgregar(form);
        }}
        className="admin-form"
      >
        <h2>{editando ? "Editar Producto" : "Agregar Producto"}</h2>

        <input
          type="text"
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
          placeholder="Nombre"
          required
        />
        <input
          type="number"
          name="precio"
          value={form.precio}
          onChange={handleChange}
          placeholder="Precio"
          required
        />
        <input
          type="number"
          name="stock"
          value={form.stock}
          onChange={handleChange}
          placeholder="Stock disponible"
          required
        />
        <input
          type="text"
          name="categoria"
          value={form.categoria}
          onChange={handleChange}
          placeholder="Categoría"
          required
        />
        <textarea
          name="descripcion"
          value={form.descripcion}
          onChange={handleChange}
          placeholder="Descripción"
          required
        />
        <input
          type="text"
          name="imagen"
          value={form.imagen}
          onChange={handleChange}
          placeholder="URL de la imagen"
          required
        />

        <button type="submit">
          {editando ? "Actualizar Producto" : "Agregar Producto"}
        </button>
      </form>

      <h2>Lista de Productos</h2>
      <div className="admin-productos-grid">
        {productos.map((producto) => (
          <div key={producto.id} className="admin-producto-card">
            <img
              src={producto.imagen}
              alt={producto.nombre}
              className="admin-producto-img"
            />
            <h3>{producto.nombre}</h3>
            <p>{producto.descripcion}</p>
            <p>
              <strong>${producto.precio}</strong>
            </p>
            <p>Stock: {producto.stock}</p>
            <p>Categoría: {producto.categoria}</p>
            <button onClick={() => handleEditar(producto)}>Editar</button>
            <button
              onClick={() => handleEliminar(producto.id)}
              className="btn-eliminar"
            >
              Eliminar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;
