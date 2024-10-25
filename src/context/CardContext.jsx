import { createContext, useEffect, useState, useContext } from "react";
import { TareasContext } from "./TareasContext";

export const CardContext = createContext()

export function CardProvider ({children}) {

    const [card, setCard] = useState([])
    const {tareas} = useContext(TareasContext)

    const tareasPorCategorias = () => {

        const tareasAgrupadas = {}

        tareas.forEach(({tarea, fechaFormateada, categoria}) => {
            const claveCategoria = `${categoria.nombre}-${categoria.color}`

            if (tareasAgrupadas[claveCategoria]) {
                tareasAgrupadas[claveCategoria].tareas.push ({tarea, fechaFormateada})
            } else {
                tareasAgrupadas[claveCategoria] = {
                    nombre: categoria.nombre, 
                    color: categoria.color,
                    tareas: [{tarea, fechaFormateada}]
                }
            }

        });

        setCard(Object.values(tareasAgrupadas))
    };


    useEffect(() => {
        tareasPorCategorias()
    }, [tareas])


    return (
        <CardContext.Provider value={{card, setCard}}>
            {children}
        </CardContext.Provider>
    )
}