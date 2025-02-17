import React from 'react';
import { useNavigate } from "react-router-dom";
import './BotonAtras.css'; 

function BotonAtras() {
    const navigate = useNavigate();
    
    const handleBack = () => {
        navigate(-1); 
    };

    return (
        <button className="back-button" onClick={handleBack}>
            Volver Atrás
        </button>
    );
}

export default BotonAtras;
