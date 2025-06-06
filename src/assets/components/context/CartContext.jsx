import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // ✅ Cargar usuario desde localStorage correctamente
  useEffect(() => {
    const storedUser = localStorage.getItem("usuarioActual");
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setIsAuthenticated(true);
        setCurrentUser(user);
      } catch {
        localStorage.removeItem("usuarioActual");
      }
    }
  }, []);

  // ✅ Cargar productos desde JSON
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

  // ✅ Login usando users.json
  const handleLogin = async (username, password) => {
    try {
      const res = await fetch("/data/users.json", { cache: "no-store" });
      if (!res.ok) throw new Error("No se pudo cargar el archivo de usuarios");

      const users = await res.json();
      const userValid = users.find(
        (u) => u.username === username && u.password === password
      );

      if (userValid) {
        setIsAuthenticated(true);
        setCurrentUser(userValid);
        localStorage.setItem("usuarioActual", JSON.stringify(userValid));
        return userValid;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      return null;
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCartItems([]);
    setCurrentUser(null);
    localStorage.removeItem("usuarioActual");
  };

  const handleOpenCart = () => setIsCartOpen(true);

  const handleAddToCart = (producto) => {
    if (!isAuthenticated) {
      alert("Debes iniciar sesión para agregar productos al carrito.");
      return;
    }

    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === producto.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === producto.id
            ? { ...item, quantity: item.quantity + producto.quantity }
            : item
        );
      } else {
        return [...prevItems, { ...producto }];
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
  try {
    return (
      <CartContext.Provider
        value={{
          productos,
          loading,
          error,
          cartItems,
          isCartOpen,
          isAuthenticated,
          currentUser,
          handleLogin,
          handleLogout,
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
  } catch (e) {
    console.error("Error en CartProvider:", e);
    return <div>Ocurrió un error en CartProvider: {e.message}</div>;
  }
};
