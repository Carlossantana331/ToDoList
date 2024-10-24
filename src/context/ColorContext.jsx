import { createContext, useState } from "react";

export const ColorContext = createContext();

export function ColorProvider({ children }) {
    const [categorias, setCategorias] = useState([]);

    return (
        <ColorContext.Provider value={{ categorias, setCategorias }}>
            {children}
        </ColorContext.Provider>
    );
}
