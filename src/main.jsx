/*
SITEC — GUÍA DE DEFENSA (comentarios de estudio, no cambian la lógica)
ARCHIVO: src/main.jsx
FUNCIÓN GENERAL: Punto de entrada React: crea la raíz, habilita React Router y renderiza App.
PARA EXPLICAR AL PROFESOR: main.jsx arranca React; BrowserRouter permite navegar entre páginas.

EXPLICACIÓN DE LAS LÍNEAS DEL CÓDIGO ORIGINAL:
Línea 1: Importación: trae funciones/componentes de otro módulo para reutilizarlos.
Línea 2: Importación: trae funciones/componentes de otro módulo para reutilizarlos.
Línea 3: Importación: trae funciones/componentes de otro módulo para reutilizarlos.
Línea 4: Importación: trae funciones/componentes de otro módulo para reutilizarlos.
Línea 5: Importación: trae funciones/componentes de otro módulo para reutilizarlos.
Línea 7: Busca el div #root de index.html y monta la aplicación React.
Línea 9: BrowserRouter permite navegar usando las rutas del navegador.
FIN DE LA GUÍA. Debajo está el código original sin modificar.
*/
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
