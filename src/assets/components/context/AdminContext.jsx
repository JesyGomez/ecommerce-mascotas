import React, { createContext, useEffect, useState } from "react";

export const AdminContext = createContext();

const API_URL = "https://683e32f81cd60dca33dab4f0.mockapi.io/productos/productos";

export const AdminProvider = ({ children }) => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [editando, setEditando] = useState(null);
  const [mensaje, setMensaje] = useState("");
  const [form, setForm] = useState({
    nombre: '',
    precio: '',
    stock: '',
    imagen: '',
    descripcion: '',
    categoria: ''
  });

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        setProductos(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error al cargar productos:", error);
        setError(true);
        setLoading(false);
      });
  }, []);

  const resetForm = () => {
    setForm({
      nombre: '',
      precio: '',
      stock: '',
      imagen: '',
      descripcion: '',
      categoria: ''
    });
  };

  const handleAgregar = (producto) => {
    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(producto),
    })
      .then(res => res.json())
      .then(nuevoProducto => {
        setProductos([...productos, nuevoProducto]);
        resetForm();
        setMensaje("✅ Producto agregado con éxito");
        setTimeout(() => setMensaje(""), 3000);
      });
  };

  const handleEliminar = (id) => {
    if (!window.confirm("¿Estás segur@ de que querés eliminar este producto?")) return;
    fetch(`${API_URL}/${id}`, { method: "DELETE" })
      .then(() => {
        setProductos(productos.filter(p => p.id !== id));
        setMensaje("🗑️ Producto eliminado con éxito");
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
      .then(res => res.json())
      .then(actualizado => {
        setProductos(productos.map(p => (p.id === actualizado.id ? actualizado : p)));
        setEditando(null);
        resetForm();
        setMensaje("✏️ Producto actualizado con éxito");
        setTimeout(() => setMensaje(""), 3000);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  return (
    <AdminContext.Provider value={{
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
      resetForm
    }}>
      {children}
    </AdminContext.Provider>
  );
};
