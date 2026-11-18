/*
SITEC — GUÍA DE DEFENSA (comentarios de estudio, no cambian la lógica)
ARCHIVO: src/components/ListaMaterias.jsx
FUNCIÓN GENERAL: Lista reutilizable de materias enlazadas con acción opcional.
PARA EXPLICAR AL PROFESOR: map genera un li por cada materia, con key estable.

EXPLICACIÓN DE LAS LÍNEAS DEL CÓDIGO ORIGINAL:
Línea 1: Importación: trae funciones/componentes de otro módulo para reutilizarlos.
Línea 4: Define la función/componente ListaMaterias: Lista reutilizable de materias enlazadas con acción opcional.
Línea 5: Condición if: ejecuta el bloque/devolución únicamente si se cumple esta comprobación.
Línea 6: return entrega el resultado o JSX que React renderizará.
Línea 9: return entrega el resultado o JSX que React renderizará.
Línea 10: className aplica clases Tailwind: colores, márgenes, tipografía y disposición responsive.
Línea 11: map transforma cada elemento en otro (por ejemplo, crear una tarjeta JSX por materia).
Línea 12: className aplica clases Tailwind: colores, márgenes, tipografía y disposición responsive.
Línea 13: Link cambia de ruta sin recarga completa de la aplicación.
Línea 15: className aplica clases Tailwind: colores, márgenes, tipografía y disposición responsive.
FIN DE LA GUÍA. Debajo está el código original sin modificar.
*/
import { Link } from "react-router-dom"

// Lista simple de materias con link al detalle y una acción opcional
export default function ListaMaterias({ materias, color = "bg-sitec-barra text-white", vacio, accion }) {
  if (materias.length === 0) {
    return <p className="text-zinc-500 text-sm py-2">{vacio}</p>
  }

  return (
    <ul className="flex flex-col gap-2">
      {materias.map((m) => (
        <li key={m.id} className={`flex justify-between items-center gap-4 px-5 py-3 ${color}`}>
          <Link to={`/materia/${m.id}`} className="hover:underline">
            {m.nombre_materia}
            <span className="text-xs opacity-75 ml-2">{m.anio}° año</span>
          </Link>
          {accion && accion(m)}
        </li>
      ))}
    </ul>
  )
}
