/*
SITEC — GUÍA DE DEFENSA (comentarios de estudio, no cambian la lógica)
ARCHIVO: src/pages/Inscripciones.jsx
FUNCIÓN GENERAL: Ruta padre /inscripciones: obtiene materias y grafo y pasa datos al Outlet.
PARA EXPLICAR AL PROFESOR: La ruta padre carga los datos y las hijas los reciben mediante useOutletContext.

EXPLICACIÓN DE LAS LÍNEAS DEL CÓDIGO ORIGINAL:
Línea 1: Importación: trae funciones/componentes de otro módulo para reutilizarlos.
Línea 2: Importación: trae funciones/componentes de otro módulo para reutilizarlos.
Línea 3: Importación: trae funciones/componentes de otro módulo para reutilizarlos.
Línea 4: Importación: trae funciones/componentes de otro módulo para reutilizarlos.
Línea 8: Define la función/componente Inscripciones: Ruta padre /inscripciones: obtiene materias y grafo y pasa datos al Outlet.
Línea 9: Variable calculada a partir de los datos actuales para mostrar/filtrar la vista.
Línea 11: Condición if: ejecuta el bloque/devolución únicamente si se cumple esta comprobación.
Línea 12: Condición if: ejecuta el bloque/devolución únicamente si se cumple esta comprobación.
Línea 14: return entrega el resultado o JSX que React renderizará.
FIN DE LA GUÍA. Debajo está el código original sin modificar.
*/
import { Outlet } from "react-router-dom"
import ErrorMessage from "../components/ErrorMessage"
import Loader from "../components/Loader"
import usePlanEstudios from "../hooks/usePlanEstudios"

// Ruta padre /inscripciones: trae el plan de la API y lo comparte con
// las subrutas "cursar" y "ver" mediante <Outlet context>
export default function Inscripciones() {
  const { materias, grafo, loading, error, recargar } = usePlanEstudios()

  if (loading) return <Loader texto="Cargando materias..." />
  if (error) return <ErrorMessage mensaje={error} onReintentar={recargar} />

  return <Outlet context={{ materias, grafo }} />
}
