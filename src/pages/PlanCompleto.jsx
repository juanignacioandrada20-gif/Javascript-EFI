/*
SITEC — GUÍA DE DEFENSA (comentarios de estudio, no cambian la lógica)
ARCHIVO: src/pages/PlanCompleto.jsx
FUNCIÓN GENERAL: Ruta hija que muestra el plan sin filtrar por año.
PARA EXPLICAR AL PROFESOR: Recibe materias y grafo desde el contexto del Outlet padre.

EXPLICACIÓN DE LAS LÍNEAS DEL CÓDIGO ORIGINAL:
Línea 1: Importación: trae funciones/componentes de otro módulo para reutilizarlos.
Línea 2: Importación: trae funciones/componentes de otro módulo para reutilizarlos.
Línea 5: Define la función/componente PlanCompleto: Ruta hija que muestra el plan sin filtrar por año.
Línea 6: Recibe los datos compartidos por la ruta padre a través de Outlet context.
Línea 7: return entrega el resultado o JSX que React renderizará.
FIN DE LA GUÍA. Debajo está el código original sin modificar.
*/
import { useOutletContext } from "react-router-dom"
import PlanGrid from "../components/PlanGrid"

// Subruta index de /materias: muestra todos los años
export default function PlanCompleto() {
  const { materias, todas, grafo } = useOutletContext()
  return <PlanGrid materias={materias} todasLasMaterias={todas} grafo={grafo} />
}
