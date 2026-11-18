/*
SITEC — GUÍA DE DEFENSA (comentarios de estudio, no cambian la lógica)
ARCHIVO: src/pages/MateriaDetalle.jsx
FUNCIÓN GENERAL: Pantalla dinámica /materia/:id: consulta detalle, favorita, inscripción y borrado.
PARA EXPLICAR AL PROFESOR: useParams lee el ID; getMateria consulta Python; deleteMateria borra en la API.

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
Línea 14: Define la función/componente MateriaDetalle: Pantalla dinámica /materia/:id: consulta detalle, favorita, inscripción y borrado.
Línea 15: Lee parámetros dinámicos de URL, por ejemplo :id o :anio.
Línea 16: Obtiene la función navigate para cambiar de ruta desde JavaScript.
Línea 17: useContext lee datos/acciones de PlanContext, sin pasar props por intermediarios.
Línea 19: useState crea el estado «materia» (detalle de la materia consultada) y «setMateria» para actualizarlo.
Línea 20: useState crea el estado «loading» (si la consulta está cargando) y «setLoading» para actualizarlo.
Línea 21: useState crea el estado «error» (mensaje de error de la API) y «setError» para actualizarlo.
Línea 22: useState crea el estado «recargas» (contador que fuerza una nueva consulta) y «setRecargas» para actualizarlo.
Línea 23: useState crea el estado «confirmarBorrado» (si el usuario debe confirmar eliminar) y «setConfirmarBorrado» para actualizarlo.
Línea 24: useState crea el estado «borrando» (si se está ejecutando DELETE) y «setBorrando» para actualizarlo.
Línea 30: useEffect ejecuta un efecto de sincronización (carga/API, localStorage o evento) al montar/cambiar dependencias.
Línea 33: Lee JSON almacenado en localStorage y usa un valor inicial si no hay datos o son inválidos.
Línea 37: Intenta una operación que puede fallar; el error se maneja en catch.
Línea 38: await espera los datos solicitados al backend antes de continuar.
Línea 39: Condición if: ejecuta el bloque/devolución únicamente si se cumple esta comprobación.
Línea 40: Captura fallos del servidor, validación o almacenamiento.
Línea 41: Condición if: ejecuta el bloque/devolución únicamente si se cumple esta comprobación.
Línea 42: Se ejecuta al terminar, incluso si hubo error: útil para quitar el indicador de envío/carga.
Línea 43: Condición if: ejecuta el bloque/devolución únicamente si se cumple esta comprobación.
Línea 48: return entrega el resultado o JSX que React renderizará.
Línea 53: Incrementa contador para disparar nuevamente useEffect y consultar API.
Línea 58: Solicita DELETE al backend; limpia estados locales y redirige tras éxito.
Línea 60: Intenta una operación que puede fallar; el error se maneja en catch.
Línea 61: Espera la confirmación del DELETE a la API.
Línea 64: Captura fallos del servidor, validación o almacenamiento.
Línea 70: Condición if: ejecuta el bloque/devolución únicamente si se cumple esta comprobación.
Línea 71: Condición if: ejecuta el bloque/devolución únicamente si se cumple esta comprobación.
Línea 73: includes comprueba si el arreglo/cadena contiene ese ID o texto.
Línea 74: includes comprueba si el arreglo/cadena contiene ese ID o texto.
Línea 76: return entrega el resultado o JSX que React renderizará.
Línea 77: className aplica clases Tailwind: colores, márgenes, tipografía y disposición responsive.
Línea 78: Link cambia de ruta sin recarga completa de la aplicación.
Línea 82: className aplica clases Tailwind: colores, márgenes, tipografía y disposición responsive.
Línea 83: className aplica clases Tailwind: colores, márgenes, tipografía y disposición responsive.
Línea 85: className aplica clases Tailwind: colores, márgenes, tipografía y disposición responsive.
Línea 86: className aplica clases Tailwind: colores, márgenes, tipografía y disposición responsive.
Línea 90: Botón interactivo de la interfaz, asociado a acción/función.
Línea 91: onClick dispara la acción indicada al pulsar el elemento.
Línea 92: className aplica clases Tailwind: colores, márgenes, tipografía y disposición responsive.
Línea 93: aria-label describe el control para tecnologías de accesibilidad.
Línea 101: Contenedor visual blanco reutilizable.
Línea 102: className aplica clases Tailwind: colores, márgenes, tipografía y disposición responsive.
Línea 103: Botón interactivo de la interfaz, asociado a acción/función.
Línea 104: onClick dispara la acción indicada al pulsar el elemento.
Línea 105: className aplica clases Tailwind: colores, márgenes, tipografía y disposición responsive.
Línea 111: onClick dispara la acción indicada al pulsar el elemento.
Línea 115: className aplica clases Tailwind: colores, márgenes, tipografía y disposición responsive.
Línea 116: className aplica clases Tailwind: colores, márgenes, tipografía y disposición responsive.
Línea 117: Botón interactivo de la interfaz, asociado a acción/función.
Línea 118: onClick dispara la acción indicada al pulsar el elemento.
Línea 119: disabled impide pulsar mientras está enviando o faltan datos.
Línea 120: className aplica clases Tailwind: colores, márgenes, tipografía y disposición responsive.
Línea 124: onClick dispara la acción indicada al pulsar el elemento.
Línea 131: className aplica clases Tailwind: colores, márgenes, tipografía y disposición responsive.
Línea 132: NavLink navega y permite conocer si el enlace coincide con la ruta activa.
Línea 133: NavLink navega y permite conocer si el enlace coincide con la ruta activa.
Línea 136: Outlet muestra la ruta hija; context pasa datos desde la ruta padre.
FIN DE LA GUÍA. Debajo está el código original sin modificar.
*/
import { useContext, useEffect, useState } from "react"
import { Link, NavLink, Outlet, useNavigate, useParams } from "react-router-dom"
import ErrorMessage from "../components/ErrorMessage"
import Loader from "../components/Loader"
import Panel from "../components/Panel"
import { PlanContext } from "../context/PlanContext"
import usePlanEstudios from "../hooks/usePlanEstudios"
import { deleteMateria, getMateria } from "../services/api"

const tabStyle = ({ isActive }) =>
  `px-4 py-1.5 text-sm -mb-px border ${isActive ? "bg-white border-zinc-300 border-b-white text-zinc-800" : "border-transparent text-zinc-500 hover:text-zinc-800"}`

// Ruta dinámica /materia/:id
export default function MateriaDetalle() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { favoritas, cursada, toggleFavorita, toggleCursada, quitarMateria } = useContext(PlanContext)

  const [materia, setMateria] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [recargas, setRecargas] = useState(0)
  const [confirmarBorrado, setConfirmarBorrado] = useState(false)
  const [borrando, setBorrando] = useState(false)

  // El resto del plan se usa para calcular lo que destraba esta materia
  const plan = usePlanEstudios()

  // Cada vez que cambia el id de la URL se vuelve a pedir la materia
  useEffect(() => {
    let cancelado = false

    async function cargar() {
      setLoading(true)
      setError(null)
      setConfirmarBorrado(false)
      try {
        const data = await getMateria(id)
        if (!cancelado) setMateria(data)
      } catch (err) {
        if (!cancelado) setError(err.message)
      } finally {
        if (!cancelado) setLoading(false)
      }
    }

    cargar()
    return () => {
      cancelado = true
    }
  }, [id, recargas])

  const recargar = () => {
    setRecargas((n) => n + 1)
    plan.recargar()
  }

  const handleBorrar = async () => {
    setBorrando(true)
    try {
      await deleteMateria(materia.id)
      quitarMateria(materia.id)
      navigate("/materias")
    } catch (err) {
      setError(err.message)
      setBorrando(false)
    }
  }

  if (loading) return <Loader texto="Cargando materia..." />
  if (error) return <ErrorMessage mensaje={error} onReintentar={recargar} />

  const esFavorita = favoritas.includes(materia.id)
  const enCursada = cursada.includes(materia.id)

  return (
    <main className="max-w-3xl">
      <Link to="/materias" className="text-sm text-sitec-rojo hover:underline">
        ← Volver al Plan de Estudio
      </Link>

      <div className="mt-4 bg-sitec-barra text-white px-6 py-5">
        <div className="flex flex-wrap justify-between items-start gap-4">
          <div>
            <h1 className="text-2xl">{materia.nombre_materia}</h1>
            <p className="text-zinc-300 text-sm mt-1">
              Cód. {materia.codigo} · {materia.anio}° año · {materia.cuatrimestral ? "Cuatrimestral" : "Anual"}
            </p>
          </div>
          <button
            onClick={() => toggleFavorita(materia.id)}
            className={`text-3xl leading-none cursor-pointer ${esFavorita ? "text-white" : "text-zinc-500 hover:text-zinc-300"}`}
            aria-label={esFavorita ? "Quitar de favoritos" : "Agregar a favoritos"}
            title={esFavorita ? "Quitar de favoritos" : "Agregar a favoritos"}
          >
            ★
          </button>
        </div>
      </div>

      <Panel className="!py-5">
        <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
          <button
            onClick={() => toggleCursada(materia.id)}
            className={`px-4 py-1.5 cursor-pointer ${enCursada ? "bg-zinc-200 hover:bg-zinc-300 text-zinc-800" : "bg-sitec-rojo hover:bg-sitec-rojo-2 text-white"}`}
          >
            {enCursada ? "Dar de baja la inscripción" : "Inscribirse para cursar"}
          </button>

          {!confirmarBorrado ? (
            <button onClick={() => setConfirmarBorrado(true)} className="text-zinc-500 hover:text-sitec-rojo cursor-pointer">
              Eliminar materia
            </button>
          ) : (
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-zinc-700">¿Seguro? Se borran también sus correlativas.</span>
              <button
                onClick={handleBorrar}
                disabled={borrando}
                className="bg-sitec-rojo hover:bg-sitec-rojo-2 text-white px-3 py-1 cursor-pointer disabled:opacity-50"
              >
                {borrando ? "Eliminando..." : "Sí, eliminar"}
              </button>
              <button onClick={() => setConfirmarBorrado(false)} className="text-zinc-500 hover:text-zinc-800 cursor-pointer">
                Cancelar
              </button>
            </div>
          )}
        </div>

        <nav className="flex gap-1 mt-6 mb-4 border-b border-zinc-300">
          <NavLink to="" end className={tabStyle}>Correlativas</NavLink>
          <NavLink to="destraba" className={tabStyle}>Qué destraba</NavLink>
        </nav>

        <Outlet context={{ materia, plan, recargar }} />
      </Panel>
    </main>
  )
}
