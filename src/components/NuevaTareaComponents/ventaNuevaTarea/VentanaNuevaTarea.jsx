import React, { useContext, useEffect, useState } from "react";
import NuevaCategoria from "../NuevaCategoria/NuevaCategoria";
import { TareasContext } from "../../../context/TareasContext";
import { ColorContext } from "../../../context/ColorContext";
import Select from "react-select";
import { RiCloseLargeFill } from "react-icons/ri";
import "./VentanaNuevaTarea.css";

function VentanaNuevaTarea({ handleBtnNuevaTarea, Name }) {
  const [tarea, setTarea] = useState("");
  const [fecha, setFecha] = useState("");
  const [categoria, setCategoria] = useState({ nombre: "", color: "#000000" });

  const { tareas, setTareas } = useContext(TareasContext);
  const { categorias } = useContext(ColorContext);

  const [ventanaCat, setVentanaCat] = useState(false);

  const handleBtnNuevaCat = () => {
    setVentanaCat(true);
  };

  const handleCerrarNuevaCat = () => {
    setVentanaCat(false);
  };

  const handleTarea = (e) => {
    setTarea(e.target.value);
  };

  const handleFecha = (e) => {
    setFecha(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Crear nueva tarea con la categoría seleccionada
    const nuevaTarea = {
      tarea,
      fecha,
      categoria, // Aquí se guarda la categoría como un objeto {nombre, color}
      checked:false
    };

    // Actualizar tareas en el contexto
    setTareas([...tareas, nuevaTarea]);

    // Resetear formulario
    setTarea("");
    setFecha("");
    setCategoria({ nombre: "", color: "#000000" });

    // Cerrar la ventana
    setTimeout(() => {
      handleBtnNuevaTarea();
    }, 100);
  };


  // Opciones para el select de categorías
  const opcionesDeColores = categorias.map((categoriaItem) => ({
    value: categoriaItem, // Pasamos todo el objeto de la categoría como valor
    label: (
      <div style={{ display: "flex", alignItems: "center" }}>
        <div
          style={{
            width: "20px",
            height: "20px",
            backgroundColor: categoriaItem.color,
            marginRight: "10px",
          }}
        ></div>
        {categoriaItem.nombre}
      </div>
    ),
  }));

  // Manejador para el cambio de categoría
  const handleCategoriaChange = (selectedOption) => {
    setCategoria(selectedOption.value); // Seleccionar todo el objeto de la categoría
  };

  return (
    <div className={Name}>
      <div className="modalContainer">
        <form onSubmit={handleSubmit} className="formModal">
          <section className="formTarea">
            <label className="label">
              Tarea:
              <input type="text" value={tarea} onChange={handleTarea} />
            </label>
            <label className="label">
              Fecha:
              <input type="date" value={fecha} onChange={handleFecha} />
            </label>
          </section>

          <section>
            <label className="label">
              Categoría:
              <Select
                className="select"
                placeholder="Selecciona una categoría"
                noOptionsMessage={() => "No hay categorías"}
                options={opcionesDeColores}
                onChange={handleCategoriaChange}
                value={opcionesDeColores.find(
                  (option) =>
                    option.value.nombre === categoria.nombre &&
                    option.value.color === categoria.color
                )} // Buscar la opción correcta por nombre y color
              />
            </label>
          </section>

          <section className="formNuevaCat">
            <button
              type="button"
              onClick={handleBtnNuevaCat}
              className="btnCrearCat"
            >
              Crear Categoria
            </button>
            <NuevaCategoria
              handleCerrarNuevaCat={handleCerrarNuevaCat}
              className={ventanaCat ? "visible" : "oculto"}
            />
          </section>

          <button
            type="submit"
            disabled={
              tarea.trim() === "" ||
              fecha.trim() === "" ||
              categoria.nombre.trim() === ""
            } className="btnNuevaTarea"
          >
            Agregar tarea
          </button>
        </form>
        <button type="button" onClick={handleBtnNuevaTarea} className="btnCerrarVentana">
          <RiCloseLargeFill />
        </button>
      </div>
    </div>
  );
}

export default VentanaNuevaTarea;
