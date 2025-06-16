import { createContext, useEffect, useState } from "react";
import Swal from "sweetalert2";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
const [loadingAuth, setLoadingAuth] = useState(true);
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
        setLoadingAuth(false); // Terminé de cargar el estado

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

  // handleLogout devuelve promesa que resuelve cuando termina Swal y limpia estado
  const handleLogout = () => {
    return Swal.fire({
      icon: 'success',
      title: '¡Hasta luego!',
      text: 'Gracias por visitarnos, vuelve pronto 😉',
      timer: 2000,
      showConfirmButton: false,
      timerProgressBar: true,
      background: '#733702',
      color: '#fff',
      didOpen: () => {
        Swal.showLoading();
      },
    }).then(() => {
      setIsAuthenticated(false);
      setCurrentUser(null);
      localStorage.removeItem("usuarioActual");
    });
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        currentUser,
        handleLogin,
        handleLogout,
        loadingAuth,  // Expongo el estado
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
