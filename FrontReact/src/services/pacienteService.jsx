import axios from 'axios';

const API_URL = 'http://localhost:3000/api/pacientes';

// Obtener todos los pacientes
export const getPacientes = async () => {
    const response = await axios.get(`${API_URL}/ver`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    return response.data;
};

// Crear un nuevo paciente
export const createPaciente = async (pacienteData) => {
    const response = await axios.post(`${API_URL}/crear`, pacienteData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    return response.data;
};

// Obtener un paciente por ID
export const getPacienteById = async (id) => {
    const response = await axios.get(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    return response.data;
};

// Actualizar un paciente
export const updatePaciente = async (id, pacienteData) => {
    const response = await axios.put(`${API_URL}/${id}`, pacienteData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    return response.data;
};

// Eliminar un paciente
export const deletePaciente = async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    return response.data;
};
