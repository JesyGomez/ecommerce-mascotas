import React, { useEffect, useState } from "react";
import FormularioProductos from "../estaticos/FormularioProductos";
import "../estaticos/Estilos.css";

const API_URL =
  "https://683e32f81cd60dca33dab4f0.mockapi.io/productos/productos";

const Admin = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [editando, setEditando] = useState(null);
  const [mensaje, setMensaje] = useState("");
  const [form, setForm] = useState({
    nombre: "",
    precio: "",
    descripcion: "",
    imagen: "",
  });

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        setProductos(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al cargar productos:", error);
        setError(true);
        setLoading(false);
      });
  }, []);

  const handleAgregar = (producto) => {
    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(producto),
    })
      .then((res) => res.json())
      .then((nuevoProducto) => {
        setProductos([...productos, nuevoProducto]);
        setForm({ nombre: "", precio: "", descripcion: "", imagen: "" }); // Limpiar campos
        setMensaje("✅ Producto agregado con éxito");

        // Ocultar mensaje luego de 3 segundos
        setTimeout(() => setMensaje(""), 3000);
      });
  };

  const handleEliminar = (id) => {
    const confirmar = window.confirm(
      "¿Estás segur@ de que querés eliminar este producto?"
    );
    if (!confirmar) return;

    fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    }).then(() => {
      setProductos(productos.filter((p) => p.id !== id));
      setMensaje("🗑️ Producto eliminado con éxito");

      // Ocultar el mensaje a los 3 segundos
      setTimeout(() => setMensaje(""), 3000);
    });
  };

  const handleEditar = (producto) => {
    setEditando(producto.id);
    setForm(producto);
  };

  const handleActualizar = () => {
    fetch(`${API_URL}/${editando}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then((actualizado) => {
        setProductos(
          productos.map((p) => (p.id === actualizado.id ? actualizado : p))
        );
        setEditando(null);
        setForm({ nombre: "", precio: "", descripcion: "", imagen: "" });
        setMensaje("✏️ Producto actualizado con éxito");
        setTimeout(() => setMensaje(""), 3000);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  if (loading) return <p className="loading">Cargando productos...</p>;
  if (error) return <p className="error">Error al cargar productos 😓</p>;

  return (
    <div className="admin-container">
      <h1>Panel de Administración</h1>

      {mensaje && (
        <div
          className={`mensaje-exito ${
            mensaje.includes("Producto eliminado") ? "mensaje-eliminado" : ""
          }`}
        >
          {mensaje}
        </div>
      )}
      <h2>{editando ? "Editar Producto" : "Agregar Producto"}</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          editando ? handleActualizar() : handleAgregar(form);
        }}
        className="admin-form"
      >
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
