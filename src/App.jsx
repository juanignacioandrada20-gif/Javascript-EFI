/*
SITEC — GUÍA DE DEFENSA (comentarios de estudio, no cambian la lógica)
ARCHIVO: src/App.jsx
FUNCIÓN GENERAL: Componente principal: instala PlanProvider, Topbar, Sidebar, rutas y modal de favoritos.
PARA EXPLICAR AL PROFESOR: App organiza la interfaz y define qué pantalla corresponde a cada URL.

EXPLICACIÓN DE LAS LÍNEAS DEL CÓDIGO ORIGINAL:
Línea 1: Importación: trae funciones/componentes de otro módulo para reutilizarlos.
Línea 2: Importación: trae funciones/componentes de otro módulo para reutilizarlos.
Línea 3: Importación: trae funciones/componentes de otro módulo para reutilizarlos.
Línea 4: Importación: trae funciones/componentes de otro módulo para reutilizarlos.
Línea 5: Importación: trae funciones/componentes de otro módulo para reutilizarlos.
Línea 6: Importación: trae funciones/componentes de otro módulo para reutilizarlos.
Línea 7: Importación: trae funciones/componentes de otro módulo para reutilizarlos.
Línea 8: Importación: trae funciones/componentes de otro módulo para reutilizarlos.
Línea 9: Importación: trae funciones/componentes de otro módulo para reutilizarlos.
Línea 10: Importación: trae funciones/componentes de otro módulo para reutilizarlos.
Línea 11: Importación: trae funciones/componentes de otro módulo para reutilizarlos.
Línea 12: Importación: trae funciones/componentes de otro módulo para reutilizarlos.
Línea 13: Importación: trae funciones/componentes de otro módulo para reutilizarlos.
Línea 14: Importación: trae funciones/componentes de otro módulo para reutilizarlos.
Línea 15: Importación: trae funciones/componentes de otro módulo para reutilizarlos.
Línea 16: Importación: trae funciones/componentes de otro módulo para reutilizarlos.
Línea 17: Importación: trae funciones/componentes de otro módulo para reutilizarlos.
Línea 18: Importación: trae funciones/componentes de otro módulo para reutilizarlos.
Línea 19: Importación: trae funciones/componentes de otro módulo para reutilizarlos.
Línea 21: Define la función/componente App: Componente principal: instala PlanProvider, Topbar, Sidebar, rutas y modal de favoritos.
Línea 23: useState crea el estado «menuAbierto» (si se ve el menú móvil) y «setMenuAbierto» para actualizarlo.
Línea 25: return entrega el resultado o JSX que React renderizará.
Línea 26: PlanProvider comparte estados y acciones a toda la aplicación.
Línea 27: className aplica clases Tailwind: colores, márgenes, tipografía y disposición responsive.
Línea 30: className aplica clases Tailwind: colores, márgenes, tipografía y disposición responsive.
Línea 33: className aplica clases Tailwind: colores, márgenes, tipografía y disposición responsive.
Línea 34: className aplica clases Tailwind: colores, márgenes, tipografía y disposición responsive.
Línea 35: Routes selecciona cuál de las rutas hijas coincide con la URL.
Línea 36: Route relaciona la URL con un componente React; las rutas internas son anidadas.
Línea 39: Route relaciona la URL con un componente React; las rutas internas son anidadas.
Línea 40: Route relaciona la URL con un componente React; las rutas internas son anidadas.
Línea 41: Route relaciona la URL con un componente React; las rutas internas son anidadas.
Línea 42: Route relaciona la URL con un componente React; las rutas internas son anidadas.
Línea 45: Route relaciona la URL con un componente React; las rutas internas son anidadas.
Línea 48: Route relaciona la URL con un componente React; las rutas internas son anidadas.
Línea 49: Route relaciona la URL con un componente React; las rutas internas son anidadas.
Línea 50: Route relaciona la URL con un componente React; las rutas internas son anidadas.
Línea 54: Route relaciona la URL con un componente React; las rutas internas son anidadas.
Línea 55: Route relaciona la URL con un componente React; las rutas internas son anidadas.
Línea 56: Route relaciona la URL con un componente React; las rutas internas son anidadas.
Línea 59: Route relaciona la URL con un componente React; las rutas internas son anidadas.
Línea 61: Route relaciona la URL con un componente React; las rutas internas son anidadas.
Línea 74: Exportación por defecto: permite importar este componente o función.
FIN DE LA GUÍA. Debajo está el código original sin modificar.
*/
import { useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import FavoritosModal from './components/FavoritosModal'
import Sidebar from './components/Sidebar'
import Topbar from './components/Topbar'
import { PlanProvider } from './context/PlanContext'
import AgregarMateria from './pages/AgregarMateria'
import Condicion from './pages/Condicion'
import CorrelativasPrevias from './pages/CorrelativasPrevias'
import Home from './pages/Home'
import InscribirCursar from './pages/InscribirCursar'
import Inscripciones from './pages/Inscripciones'
import MateriaDetalle from './pages/MateriaDetalle'
import Materias from './pages/Materias'
import MateriasQueDestraba from './pages/MateriasQueDestraba'
import NotFound from './pages/NotFound'
import PlanAnio from './pages/PlanAnio'
import PlanCompleto from './pages/PlanCompleto'
import VerInscripciones from './pages/VerInscripciones'

function App() {
  // Menú lateral desplegable en celulares
  const [menuAbierto, setMenuAbierto] = useState(false)

  return (
    <PlanProvider>
      <div className="min-h-screen bg-sitec-bg text-zinc-800">
        <Topbar onToggleMenu={() => setMenuAbierto((v) => !v)} />

        <div className="flex">
          <Sidebar abierto={menuAbierto} onCerrar={() => setMenuAbierto(false)} />

          <div className="flex-1 min-w-0 px-4 sm:px-10 py-8">
            <div className="max-w-5xl">
              <Routes>
                <Route path="/" element={<Home />} />

                {/* Rutas anidadas: Inscripciones > Cursar / Ver Inscripciones */}
                <Route path="/inscripciones" element={<Inscripciones />}>
                  <Route index element={<Navigate to="cursar" replace />} />
                  <Route path="cursar" element={<InscribirCursar />} />
                  <Route path="ver" element={<VerInscripciones />} />
                </Route>

                <Route path="/estado-cursada" element={<Condicion />} />

                {/* Rutas anidadas: plan completo y filtro por año */}
                <Route path="/materias" element={<Materias />}>
                  <Route index element={<PlanCompleto />} />
                  <Route path="anio/:anio" element={<PlanAnio />} />
                </Route>

                {/* Ruta dinámica con subrutas: correlativas y lo que destraba */}
                <Route path="/materia/:id" element={<MateriaDetalle />}>
                  <Route index element={<CorrelativasPrevias />} />
                  <Route path="destraba" element={<MateriasQueDestraba />} />
                </Route>

                <Route path="/agregar" element={<AgregarMateria />} />

                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </div>
        </div>

        {/* Panel de favoritos (se abre desde la barra superior) */}
        <FavoritosModal />
      </div>
    </PlanProvider>
  )
}

export default App
