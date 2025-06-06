import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const { handleLogin } = useContext(CartContext);

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!username || !password) {
    setError("Por favor, completá todos los campos");
    return;
  }

  try {
    const user = await handleLogin(username, password);

    if (user) {
      setError(null);
      if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/tienda");
      }
    } else {
      setError("Usuario o contraseña incorrectos");
    }
  } catch (error) {
    setError("Ocurrió un error inesperado, intentá más tarde");
    console.error(error);
  }
};

  return (
    <div>
      <div className="login-container">
        <div className="login-box">
          <h2>Iniciar Sesión 🐾</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <br />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <br />
            <button type="submit">Entrar</button>
          </form>
          {error && typeof error === "string" && (
            <p style={{ color: "red" }}>{error}</p>
          )}
          {error?.username && <p style={{ color: "red" }}>{error.username}</p>}
          {error?.password && <p style={{ color: "red" }}>{error.password}</p>}
          {error?.general && <p style={{ color: "red" }}>{error.general}</p>}
          <p className="login-footer">
            ¿No tenés cuenta? <a href="/registro">Registrate</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
