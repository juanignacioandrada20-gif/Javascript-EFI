/*
SITEC — GUÍA DE DEFENSA (comentarios de estudio, no cambian la lógica)
ARCHIVO: src/components/PlanGrid.jsx
FUNCIÓN GENERAL: Agrupa materias por año y genera tarjetas MateriaCard.
PARA EXPLICAR AL PROFESOR: Usa map para recorrer años y materias, y estadoEnEnfoque para el color.

EXPLICACIÓN DE LAS LÍNEAS DEL CÓDIGO ORIGINAL:
Línea 1: Importación: trae funciones/componentes de otro módulo para reutilizarlos.
Línea 2: Importación: trae funciones/componentes de otro módulo para reutilizarlos.
Línea 3: Importación: trae funciones/componentes de otro módulo para reutilizarlos.
Línea 4: Importación: trae funciones/componentes de otro módulo para reutilizarlos.
Línea 7: Define la función/componente PlanGrid: Agrupa materias por año y genera tarjetas MateriaCard.
Línea 8: useContext lee datos/acciones de PlanContext, sin pasar props por intermediarios.
Línea 10: ?? usa un valor alternativo solamente si el primero es null o undefined.
Línea 11: map transforma cada elemento en otro (por ejemplo, crear una tarjeta JSX por materia).
Línea 12: map transforma cada elemento en otro (por ejemplo, crear una tarjeta JSX por materia).
Línea 14: Condición if: ejecuta el bloque/devolución únicamente si se cumple esta comprobación.
Línea 15: return entrega el resultado o JSX que React renderizará.
Línea 18: return entrega el resultado o JSX que React renderizará.
Línea 19: className aplica clases Tailwind: colores, márgenes, tipografía y disposición responsive.
Línea 20: map transforma cada elemento en otro (por ejemplo, crear una tarjeta JSX por materia).
Línea 21: filter devuelve un arreglo nuevo SOLO con elementos que cumplen la condición.
Línea 22: return entrega el resultado o JSX que React renderizará.
Línea 23: key permite a React identificar establemente cada elemento de una lista.
Línea 24: className aplica clases Tailwind: colores, márgenes, tipografía y disposición responsive.
Línea 25: className aplica clases Tailwind: colores, márgenes, tipografía y disposición responsive.
Línea 27: className aplica clases Tailwind: colores, márgenes, tipografía y disposición responsive.
Línea 28: map transforma cada elemento en otro (por ejemplo, crear una tarjeta JSX por materia).
Línea 29: Renderiza una tarjeta de materia pasando sus datos y estado visual por props.
Línea 30: key permite a React identificar establemente cada elemento de una lista.
Línea 33: filter devuelve un arreglo nuevo SOLO con elementos que cumplen la condición.
FIN DE LA GUÍA. Debajo está el código original sin modificar.
*/
import { useContext } from "react"
import { PlanContext } from "../context/PlanContext"
import { estadoEnEnfoque } from "../utils/correlativas"
import MateriaCard from "./MateriaCard"

// Muestra las materias agrupadas por año
export default function PlanGrid({ materias, todasLasMaterias, grafo }) {
  const { enfocada } = useContext(PlanContext)

  const todas = todasLasMaterias ?? materias
  const nombres = Object.fromEntries(todas.map((m) => [m.id, m.nombre_materia]))
  const anios = [...new Set(materias.map((m) => m.anio))].sort((a, b) => a - b)

  if (materias.length === 0) {
    return <p className="text-zinc-500 py-6">No hay materias para mostrar.</p>
  }

  return (
    <div className="flex flex-col gap-8">
      {anios.map((anio) => {
        const delAnio = materias.filter((m) => m.anio === anio)
        return (
          <section key={anio}>
            <h2 className="text-[15px] text-zinc-700 border-b border-zinc-300 pb-1 mb-3">
              {anio}° Año <span className="text-zinc-400 text-xs">({delAnio.length} materias)</span>
            </h2>
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-3">
              {delAnio.map((materia) => (
                <MateriaCard
                  key={materia.id}
                  materia={materia}
                  estado={estadoEnEnfoque(materia.id, enfocada, grafo)}
                  previas={(grafo.requisitos[materia.id] ?? []).map((id) => nombres[id]).filter(Boolean)}
                />
              ))}
            </div>
          </section>
        )
      })}
    </div>
  )
}
