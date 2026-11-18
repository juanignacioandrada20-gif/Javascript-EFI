/*
SITEC — GUÍA DE DEFENSA (comentarios de estudio, no cambian la lógica)
ARCHIVO: src/pages/CorrelativasPrevias.jsx
FUNCIÓN GENERAL: Presenta correlativas directas de API e indirectas del grafo; permite borrar relación.
PARA EXPLICAR AL PROFESOR: Distingue requisitos directos/indirectos y elimina vínculos mediante DELETE.

EXPLICACIÓN DE LAS LÍNEAS DEL CÓDIGO ORIGINAL:
Línea 1: Importación: trae funciones/componentes de otro módulo para reutilizarlos.
Línea 2: Importación: trae funciones/componentes de otro módulo para reutilizarlos.
Línea 3: Importación: trae funciones/componentes de otro módulo para reutilizarlos.
Línea 4: Importación: trae funciones/componentes de otro módulo para reutilizarlos.
Línea 5: Importación: trae funciones/componentes de otro módulo para reutilizarlos.
Línea 8: Define la función/componente CorrelativasPrevias: Presenta correlativas directas de API e indirectas del grafo; permite borrar relación.
Línea 9: Recibe los datos compartidos por la ruta padre a través de Outlet context.
Línea 10: useState crea el estado «error» (mensaje de error de la API) y «setError» para actualizarlo.
Línea 13: ?? usa un valor alternativo solamente si el primero es null o undefined.
Línea 14: map transforma cada elemento en otro (por ejemplo, crear una tarjeta JSX por materia).
Línea 17: filter devuelve un arreglo nuevo SOLO con elementos que cumplen la condición.
Línea 18: has comprueba si un Set contiene ese valor.
Línea 21: Elimina una relación de correlatividad en la API y recarga datos.
Línea 23: Intenta una operación que puede fallar; el error se maneja en catch.
Línea 24: Espera la confirmación del DELETE a la API.
Línea 26: Captura fallos del servidor, validación o almacenamiento.
Línea 31: return entrega el resultado o JSX que React renderizará.
Línea 32: className aplica clases Tailwind: colores, márgenes, tipografía y disposición responsive.
Línea 33: className aplica clases Tailwind: colores, márgenes, tipografía y disposición responsive.
Línea 36: className aplica clases Tailwind: colores, márgenes, tipografía y disposición responsive.
Línea 42: Botón interactivo de la interfaz, asociado a acción/función.
Línea 43: onClick dispara la acción indicada al pulsar el elemento.
Línea 44: className aplica clases Tailwind: colores, márgenes, tipografía y disposición responsive.
Línea 45: aria-label describe el control para tecnologías de accesibilidad.
Línea 56: className aplica clases Tailwind: colores, márgenes, tipografía y disposición responsive.
FIN DE LA GUÍA. Debajo está el código original sin modificar.
*/
import { useState } from "react"
import { useOutletContext } from "react-router-dom"
import ListaMaterias from "../components/ListaMaterias"
import { deleteCorrelativa } from "../services/api"
import { previasDe } from "../utils/correlativas"

// Subruta index de /materia/:id
export default function CorrelativasPrevias() {
  const { materia, plan, recargar } = useOutletContext()
  const [error, setError] = useState(null)

  // Las directas vienen de la API (GET /materias/:id -> correlativas)
  const directas = materia.correlativas ?? []
  const idsDirectas = new Set(directas.map((m) => m.id))

  // Las indirectas se calculan con el grafo (previas de las previas)
  const indirectas = plan.materias.filter(
    (m) => previasDe(materia.id, plan.grafo).has(m.id) && !idsDirectas.has(m.id)
  )

  const quitar = async (previa) => {
    setError(null)
    try {
      await deleteCorrelativa(materia.id, previa.id)
      recargar()
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="flex flex-col gap-6">
      {error && <p className="text-sm text-sitec-rojo">{error}</p>}

      <section>
        <h2 className="text-sm text-zinc-600 mb-2">Directas</h2>
        <ListaMaterias
          materias={directas}
          color="bg-sitec-amarillo text-zinc-900"
          vacio="No tiene correlativas: se puede cursar sin requisitos."
          accion={(previa) => (
            <button
              onClick={() => quitar(previa)}
              className="text-zinc-800 hover:text-sitec-rojo text-sm cursor-pointer"
              aria-label={`Quitar correlativa ${previa.nombre_materia}`}
              title="Quitar esta correlativa"
            >
              ✕
            </button>
          )}
        />
      </section>

      {indirectas.length > 0 && (
        <section>
          <h2 className="text-sm text-zinc-600 mb-2">Indirectas (previas de las previas)</h2>
          <ListaMaterias materias={indirectas} color="bg-zinc-200 text-zinc-800" />
        </section>
      )}
    </div>
  )
}
