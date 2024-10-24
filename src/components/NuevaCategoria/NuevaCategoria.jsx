import { useState, useContext } from "react";
import { ColorContext } from '../../context/ColorContext';

function NuevaCategoria({ handleCerrarNuevaCat }) {
  const [color, setColor] = useState("#fff");
  const [nombre, setNombre] = useState("");

  const { categorias, setCategorias } = useContext(ColorContext);

  const handleColor = (e) => {
    setColor(e.target.value);
  };

  const handleName = (e) => {
    setNombre(e.target.value);
  };

  const addColor = () => {
    const nuevaCat = {
      color,
      nombre,
    };

    setCategorias([...categorias, nuevaCat]);
    setNombre("");
    setColor("#fff");
    handleCerrarNuevaCat();
  };

  return (
    <div className="nuevaCat">
      <label>
        Nombre de la categoria:
        <input type="text" value={nombre} onChange={handleName} />
      </label>
      <label>
        Color:
        <input type="color" value={color} onChange={handleColor} />
      </label>
      <button onClick={addColor} disabled={nombre.trim() === ""}>
        Agregar Categoria
      </button>
      <button type="button" onClick={handleCerrarNuevaCat}>Cerrar</button>
    </div>
  );
}

export default NuevaCategoria;
