import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import BotonAtras from "../components/botonAtras";
import "./MedicoDashboard.css"; // Asegúrate de tener un archivo CSS con este nombre

const MedicoDashboard = () => {
  const [pacientes, setPacientes] = useState([]);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [medicoId, setMedicoId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("user"));
    if (users && users.length > 0) {
      const medico = users.find((user) => user.rol === "medico");
      if (medico && medico.id) {
        let newMedico = medico.id - 1;
        setMedicoId(newMedico);
      }
    }
  }, []);

  useEffect(() => {
    if (medicoId === null) return;

    const fetchPacientes = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          "http://localhost:3000/api/pacientes/ver",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = await response.json();
        setPacientes(data);
        const pacientesFiltrados = data.filter(
          (paciente) => paciente.medico_id === medicoId
        );
        setPacientes(pacientesFiltrados);
        if (!response.ok)
          throw new Error(data.error || "Error obteniendo pacientes");
      } catch (err) {
        setError(err.message);
      }
    };

    fetchPacientes();
  }, [medicoId]);

  const registrarConsulta = async (idPaciente) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:3000/api/pacientes/${idPaciente}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            fecha_ultima_consulta: selectedDate.toISOString().split("T")[0],
          }),
        }
      );
      if (!response.ok) throw new Error("No se pudo registrar la consulta");
      setPacientes(
        pacientes.map((p) =>
          p.id === idPaciente
            ? {
                ...p,
                fecha_ultima_consulta: selectedDate.toISOString().split("T")[0],
              }
            : p
        )
      );
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="dashboard-container">
        <BotonAtras/>
      <h2 className="dashboard-title">Dashboard Médico</h2>
      {error && <p className="error-message">{error}</p>}
      <ul className="pacientes-list">
        {pacientes.length > 0 ? (
          pacientes.map((paciente) => (
            <li key={paciente.id} className="paciente-item">
              <div className="paciente-info">
                <span className="paciente-name">{paciente.nombre}</span>
                <span className="paciente-consulta">
                  Última consulta:{" "}
                  {paciente.fecha_ultima_consulta || "No registrada"}
                </span>
              </div>
              <div className="consulta-controls">
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  className="datepicker"
                />
                <button
                  className="button"
                  onClick={() => registrarConsulta(paciente.id)}
                >
                  Registrar Consulta
                </button>
              </div>
            </li>
          ))
        ) : (
          <p className="no-pacientes">No hay pacientes asignados.</p>
        )}
      </ul>
    </div>
  );
};

export default MedicoDashboard;
