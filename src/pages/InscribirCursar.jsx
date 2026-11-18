/*
SITEC — GUÍA DE DEFENSA (comentarios de estudio, no cambian la lógica)
ARCHIVO: src/pages/InscribirCursar.jsx
FUNCIÓN GENERAL: Muestra materias del año elegido y siguiente y deja seleccionarlas para cursar.
PARA EXPLICAR AL PROFESOR: Las inscripciones se guardan en el contexto local.

EXPLICACIÓN DE LAS LÍNEAS DEL CÓDIGO ORIGINAL:
Línea 1: Importación: trae funciones/componentes de otro módulo para reutilizarlos.
Línea 2: Importación: trae funciones/componentes de otro módulo para reutilizarlos.
Línea 3: Importación: trae funciones/componentes de otro módulo para reutilizarlos.
Línea 4: Importación: trae funciones/componentes de otro módulo para reutilizarlos.
Línea 5: Importación: trae funciones/componentes de otro módulo para reutilizarlos.
Línea 6: Importación: trae funciones/componentes de otro módulo para reutilizarlos.
Línea 7: Importación: trae funciones/componentes de otro módulo para reutilizarlos.
Línea 10: Define la función/componente InscribirCursar: Muestra materias del año elegido y siguiente y deja seleccionarlas para cursar.
Línea 11: Recibe los datos compartidos por la ruta padre a través de Outlet context.
Línea 12: useContext lee datos/acciones de PlanContext, sin pasar props por intermediarios.
Línea 14: map transforma cada elemento en otro (por ejemplo, crear una tarjeta JSX por materia).
Línea 15: includes comprueba si el arreglo/cadena contiene ese ID o texto.
Línea 17: filter devuelve un arreglo nuevo SOLO con elementos que cumplen la condición.
Línea 23: Construye BarraMateria para una materia y conecta su botón con toggleCursada.
Línea 24: includes comprueba si el arreglo/cadena contiene ese ID o texto.
Línea 25: Variable calculada a partir de los datos actuales para mostrar/filtrar la vista.
Línea 26: return entrega el resultado o JSX que React renderizará.
Línea 27: Renderiza la barra de inscripción y pasa la función onToggle mediante props.
Línea 28: key permite a React identificar establemente cada elemento de una lista.
Línea 38: return entrega el resultado o JSX que React renderizará.
Línea 40: Componente reutilizable que muestra título y subtítulo.
Línea 42: Contenedor visual blanco reutilizable.
Línea 43: className aplica clases Tailwind: colores, márgenes, tipografía y disposición responsive.
Línea 44: className aplica clases Tailwind: colores, márgenes, tipografía y disposición responsive.
Línea 45: Campo del formulario: muestra valor del estado y recibe cambios del usuario.
Línea 48: onChange actualiza el estado cuando cambia un input/select/checkbox.
Línea 49: className aplica clases Tailwind: colores, márgenes, tipografía y disposición responsive.
Línea 51: map transforma cada elemento en otro (por ejemplo, crear una tarjeta JSX por materia).
Línea 52: key permite a React identificar establemente cada elemento de una lista.
Línea 55: className aplica clases Tailwind: colores, márgenes, tipografía y disposición responsive.
Línea 60: className aplica clases Tailwind: colores, márgenes, tipografía y disposición responsive.
Línea 61: className aplica clases Tailwind: colores, márgenes, tipografía y disposición responsive.
Línea 62: filter devuelve un arreglo nuevo SOLO con elementos que cumplen la condición.
Línea 67: className aplica clases Tailwind: colores, márgenes, tipografía y disposición responsive.
Línea 68: className aplica clases Tailwind: colores, márgenes, tipografía y disposición responsive.
Línea 69: filter devuelve un arreglo nuevo SOLO con elementos que cumplen la condición.
FIN DE LA GUÍA. Debajo está el código original sin modificar.
*/
import { useContext } from "react"
import { useOutletContext } from "react-router-dom"
import BarraMateria from "../components/BarraMateria"
import PageHeader from "../components/PageHeader"
import Panel from "../components/Panel"
import { PlanContext } from "../context/PlanContext"
import { estadoInscripcion } from "../utils/mensajes"

// Subruta /inscripciones/cursar
export default function InscribirCursar() {
  const { materias, grafo } = useOutletContext()
  const { cursada, toggleCursada, anioActual, setAnioActual } = useContext(PlanContext)

  const anios = [...new Set(materias.map((m) => m.anio))].sort((a, b) => a - b)
  const anioSiguiente = anios.includes(anioActual + 1) ? anioActual + 1 : null

  const inscriptas = materias.filter((m) => cursada.includes(m.id)).length
  const resumen =
    inscriptas === 0
      ? "( Sin materias A Cursar Para Este Cuatrimestre )"
      : `( ${inscriptas} ${inscriptas === 1 ? "materia" : "materias"} A Cursar Para Este Cuatrimestre )`

  const renderBarra = (materia) => {
    const inscripta = cursada.includes(materia.id)
    const { estado, mensaje } = estadoInscripcion(materia, materias, grafo)
    return (
      <BarraMateria
        key={materia.id}
        materia={materia}
        estado={inscripta ? estado : "libre"}
        mensaje={mensaje}
        onToggle={toggleCursada}
        textoBoton={inscripta ? "Cancelar inscripción" : "Inscribirse"}
      />
    )
  }

  return (
    <main>
      <PageHeader titulo="Inscripciones Para Cursar" subtitulo={`Carrera :DESARROLLO DE SOFTWARE _ ${resumen}`} />

      <Panel>
        <div className="flex flex-wrap items-center gap-3 mb-8 text-sm">
          <label htmlFor="anio" className="text-zinc-700">Año que cursás:</label>
          <select
            id="anio"
            value={anioActual}
            onChange={(e) => setAnioActual(Number(e.target.value))}
            className="border border-zinc-300 px-2 py-1 bg-white"
          >
            {anios.map((a) => (
              <option key={a} value={a}>{a}° año</option>
            ))}
          </select>
          <span className="text-zinc-500">
            Tocá el círculo de una materia para inscribirte.
          </span>
        </div>

        <h2 className="text-[15px] text-zinc-600 mb-3">Materias de {anioActual}° año</h2>
        <ul className="flex flex-col gap-4 max-w-xl">
          {materias.filter((m) => m.anio === anioActual).map(renderBarra)}
        </ul>

        {anioSiguiente && (
          <>
            <h2 className="text-[15px] text-zinc-600 mt-10 mb-3">Materias de {anioSiguiente}° año</h2>
            <ul className="flex flex-col gap-4 max-w-xl">
              {materias.filter((m) => m.anio === anioSiguiente).map(renderBarra)}
            </ul>
          </>
        )}
      </Panel>
    </main>
  )
}
