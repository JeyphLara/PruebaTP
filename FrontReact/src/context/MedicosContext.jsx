import React, { createContext, useState, useEffect } from 'react';
import { obtenerMedicos } from '../services/medicosService'; 

const MedicosContext = createContext();

const MedicosProvider = ({ children }) => {
  const [medicos, setMedicos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMedicos = async () => {
      try {
        const data = await obtenerMedicos();  
        setMedicos(data);  
        setLoading(false);
      } catch (err) {
        setError('Error al obtener los médicos');
        setLoading(false);
      }
    };

    fetchMedicos();
  }, []);

  return (
    <MedicosContext.Provider value={{ medicos, loading, error }}>
      {children}
    </MedicosContext.Provider>
  );
};

export { MedicosContext, MedicosProvider };
