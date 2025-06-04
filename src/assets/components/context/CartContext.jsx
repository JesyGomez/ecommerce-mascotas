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

  useEffect(() => {
    const usuarios = JSON.parse(localStorage.getItem("usuarios"));

    if (!usuarios || usuarios.length === 0) {
      const usuariosIniciales = [
        { username: "Emiliano1", password: "1234" },
        { username: "Jesica", password: "1234" },
      ];
      localStorage.setItem("usuarios", JSON.stringify(usuariosIniciales));
    }
  }, []);

  // Verificar si hay usuario logueado al iniciar
  useEffect(() => {
    const user = localStorage.getItem("usuarioActual");
    if (user) {
      setIsAuthenticated(true);
      setCurrentUser(user);
    }
  }, []);

  // Cargar productos
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

  // Login
  const handleLogin = (username, password) => {
    const usuariosGuardados =
      JSON.parse(localStorage.getItem("usuarios")) || [];
    const usuarioValido = usuariosGuardados.find(
      (u) => u.username === username && u.password === password
    );

    if (usuarioValido) {
      setIsAuthenticated(true);
      setCurrentUser(username);
      localStorage.setItem("usuarioActual", username);
      return true;
    } else {
      return false;
    }
  };

  // Logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    setCartItems([]);
    setCurrentUser(null);
    localStorage.removeItem("usuarioActual");
  };

  // Carrito
  const handleOpenCart = () => setIsCartOpen(true);
  // const handleAddToCart = (producto) => {
  //   setCartItems((prevItems) => {
  //     const existingItem = prevItems.find(item => item.id === producto.id);
  //     if (existingItem) {
  //       return prevItems.map(item =>
  //         item.id === producto.id
  //           ? { ...item, quantity: item.quantity + producto.quantity }
  //           : item
  //       );
  //     } else {
  //       return [...prevItems, { ...producto }];
  //     }
  //   });
  // };
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
    // Estamos accediendo al valor anterior del carrito (prevItems), y usamos .filter()
    // para crear un nuevo array con todos los ítems
    // excepto el que tenga el id que queremos eliminar.
  };

  const handleCheckout = () => {
    alert("¡Gracias por tu compra!");
    setCartItems([]);
    setIsCartOpen(false);
  };
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
//   Pasamos los valores al context / Es como un cajón de herramientas

);
};
