import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./RegistroMedico.css";
const RegistroMedicoForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    password: "",
    rol: "medico",
    cedula: "",
    especialidad: "",
    ciudad: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { nombre, email, password, rol, cedula, especialidad, ciudad } =
        formData;

      const data = {
        nombre,
        email,
        password,
        rol,
        medico: rol === "medico" ? { cedula, especialidad, ciudad } : null,
      };

      const response = await axios.post(
        "http://localhost:3000/api/usuarios/register",
        data
      );
      alert("Usuario registrado exitosamente");
      navigate("/");
    } catch (error) {
      console.error("Error registrando usuario", error);
      alert("Error al registrar usuario");
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form">
        <h2 className="form-title">Registrar Asociado</h2>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          onChange={handleChange}
          value={formData.nombre}
          required
          className="form-input"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          value={formData.email}
          required
          className="form-input"
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          onChange={handleChange}
          value={formData.password}
          required
          className="form-input"
        />
        <select
          name="rol"
          placeholder="Rol"
          onChange={handleChange}
          value={formData.rol}
          className="form-input"
          required
        >
          <option value="medico">Médico</option>
          <option value="admin">Admin</option>
        </select>
        {formData.rol === "medico" && (
          <>
            <input
              type="text"
              name="cedula"
              placeholder="Cédula"
              onChange={handleChange}
              value={formData.cedula}
              required
              className="form-input"
            />
            <input
              type="text"
              name="especialidad"
              placeholder="Especialidad"
              onChange={handleChange}
              value={formData.especialidad}
              required
              className="form-input"
            />
            <input
              type="text"
              name="ciudad"
              placeholder="Ciudad"
              onChange={handleChange}
              value={formData.ciudad}
              required
              className="form-input"
            />
          </>
        )}
        <button type="submit" className="form-submit-button">
          Registrar
        </button>
        <button
          type="button"
          onClick={() => navigate("/")}
          className="form-register-button"
        >
          Iniciar sesion
        </button>
      </form>
    </div>
  );
};

export default RegistroMedicoForm;
