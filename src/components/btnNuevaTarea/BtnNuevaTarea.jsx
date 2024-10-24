import React, { useState } from 'react';
import VentanaNuevaTarea from '../ventaNuevaTarea/VentanaNuevaTarea';

function BtnNuevaTarea() {

  const [ventana, setVentana] = useState(false);

  const handleBtnNuevaTarea = () => {
    setVentana(!ventana);
  }
  const handleCerrar = () => {
    setVentana(false)
  } 

  return (
    <div>
      {ventana ? <VentanaNuevaTarea handleCerrar={handleCerrar}/> : (<button onClick={handleBtnNuevaTarea}>Nueva Tarea</button>)}
    </div>
  );
}

export default BtnNuevaTarea;
