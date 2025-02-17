// src/services/medicosService.js

import axios from 'axios';

const API_URL = 'http://localhost:4000/medicos';

// Obtener la lista de médicos
const obtenerMedicos = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data[0]; // Acceder al primer array de la respuesta
  } catch (error) {
    throw new Error('Error al obtener médicos');
  }
};

export { obtenerMedicos };
