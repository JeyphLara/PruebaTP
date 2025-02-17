import { useState, useEffect } from "react";
import axios from "axios";

const PacienteForm = ({ onPacienteRegistrado }) => {
  const [nombre, setNombre] = useState("");
  const [cedula, setCedula] = useState("");
  const [medicoId, setMedicoId] = useState("");
  const [fechaConsulta, setFechaConsulta] = useState("");
  const [medicos, setMedicos] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/medicos/ver", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => setMedicos(response.data))
      .catch((error) => console.error("Error cargando médicos", error));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:3000/api/pacientes/crear",
        {
          nombre,
          cedula,
          medico_id: medicoId,
          fecha_ultima_consulta: fechaConsulta,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      alert("Paciente registrado con éxito");
      onPacienteRegistrado();
      setNombre("");
      setCedula("");
      setMedicoId("");
      setFechaConsulta("");
    } catch (error) {
      console.error("Error registrando paciente", error);
      alert("Error registrando paciente");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded shadow-md">
      <h2 className="text-xl font-bold mb-2">Registrar Paciente</h2>
      <input
        type="text"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        placeholder="Nombre"
        required
        className="block w-full p-2 border rounded mb-2"
      />
      <input
        type="text"
        value={cedula}
        onChange={(e) => setCedula(e.target.value)}
        placeholder="Cédula"
        required
        className="block w-full p-2 border rounded mb-2"
      />
      <select
        value={medicoId}
        onChange={(e) => setMedicoId(e.target.value)}
        required
        className="block w-full p-2 border rounded mb-2"
      >
        <option value="">Seleccione un médico</option>
        {medicos.map((medico) => (
          <option
            key={medico.id}
            value={medico.id}
          >{`${medico.nombre} - ${medico.especialidad}`}</option>
        ))}
      </select>
      <input
        type="date"
        value={fechaConsulta}
        onChange={(e) => setFechaConsulta(e.target.value)}
        required
        className="block w-full p-2 border rounded mb-2"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Registrar
      </button>
    </form>
  );
};

export default PacienteForm;
