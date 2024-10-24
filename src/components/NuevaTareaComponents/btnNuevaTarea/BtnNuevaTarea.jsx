import React, { useState } from 'react';
import VentanaNuevaTarea from '../ventaNuevaTarea/VentanaNuevaTarea';
import './btnNuevaTarea.css';

function BtnNuevaTarea() {

  const [ventana, setVentana] = useState(false);

  const handleBtnNuevaTarea = () => {
    setVentana(!ventana);
  }

  return (
    <div className="btnNuevaTareaContainer">
      <button onClick={handleBtnNuevaTarea} className="btnNuevaTareaIcon" >Nueva Tarea</button>
      <VentanaNuevaTarea handleBtnNuevaTarea={handleBtnNuevaTarea} Name={ventana ? "modal modalShow" : "modal" }/>
    </div>
  );
}

export default BtnNuevaTarea;
