import React from "react";
import './Navbar'
function Navbar() {
  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <button
            className="navbar-link"
            onClick={() => navigate("/registrar-paciente")}
          >
            Registrar Paciente
          </button>
          <button
            className="navbar-link"
            onClick={() => navigate("/ver-medicos")}
          >
            Ver Médicos
          </button>
          <button
            className="navbar-link"
            onClick={() => navigate("/ver-pacientes")}
          >
            Ver Pacientes
          </button>
          <button
            className="navbar-link"
            onClick={() => navigate("/reasignar-pacientes")}
          >
            Reasignar Pacientes
          </button>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
