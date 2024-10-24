import {createContext, useState} from 'react'

export const TareasContext = createContext();

export function TareasProvider ({children}) {
    const [tareas, setTareas] = useState([])


    return(
        <TareasContext.Provider value = {{tareas, setTareas}}>
            {children}
        </TareasContext.Provider>
    )
}
