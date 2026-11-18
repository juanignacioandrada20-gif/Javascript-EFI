/*
SITEC — GUÍA DE DEFENSA (comentarios de estudio, no cambian la lógica)
ARCHIVO: src/pages/Materias.jsx
FUNCIÓN GENERAL: Ruta padre del plan de estudios: carga API, busca por nombre o código y muestra Outlet.
PARA EXPLICAR AL PROFESOR: Permite visualizar y filtrar el plan por año o texto.

EXPLICACIÓN DE LAS LÍNEAS DEL CÓDIGO ORIGINAL:
Línea 1: Importación: trae funciones/componentes de otro módulo para reutilizarlos.
Línea 2: Importación: trae funciones/componentes de otro módulo para reutilizarlos.
Línea 3: Importación: trae funciones/componentes de otro módulo para reutilizarlos.
Línea 4: Importación: trae funciones/componentes de otro módulo para reutilizarlos.
Línea 5: Importación: trae funciones/componentes de otro módulo para reutilizarlos.
Línea 6: Importación: trae funciones/componentes de otro módulo para reutilizarlos.
Línea 7: Importación: trae funciones/componentes de otro módulo para reutilizarlos.
Línea 8: Importación: trae funciones/componentes de otro módulo para reutilizarlos.
Línea 10: Genera las clases CSS según si la pestaña/ruta está activa.
Línea 14: Define la función/componente Materias: Ruta padre del plan de estudios: carga API, busca por nombre o código y muestra Outlet.
Línea 15: Variable calculada a partir de los datos actuales para mostrar/filtrar la vista.
Línea 16: useContext lee datos/acciones de PlanContext, sin pasar props por intermediarios.
Línea 17: useState crea el estado «busqueda» (texto del buscador) y «setBusqueda» para actualizarlo.
Línea 19: Condición if: ejecuta el bloque/devolución únicamente si se cumple esta comprobación.
Línea 20: Condición if: ejecuta el bloque/devolución únicamente si se cumple esta comprobación.
Línea 22: map transforma cada elemento en otro (por ejemplo, crear una tarjeta JSX por materia).
Línea 23: find devuelve el PRIMER elemento que cumple la condición, o undefined.
Línea 26: Variable calculada a partir de los datos actuales para mostrar/filtrar la vista.
Línea 27: Variable calculada a partir de los datos actuales para mostrar/filtrar la vista.
Línea 28: filter devuelve un arreglo nuevo SOLO con elementos que cumplen la condición.
Línea 29: includes comprueba si el arreglo/cadena contiene ese ID o texto.
Línea 33: return entrega el resultado o JSX que React renderizará.
Línea 35: Componente reutilizable que muestra título y subtítulo.
Línea 37: Contenedor visual blanco reutilizable.
Línea 38: className aplica clases Tailwind: colores, márgenes, tipografía y disposición responsive.
Línea 39: className aplica clases Tailwind: colores, márgenes, tipografía y disposición responsive.
Línea 40: NavLink navega y permite conocer si el enlace coincide con la ruta activa.
Línea 41: map transforma cada elemento en otro (por ejemplo, crear una tarjeta JSX por materia).
Línea 42: NavLink navega y permite conocer si el enlace coincide con la ruta activa.
Línea 47: Campo del formulario: muestra valor del estado y recibe cambios del usuario.
Línea 50: onChange actualiza el estado cuando cambia un input/select/checkbox.
Línea 52: className aplica clases Tailwind: colores, márgenes, tipografía y disposición responsive.
Línea 56: className aplica clases Tailwind: colores, márgenes, tipografía y disposición responsive.
Línea 59: className aplica clases Tailwind: colores, márgenes, tipografía y disposición responsive.
Línea 61: onClick dispara la acción indicada al pulsar el elemento.
Línea 70: Outlet muestra la ruta hija; context pasa datos desde la ruta padre.
FIN DE LA GUÍA. Debajo está el código original sin modificar.
*/
import { useContext, useState } from "react"
import { NavLink, Outlet } from "react-router-dom"
import ErrorMessage from "../components/ErrorMessage"
import Loader from "../components/Loader"
import PageHeader from "../components/PageHeader"
import Panel from "../components/Panel"
import { PlanContext } from "../context/PlanContext"
import usePlanEstudios from "../hooks/usePlanEstudios"

const tabStyle = ({ isActive }) =>
  `px-3 py-1.5 text-xs border ${isActive ? "bg-sitec-rojo border-sitec-rojo text-white" : "bg-white border-zinc-300 text-zinc-700 hover:bg-zinc-100"}`

// Ruta padre /materias: trae los datos y los pasa a las subrutas con <Outlet context>
export default function Materias() {
  const { materias, grafo, loading, error, recargar } = usePlanEstudios()
  const { enfocada, salirDeEnfoque } = useContext(PlanContext)
  const [busqueda, setBusqueda] = useState("")

  if (loading) return <Loader texto="Cargando plan de estudio..." />
  if (error) return <ErrorMessage mensaje={error} onReintentar={recargar} />

  const anios = [...new Set(materias.map((m) => m.anio))].sort((a, b) => a - b)
  const materiaEnfocada = materias.find((m) => m.id === enfocada)

  // Filtro por nombre o código
  const texto = busqueda.trim().toLowerCase()
  const filtradas = texto
    ? materias.filter(
        (m) => m.nombre_materia.toLowerCase().includes(texto) || String(m.codigo).includes(texto)
      )
    : materias

  return (
    <main>
      <PageHeader titulo="Plan de Estudio" subtitulo="Carrera :DESARROLLO DE SOFTWARE _ Diseño curricular" />

      <Panel>
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <nav className="flex flex-wrap gap-1">
            <NavLink to="" end className={tabStyle}>Todos los años</NavLink>
            {anios.map((anio) => (
              <NavLink key={anio} to={`anio/${anio}`} className={tabStyle}>
                {anio}° año
              </NavLink>
            ))}
          </nav>
          <input
            type="search"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscar por nombre o código"
            className="w-full sm:w-60 px-2 py-1.5 text-xs border border-zinc-300 outline-none focus:border-zinc-500"
          />
        </div>

        <p className="text-xs text-zinc-500 mb-6">
          {materiaEnfocada ? (
            <>
              Viendo correlativas de <strong className="text-zinc-800">{materiaEnfocada.nombre_materia}</strong>:
              en amarillo las que hay que aprobar antes y en gris las que destraba.{" "}
              <button onClick={salirDeEnfoque} className="text-sitec-rojo hover:underline cursor-pointer">
                Quitar selección
              </button>
            </>
          ) : (
            <>Tildá "Ver correlativas" en una materia para resaltar las que necesitás antes y las que destraba.</>
          )}
        </p>

        <Outlet context={{ materias: filtradas, todas: materias, grafo }} />
      </Panel>
    </main>
  )
}
