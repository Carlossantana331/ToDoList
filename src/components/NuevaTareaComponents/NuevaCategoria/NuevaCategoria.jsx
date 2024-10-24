import { useState, useContext } from "react";
import { ColorContext } from "../../../context/ColorContext";
import { MdKeyboardArrowUp } from "react-icons/md";
import "./NuevaCategoria.css";

function NuevaCategoria({ handleCerrarNuevaCat, className }) {
  const [color, setColor] = useState("#000000");
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
    setColor("#000000");
    handleCerrarNuevaCat();
  };

  return (
    <div className={className}>
      <div className="inputNuevaCat">
        <label className="catName">
          Nombre de la categoria:
          <input
            type="text"
            value={nombre}
            onChange={handleName}
            className="catInput"
          />
        </label>
        <label className="catColor">
          Color:
          <input
            type="color"
            value={color}
            onChange={handleColor}
            className="colorInput"
          />
        </label>
      </div>

      <div className="botonesNuevaCat">
        <button onClick={addColor} disabled={nombre.trim() === ""} className="addCatBtn" >
          Agregar Categoria
        </button>

        <button type="button" onClick={handleCerrarNuevaCat} className="cerrarCatBtn">
          Cerrar <MdKeyboardArrowUp />
        </button>
      </div>
    </div>
  );
}

export default NuevaCategoria;
