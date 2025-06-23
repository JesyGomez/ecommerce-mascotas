import React, { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const AdminContext = createContext();

const API_URL = "https://683e32f81cd60dca33dab4f0.mockapi.io/productos/productos";

export const AdminProvider = ({ children }) => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [editando, setEditando] = useState(null);
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
        toast.error("Error al cargar productos 😓");
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

const handleAgregar = async (producto) => {
  // Forzamos tipos numéricos
  const productoFormateado = {
    ...producto,
    precio: Number(producto.precio),
    stock: Number(producto.stock),
  };

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productoFormateado),
    });
    if (!res.ok) throw new Error("Error al agregar producto");

    const nuevoProducto = await res.json();
    setProductos([...productos, nuevoProducto]);
    resetForm();
  } catch (error) {
    console.error(error);
  }
};


  const handleEliminar = async (id) => {
    if (!window.confirm("¿Estás segur@ de que querés eliminar este producto?")) return;

    try {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Error al eliminar producto");

      setProductos(productos.filter(p => p.id !== id));
      // toast.success("🗑️ Producto eliminado con éxito");
    } catch (error) {
      console.error(error);
      // toast.error("❌ No se pudo eliminar el producto");
    }
  };

  const handleEditar = (producto) => {
    setEditando(producto.id);
    setForm(producto);
  };

  const handleActualizar = async () => {
  // Forzamos tipos numéricos también acá
  const productoFormateado = {
    ...form,
    precio: Number(form.precio),
    stock: Number(form.stock),
  };

  try {
    const res = await fetch(`${API_URL}/${editando}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productoFormateado),
    });
    if (!res.ok) throw new Error("Error al actualizar producto");

    const actualizado = await res.json();
    setProductos(productos.map(p => (p.id === actualizado.id ? actualizado : p)));
    setEditando(null);
    resetForm();
  } catch (error) {
    console.error(error);
  }
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
