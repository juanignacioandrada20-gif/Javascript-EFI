/*
SITEC — GUÍA DE DEFENSA (comentarios de estudio, no cambian la lógica)
ARCHIVO: src/pages/VerInscripciones.jsx
FUNCIÓN GENERAL: Filtra las materias por IDs inscriptos y permite dar de baja una o todas.
PARA EXPLICAR AL PROFESOR: Usa filter para mostrar solamente materias seleccionadas por el alumno.

EXPLICACIÓN DE LAS LÍNEAS DEL CÓDIGO ORIGINAL:
Línea 1: Importación: trae funciones/componentes de otro módulo para reutilizarlos.
Línea 2: Importación: trae funciones/componentes de otro módulo para reutilizarlos.
Línea 3: Importación: trae funciones/componentes de otro módulo para reutilizarlos.
Línea 4: Importación: trae funciones/componentes de otro módulo para reutilizarlos.
Línea 5: Importación: trae funciones/componentes de otro módulo para reutilizarlos.
Línea 6: Importación: trae funciones/componentes de otro módulo para reutilizarlos.
Línea 7: Importación: trae funciones/componentes de otro módulo para reutilizarlos.
Línea 10: Define la función/componente VerInscripciones: Filtra las materias por IDs inscriptos y permite dar de baja una o todas.
Línea 11: Recibe los datos compartidos por la ruta padre a través de Outlet context.
Línea 12: useContext lee datos/acciones de PlanContext, sin pasar props por intermediarios.
Línea 14: Variable calculada a partir de los datos actuales para mostrar/filtrar la vista.
Línea 15: filter devuelve un arreglo nuevo SOLO con elementos que cumplen la condición.
Línea 16: sort ordena el arreglo usando la comparación indicada.
Línea 18: return entrega el resultado o JSX que React renderizará.
Línea 20: Componente reutilizable que muestra título y subtítulo.
Línea 22: onClick dispara la acción indicada al pulsar el elemento.
Línea 28: Contenedor visual blanco reutilizable.
Línea 30: className aplica clases Tailwind: colores, márgenes, tipografía y disposición responsive.
Línea 32: Link cambia de ruta sin recarga completa de la aplicación.
Línea 37: className aplica clases Tailwind: colores, márgenes, tipografía y disposición responsive.
Línea 38: map transforma cada elemento en otro (por ejemplo, crear una tarjeta JSX por materia).
Línea 39: Variable calculada a partir de los datos actuales para mostrar/filtrar la vista.
Línea 40: return entrega el resultado o JSX que React renderizará.
Línea 41: Renderiza la barra de inscripción y pasa la función onToggle mediante props.
Línea 42: key permite a React identificar establemente cada elemento de una lista.
FIN DE LA GUÍA. Debajo está el código original sin modificar.
*/
import { useContext } from "react"
import { Link, useOutletContext } from "react-router-dom"
import BarraMateria from "../components/BarraMateria"
import PageHeader from "../components/PageHeader"
import Panel from "../components/Panel"
import { PlanContext } from "../context/PlanContext"
import { estadoInscripcion } from "../utils/mensajes"

// Subruta /inscripciones/ver: materias a las que el alumno se inscribió
export default function VerInscripciones() {
  const { materias, grafo } = useOutletContext()
  const { cursada, toggleCursada, limpiarCursada } = useContext(PlanContext)

  const inscriptas = materias
    .filter((m) => cursada.includes(m.id))
    .sort((a, b) => a.anio - b.anio)

  return (
    <main>
      <PageHeader titulo="Ver Inscripciones" subtitulo="Carrera :DESARROLLO DE SOFTWARE _ Inscripciones a cursar">
        {inscriptas.length > 0 && (
          <button onClick={limpiarCursada} className="text-xs text-zinc-500 hover:text-sitec-rojo cursor-pointer">
            Dar de baja todas
          </button>
        )}
      </PageHeader>

      <Panel>
        {inscriptas.length === 0 ? (
          <p className="text-zinc-600">
            No tenés inscripciones para este cuatrimestre.{" "}
            <Link to="/inscripciones/cursar" className="text-sitec-rojo hover:underline">
              Ir a Inscripciones Para Cursar
            </Link>
          </p>
        ) : (
          <ul className="flex flex-col gap-4 max-w-xl">
            {inscriptas.map((materia) => {
              const { estado, mensaje } = estadoInscripcion(materia, materias, grafo)
              return (
                <BarraMateria
                  key={materia.id}
                  materia={materia}
                  estado={estado}
                  mensaje={mensaje}
                  onToggle={toggleCursada}
                  textoBoton="Dar de baja"
                />
              )
            })}
          </ul>
        )}
      </Panel>
    </main>
  )
}
