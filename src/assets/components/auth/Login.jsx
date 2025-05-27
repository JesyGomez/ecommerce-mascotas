import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = onLogin(username, password);
    if (success) {
      navigate("/tienda");
    } else {
      setError("Usuario o contraseña incorrectos.");
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
        /><br />
        <input
          type="password"
          placeholder="Contraseña" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br />
        <button type="submit">Entrar</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
         <p className="login-footer">¿No tenés cuenta? <a href="/registro">Registrate</a></p>
       </div>
     </div>
    </div>
  );
};

export default Login;
