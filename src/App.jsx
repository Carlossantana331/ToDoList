import BtnNuevaTarea from './components/NuevaTareaComponents/btnNuevaTarea/BtnNuevaTarea'
import './App.css'
import { TareasProvider } from './context/TareasContext'
import { ColorProvider } from './context/ColorContext'
import { CardProvider } from './context/CardContext'
import ListaTareasCard from './components/ListaTareasComponents/ListaTareas/ListaTareasCard'

function App() {


  return (
    <TareasProvider>
      <ColorProvider>
        <CardProvider> {/* CartProvider envuelve correctamente los componentes que consumen tareas */}
          <BtnNuevaTarea />
          <ListaTareasCard />
        </CardProvider>
      </ColorProvider>
    </TareasProvider>

  )
}

export default App
