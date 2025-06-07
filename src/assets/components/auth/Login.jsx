import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const { handleLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

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
        {error && <p style={{ color: "red" }}>{error}</p>}
        <p className="login-footer">
          ¿No tenés cuenta? <Link to="/registro">Registrate</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
