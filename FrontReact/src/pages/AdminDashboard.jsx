import { useState, useEffect } from "react";
import axios from "axios";
import BotonAtras from "../components/botonAtras";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  const [medicos, setMedicos] = useState([]);
  const [pacientes, setPacientes] = useState([]);
  const [form, setForm] = useState({ nombre: "", cedula: "", medico_id: "" });
  const [selectedMedico, setSelectedMedico] = useState("");
  const [selectedPaciente, setSelectedPaciente] = useState("");
  const [activeSection, setActiveSection] = useState("registrarPaciente");

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/medicos/verMedicos")
      .then((res) => setMedicos(res.data))
      .catch((err) => console.error("Error obteniendo médicos", err));

    axios
      .get("http://localhost:3000/api/pacientes/ver")
      .then((res) => setPacientes(res.data))
      .catch((err) => console.error("Error obteniendo pacientes", err));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/api/pacientes/crear", form);
      alert("Paciente registrado con éxito");
      setForm({ nombre: "", cedula: "", medico_id: "" });
    } catch (error) {
      console.error("Error registrando paciente", error);
      alert("Error registrando paciente");
    }
  };

  // Lógica para reasignar un paciente a un nuevo médico
  const reasignarPaciente = async () => {
    if (!selectedMedico || !selectedPaciente) {
      alert("Debe seleccionar tanto un paciente como un médico.");
      return;
    }
    try {
      const response = await axios.put(
        `http://localhost:3000/api/pacientes/${selectedPaciente}`,
        {
          medico_id: selectedMedico,
        }
      );
      if (response.status === 200) {
        setPacientes(
          pacientes.map((paciente) =>
            paciente.id === selectedPaciente
              ? { ...paciente, medico_id: selectedMedico }
              : paciente
          )
        );
        alert("Paciente reasignado con éxito");
      } else {
        alert("No se pudo reasignar el paciente");
      }
    } catch (error) {
      console.error("Error reasignando paciente", error);
      alert("Error al reasignar paciente");
    }
  };

  return (
    <div className="admin-dashboard">
      <BotonAtras />
      <div className="navbar">
        <div className="navbar-container">
          <button
            className="navbar-link"
            onClick={() => setActiveSection("registrarPaciente")}
          >
            Registrar Paciente
          </button>
          <button
            className="navbar-link"
            onClick={() => setActiveSection("verMedicos")}
          >
            Ver Médicos
          </button>
          <button
            className="navbar-link"
            onClick={() => setActiveSection("verPacientes")}
          >
            Ver Pacientes
          </button>
          <button
            className="navbar-link"
            onClick={() => setActiveSection("reasignarPaciente")}
          >
            Reasignar Paciente
          </button>
        </div>
      </div>

      <div className="dashboard-content">
        {activeSection === "registrarPaciente" && (
          <div>
            <h2>Registrar Paciente</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="nombre"
                placeholder="Nombre"
                value={form.nombre}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="cedula"
                placeholder="Cédula"
                value={form.cedula}
                onChange={handleChange}
                required
              />
              <select
                name="medico_id"
                value={form.medico_id}
                onChange={handleChange}
                required
              >
                <option value="">Seleccionar Médico</option>
                {medicos.map((medico) => (
                  <option key={medico.id} value={medico.id}>
                    {medico.nombre}
                  </option>
                ))}
              </select>
              <button type="submit">Registrar</button>
            </form>
          </div>
        )}

        {activeSection === "verMedicos" && (
          <div>
            <h2> Médicos registrados</h2>
            <ul>
              {medicos.map((medico) => (
                <li key={medico.id}>
                  <strong>Nombre:</strong> {medico.nombre} <br />
                  <strong>Especialidad:</strong> {medico.especialidad} <br />
                  <strong>Ciudad:</strong> {medico.ciudad}
                </li>
              ))}
            </ul>
          </div>
        )}

        {activeSection === "verPacientes" && (
          <div>
            <h2> Pacientes registrados</h2>
            <ul>
              {pacientes.map((paciente) => {
                const medicoAsignado = medicos.find(
                  (medico) => medico.id === paciente.medico_id
                );
                return (
                  <li key={paciente.id}>
                    <strong>Nombre:</strong> {paciente.nombre} <br />
                    <strong>Cédula:</strong> {paciente.cedula} <br />
                    <strong>Asignado a:</strong>{" "}
                    {medicoAsignado
                      ? medicoAsignado.nombre
                      : "Sin médico asignado"}
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        {activeSection === "reasignarPaciente" && (
          <div>
            <h2>Reasignar Paciente</h2>
            <div>
              <select
                value={selectedPaciente}
                onChange={(e) => setSelectedPaciente(e.target.value)}
              >
                <option value="">Seleccione un paciente</option>
                {pacientes.map((paciente) => (
                  <option key={paciente.id} value={paciente.id}>
                    {paciente.nombre}
                  </option>
                ))}
              </select>

              <select
                value={selectedMedico}
                onChange={(e) => setSelectedMedico(e.target.value)}
              >
                <option value="">Seleccione un médico</option>
                {medicos.map((medico) => (
                  <option key={medico.id} value={medico.id}>
                    {medico.nombre}
                  </option>
                ))}
              </select>

              <button onClick={reasignarPaciente}>Reasignar</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
