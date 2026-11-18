/*
SITEC — GUÍA DE DEFENSA (comentarios de estudio, no cambian la lógica)
ARCHIVO: src/pages/PlanAnio.jsx
FUNCIÓN GENERAL: Ruta hija que filtra el plan según parámetro :anio.
PARA EXPLICAR AL PROFESOR: Obtiene el año desde la URL usando useParams y aplica filter.

EXPLICACIÓN DE LAS LÍNEAS DEL CÓDIGO ORIGINAL:
Línea 1: Importación: trae funciones/componentes de otro módulo para reutilizarlos.
Línea 2: Importación: trae funciones/componentes de otro módulo para reutilizarlos.
Línea 5: Define la función/componente PlanAnio: Ruta hija que filtra el plan según parámetro :anio.
Línea 6: Lee parámetros dinámicos de URL, por ejemplo :id o :anio.
Línea 7: Recibe los datos compartidos por la ruta padre a través de Outlet context.
Línea 9: filter devuelve un arreglo nuevo SOLO con elementos que cumplen la condición.
Línea 11: return entrega el resultado o JSX que React renderizará.
FIN DE LA GUÍA. Debajo está el código original sin modificar.
*/
import { useOutletContext, useParams } from "react-router-dom"
import PlanGrid from "../components/PlanGrid"

// Subruta anidada /materias/anio/:anio: filtra el plan por año
export default function PlanAnio() {
  const { anio } = useParams()
  const { materias, todas, grafo } = useOutletContext()

  const delAnio = materias.filter((m) => m.anio === Number(anio))

  return <PlanGrid materias={delAnio} todasLasMaterias={todas} grafo={grafo} />
}
