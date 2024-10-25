import { useContext } from "react";
import { CardContext } from "../../../context/CardContext";
import { TareasContext } from "../../../context/TareasContext"; // Importa TareasContext
import { FaRegTrashAlt } from "react-icons/fa";
import { ImRadioUnchecked } from "react-icons/im";
import { FaCheckCircle } from "react-icons/fa";
import "./ListaTareasCard.css";

// Funciones para determinar si un color es oscuro
function hexToRgb(hex) {
  hex = hex.replace(/^#/, "");
  if (hex.length === 3) {
    hex = hex.split("").map(char => char + char).join("");
  }
  const bigint = parseInt(hex, 16);
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255,
  };
}

function isColorDark(color) {
  const rgb = hexToRgb(color);
  const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255;
  return luminance < 0.5;
}

function ListaTareasCard() {
  const { card, setCard } = useContext(CardContext);
  const { setTareas } = useContext(TareasContext); // Accede a setTareas

  const actualizarTareas = (card) => {
    const tareasActualizadas = card.flatMap(categoria => 
      categoria.tareas.map(tarea => ({
        tarea: tarea.tarea,
        fecha: tarea.fecha,
        categoria: { nombre: categoria.nombre, color: categoria.color }
      }))
    );
    setTareas(tareasActualizadas);
  };

  const handleCheck = (categoriaIndex, tareaIndex) => {
    const updatedCard = card.map((categoria, i) => {
      if (i === categoriaIndex) {
        return {
          ...categoria,
          tareas: categoria.tareas.map((tarea, j) => {
            if (j === tareaIndex) {
              return { ...tarea, checked: !tarea.checked };
            }
            return tarea;
          }),
        };
      }
      return categoria;
    });

    setCard(updatedCard);
  };

  const handleDelete = (categoriaIndex, tareaIndex) => {
    const updatedCard = card.map((categoria, index) => {
      if (index === categoriaIndex) {
        return {
          ...categoria,
          tareas: categoria.tareas.filter((_, i) => i !== tareaIndex),
        };
      }
      return categoria;
    });
    setCard(updatedCard);
    
    // Actualiza el contexto de tareas
    actualizarTareas(updatedCard);
  };

  const handleDeleteCat = (index) => {
    const updatedCard = card.filter((_, i) => i !== index);
    setCard(updatedCard);

    // Actualiza el contexto de tareas
    actualizarTareas(updatedCard);
  };

  return (
    <div className="cardContainer">
      {card.map((categoria, index) => (
        <div key={index} className="card">
          <div style={{ backgroundColor: categoria.color }} className="cardHeader">
            <h2 style={{ color: isColorDark(categoria.color) ? "#fff" : "#000" }}>
              {categoria.nombre}
            </h2>
            <button onClick={() => handleDeleteCat(index)} className="deleteCatBtn">
              <FaRegTrashAlt />
            </button>
          </div>

          <ul className="cardList">
            {categoria.tareas.map((tarea, i) => (
              <li key={i} className={`cardItem ${tarea.checked ? "checked" : ""}`}>
                <div className="cardItemContent">
                  <div>
                    <button onClick={() => handleCheck(index, i)} className="checkBtn">
                      {tarea.checked ? <FaCheckCircle /> : <ImRadioUnchecked />}
                    </button>
                  </div>

                  <div className="cardItemText">
                    <div>{tarea.tarea}</div>
                    <div>{tarea.fecha}</div>
                  </div>
                </div>
                <button onClick={() => handleDelete(index, i)} className="deleteTaskBtn">
                  <FaRegTrashAlt />
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default ListaTareasCard;
