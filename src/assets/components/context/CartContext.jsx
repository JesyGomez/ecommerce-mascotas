import { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";
import Swal from "sweetalert2";
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [busqueda, setBusqueda] = useState("");
  useEffect(() => {
    if (currentUser?.username) {
      const savedCart = localStorage.getItem(`cart_${currentUser.username}`);
      if (savedCart) {
        try {
          setCartItems(JSON.parse(savedCart));
        } catch (e) {
          console.error("Error al leer el carrito guardado:", e);
          setCartItems([]);
        }
      } else {
        setCartItems([]);
      }
    } else {
      setCartItems([]);
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentUser?.username) {
      localStorage.setItem(
        `cart_${currentUser.username}`,
        JSON.stringify(cartItems)
      );
    }
  }, [cartItems, currentUser]);

  useEffect(() => {
    fetch("https://683e32f81cd60dca33dab4f0.mockapi.io/productos/productos")
      .then((res) => {
        if (!res.ok) throw new Error("Error al cargar los datos");
        return res.json();
      })
      .then((data) => {
        
        setProductos(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const productosFiltrados = productos.filter((producto) =>
    producto?.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  const handleAddToCart = (producto) => {
    if (!currentUser) {
      Swal.fire({
        icon: "warning",
        title: "Debes iniciar sesión",
        text: "Inicia sesión para agregar productos al carrito",
        confirmButtonText: "OK",
      });
      return;
    }

    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === producto.id);
      if (existingItem) {
        Swal.fire({
          icon: "success",
          title: "¡Cantidad actualizada!",
          showConfirmButton: false,
          timer: 1200,
        });

        return prevItems.map((item) =>
          item.id === producto.id
            ? { ...item, quantity: item.quantity + (producto.quantity || 1) }
            : item
        );
      } else {
        Swal.fire({
          icon: "success",
          title: "¡Producto agregado!",
          showConfirmButton: false,
          timer: 1200,
        });

        return [
          ...prevItems,
          { ...producto, quantity: producto.quantity || 1 },
        ];
      }
    });
  };

  const handleUpdateQuantity = (id, newQuantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item
      )
    );
  };

  const handleRemoveItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleCheckout = () => {
    Swal.fire({
      icon: "success",
      title: "¡Compra realizada!",
      text: "Gracias por tu compra. Te esperamos pronto 😊",  
      showConfirmButton: false,
      timer: 1500,
    });
    setCartItems([]);
    setIsCartOpen(false);
  };

  const handleOpenCart = () => setIsCartOpen((prev) => !prev);

  return (
    <CartContext.Provider
      value={{
        productos,
        loading,
        error,
        cartItems,
        setCartItems,
        isCartOpen,
        handleAddToCart,
        handleRemoveItem,
        handleUpdateQuantity,
        handleOpenCart,
        handleCheckout,
        setIsCartOpen,
        productosFiltrados,
        busqueda,
        setBusqueda,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
