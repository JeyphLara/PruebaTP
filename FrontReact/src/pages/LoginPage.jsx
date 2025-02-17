import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await fetch("http://localhost:3000/api/usuarios/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Error al iniciar sesión");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("rol", data.rol);
      localStorage.setItem("user", JSON.stringify(data.user));

      if (data.rol === "admin") {
        navigate("/admindashboard");
      } else {
        navigate("/medicodashboard");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleLogin} className="form">
        <h2 className="form-title">Iniciar Sesión</h2>
        {error && <p className="error-message">{error}</p>}
        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-input"
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-input"
          required
        />
        <button type="submit" className="form-submit-button">Ingresar</button>
        <button
          type="button"
          onClick={() => navigate("/registro")}
          className="form-register-button"
        >
          Crear Cuenta
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
