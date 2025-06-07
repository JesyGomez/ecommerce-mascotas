import { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext"; 

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

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
      localStorage.setItem(`cart_${currentUser.username}`, JSON.stringify(cartItems));
    }
  }, [cartItems, currentUser]);

  useEffect(() => {
    fetch("/data/data.json")
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

  const handleAddToCart = (producto) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === producto.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === producto.id
            ? { ...item, quantity: item.quantity + (producto.quantity || 1) }
            : item
        );
      } else {
        return [...prevItems, { ...producto, quantity: producto.quantity || 1 }];
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
    alert("¡Gracias por tu compra!");
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
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
