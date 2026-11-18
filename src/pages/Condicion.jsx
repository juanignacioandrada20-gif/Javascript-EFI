/*
SITEC — GUÍA DE DEFENSA (comentarios de estudio, no cambian la lógica)
ARCHIVO: src/pages/Condicion.jsx
FUNCIÓN GENERAL: Simula estados sin nota/aprobada/desaprobada en materias inscriptas; permite marcar favoritas.
PARA EXPLICAR AL PROFESOR: Es una simulación en localStorage; no carga notas oficiales en Python.

EXPLICACIÓN DE LAS LÍNEAS DEL CÓDIGO ORIGINAL:
Línea 1: Importación: trae funciones/componentes de otro módulo para reutilizarlos.
Línea 2: Importación: trae funciones/componentes de otro módulo para reutilizarlos.
Línea 3: Importación: trae funciones/componentes de otro módulo para reutilizarlos.
Línea 4: Importación: trae funciones/componentes de otro módulo para reutilizarlos.
Línea 5: Importación: trae funciones/componentes de otro módulo para reutilizarlos.
Línea 6: Importación: trae funciones/componentes de otro módulo para reutilizarlos.
Línea 7: Importación: trae funciones/componentes de otro módulo para reutilizarlos.
Línea 8: Importación: trae funciones/componentes de otro módulo para reutilizarlos.
Línea 10: Diccionario de estados que conecta una situación con estilos y mensajes visuales.
Línea 17: Define la función/componente Condicion: Simula estados sin nota/aprobada/desaprobada en materias inscriptas; permite marcar favoritas.
Línea 18: Variable calculada a partir de los datos actuales para mostrar/filtrar la vista.
Línea 19: useContext lee datos/acciones de PlanContext, sin pasar props por intermediarios.
Línea 21: Condición if: ejecuta el bloque/devolución únicamente si se cumple esta comprobación.
Línea 22: Condición if: ejecuta el bloque/devolución únicamente si se cumple esta comprobación.
Línea 24: filter devuelve un arreglo nuevo SOLO con elementos que cumplen la condición.
Línea 26: return entrega el resultado o JSX que React renderizará.
Línea 28: Componente reutilizable que muestra título y subtítulo.
Línea 30: Contenedor visual blanco reutilizable.
Línea 32: className aplica clases Tailwind: colores, márgenes, tipografía y disposición responsive.
Línea 34: Link cambia de ruta sin recarga completa de la aplicación.
Línea 40: className aplica clases Tailwind: colores, márgenes, tipografía y disposición responsive.
Línea 43: className aplica clases Tailwind: colores, márgenes, tipografía y disposición responsive.
Línea 44: map transforma cada elemento en otro (por ejemplo, crear una tarjeta JSX por materia).
Línea 45: ?? usa un valor alternativo solamente si el primero es null o undefined.
Línea 46: includes comprueba si el arreglo/cadena contiene ese ID o texto.
Línea 47: return entrega el resultado o JSX que React renderizará.
Línea 48: className aplica clases Tailwind: colores, márgenes, tipografía y disposición responsive.
Línea 49: Botón interactivo de la interfaz, asociado a acción/función.
Línea 50: onClick dispara la acción indicada al pulsar el elemento.
Línea 51: className aplica clases Tailwind: colores, márgenes, tipografía y disposición responsive.
Línea 52: aria-label describe el control para tecnologías de accesibilidad.
Línea 57: className aplica clases Tailwind: colores, márgenes, tipografía y disposición responsive.
Línea 58: className aplica clases Tailwind: colores, márgenes, tipografía y disposición responsive.
Línea 60: className aplica clases Tailwind: colores, márgenes, tipografía y disposición responsive.
Línea 61: className aplica clases Tailwind: colores, márgenes, tipografía y disposición responsive.
Línea 64: Botón interactivo de la interfaz, asociado a acción/función.
Línea 65: onClick dispara la acción indicada al pulsar el elemento.
Línea 66: className aplica clases Tailwind: colores, márgenes, tipografía y disposición responsive.
Línea 67: aria-label describe el control para tecnologías de accesibilidad.
FIN DE LA GUÍA. Debajo está el código original sin modificar.
*/
import { useContext } from "react"
import { Link } from "react-router-dom"
import ErrorMessage from "../components/ErrorMessage"
import Loader from "../components/Loader"
import PageHeader from "../components/PageHeader"
import Panel from "../components/Panel"
import { PlanContext } from "../context/PlanContext"
import usePlanEstudios from "../hooks/usePlanEstudios"

const CONDICION = {
  sin_nota: { texto: "Sin nota", circulo: "bg-zinc-500" },
  aprobada: { texto: "Aprobada", circulo: "bg-[#3c8d3c]" },
  desaprobada: { texto: "Desaprobada", circulo: "bg-sitec-rojo-2" },
}

// /estado-cursada: condición de las materias inscriptas, con botón de simulación
export default function Condicion() {
  const { materias, loading, error, recargar } = usePlanEstudios()
  const { cursada, condiciones, simularCondicion, favoritas, toggleFavorita } = useContext(PlanContext)

  if (loading) return <Loader />
  if (error) return <ErrorMessage mensaje={error} onReintentar={recargar} />

  const inscriptas = materias.filter((m) => cursada.includes(m.id)).sort((a, b) => a.anio - b.anio)

  return (
    <main>
      <PageHeader titulo="Estado de Cursada" subtitulo="Condición de las materias inscriptas" />

      <Panel>
        {inscriptas.length === 0 ? (
          <p className="text-zinc-600">
            Todavía no te inscribiste a ninguna materia.{" "}
            <Link to="/inscripciones/cursar" className="text-sitec-rojo hover:underline">
              Ir a Inscripciones Para Cursar
            </Link>
          </p>
        ) : (
          <>
            <p className="text-xs text-zinc-500 mb-6">
              El círculo es una simulación: cada toque cambia la condición como si el docente hubiera cargado la nota.
            </p>
            <ul className="grid sm:grid-cols-2 gap-4 max-w-3xl">
              {inscriptas.map((materia) => {
                const condicion = CONDICION[condiciones[materia.id] ?? "sin_nota"]
                const esFavorita = favoritas.includes(materia.id)
                return (
                  <li key={materia.id} className="relative bg-sitec-barra text-white text-center px-6 pt-5 pb-6">
                    <button
                      onClick={() => toggleFavorita(materia.id)}
                      className={`absolute top-2 right-3 text-3xl leading-none cursor-pointer ${esFavorita ? "text-white" : "text-zinc-500 hover:text-zinc-300"}`}
                      aria-label={esFavorita ? "Quitar de favoritos" : "Agregar a favoritos"}
                      title={esFavorita ? "Quitar de favoritos" : "Agregar a favoritos"}
                    >
                      ★
                    </button>
                    <p className="text-[17px] px-6">{materia.nombre_materia}</p>
                    <p className="text-[15px] text-zinc-300">{materia.anio}° año</p>

                    <div className="flex items-center justify-center gap-4 mt-5">
                      <span className="text-[15px]">
                        Condición: <strong>{condicion.texto}</strong>
                      </span>
                      <button
                        onClick={() => simularCondicion(materia.id)}
                        className={`w-8 h-8 rounded-full cursor-pointer ${condicion.circulo}`}
                        aria-label={`Simular carga de nota de ${materia.nombre_materia}`}
                        title="Simular carga de nota"
                      />
                    </div>
                  </li>
                )
              })}
            </ul>
          </>
        )}
      </Panel>
    </main>
  )
}
