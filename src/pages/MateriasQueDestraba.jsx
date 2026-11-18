/*
SITEC — GUÍA DE DEFENSA (comentarios de estudio, no cambian la lógica)
ARCHIVO: src/pages/MateriasQueDestraba.jsx
FUNCIÓN GENERAL: Calcula qué otras materias desbloquea la materia consultada.
PARA EXPLICAR AL PROFESOR: Separa los desbloqueos directos y en cadena.

EXPLICACIÓN DE LAS LÍNEAS DEL CÓDIGO ORIGINAL:
Línea 1: Importación: trae funciones/componentes de otro módulo para reutilizarlos.
Línea 2: Importación: trae funciones/componentes de otro módulo para reutilizarlos.
Línea 3: Importación: trae funciones/componentes de otro módulo para reutilizarlos.
Línea 4: Importación: trae funciones/componentes de otro módulo para reutilizarlos.
Línea 7: Define la función/componente MateriasQueDestraba: Calcula qué otras materias desbloquea la materia consultada.
Línea 8: Recibe los datos compartidos por la ruta padre a través de Outlet context.
Línea 10: Condición if: ejecuta el bloque/devolución únicamente si se cumple esta comprobación.
Línea 12: ?? usa un valor alternativo solamente si el primero es null o undefined.
Línea 13: Variable calculada a partir de los datos actuales para mostrar/filtrar la vista.
Línea 15: filter devuelve un arreglo nuevo SOLO con elementos que cumplen la condición.
Línea 16: filter devuelve un arreglo nuevo SOLO con elementos que cumplen la condición.
Línea 18: return entrega el resultado o JSX que React renderizará.
Línea 19: className aplica clases Tailwind: colores, márgenes, tipografía y disposición responsive.
Línea 20: className aplica clases Tailwind: colores, márgenes, tipografía y disposición responsive.
Línea 21: className aplica clases Tailwind: colores, márgenes, tipografía y disposición responsive.
Línea 26: className aplica clases Tailwind: colores, márgenes, tipografía y disposición responsive.
Línea 36: className aplica clases Tailwind: colores, márgenes, tipografía y disposición responsive.
FIN DE LA GUÍA. Debajo está el código original sin modificar.
*/
import { useOutletContext } from "react-router-dom"
import ListaMaterias from "../components/ListaMaterias"
import Loader from "../components/Loader"
import { destrabaDe } from "../utils/correlativas"

// Subruta /materia/:id/destraba
export default function MateriasQueDestraba() {
  const { materia, plan } = useOutletContext()

  if (plan.loading) return <Loader />

  const directas = plan.grafo.habilita[materia.id] ?? []
  const todas = destrabaDe(materia.id, plan.grafo)

  const materiasDirectas = plan.materias.filter((m) => directas.includes(m.id))
  const materiasIndirectas = plan.materias.filter((m) => todas.has(m.id) && !directas.includes(m.id))

  return (
    <div className="flex flex-col gap-6">
      <p className="text-sm text-zinc-500">
        Aprobar esta materia destraba <strong className="text-zinc-800">{todas.size}</strong>{" "}
        materia(s) en total.
      </p>

      <section>
        <h2 className="text-sm text-zinc-600 mb-2">Directamente</h2>
        <ListaMaterias
          materias={materiasDirectas}
          color="bg-sitec-gris text-white"
          vacio="No es correlativa de ninguna materia."
        />
      </section>

      {materiasIndirectas.length > 0 && (
        <section>
          <h2 className="text-sm text-zinc-600 mb-2">Más adelante (en cadena)</h2>
          <ListaMaterias materias={materiasIndirectas} color="bg-zinc-200 text-zinc-800" />
        </section>
      )}
    </div>
  )
}
