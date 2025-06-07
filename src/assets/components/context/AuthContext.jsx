import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

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
    setCurrentUser(null);
    localStorage.removeItem("usuarioActual");
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        currentUser,
        handleLogin,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
