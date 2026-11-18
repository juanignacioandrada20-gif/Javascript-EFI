/*
SITEC — GUÍA DE DEFENSA (comentarios de estudio, no cambian la lógica)
ARCHIVO: src/components/MateriaCard.jsx
FUNCIÓN GENERAL: Tarjeta reutilizable de materia: info, favorita, checkbox de correlativas y enlace detalle.
PARA EXPLICAR AL PROFESOR: Recibe props y usa PlanContext para seleccionar/enfocar materias.

EXPLICACIÓN DE LAS LÍNEAS DEL CÓDIGO ORIGINAL:
Línea 1: Importación: trae funciones/componentes de otro módulo para reutilizarlos.
Línea 2: Importación: trae funciones/componentes de otro módulo para reutilizarlos.
Línea 3: Importación: trae funciones/componentes de otro módulo para reutilizarlos.
Línea 6: Diccionario de estados que conecta una situación con estilos y mensajes visuales.
Línea 14: Define la función/componente MateriaCard: Tarjeta reutilizable de materia: info, favorita, checkbox de correlativas y enlace detalle.
Línea 15: useContext lee datos/acciones de PlanContext, sin pasar props por intermediarios.
Línea 17: includes comprueba si el arreglo/cadena contiene ese ID o texto.
Línea 22: return entrega el resultado o JSX que React renderizará.
Línea 23: className aplica clases Tailwind: colores, márgenes, tipografía y disposición responsive.
Línea 24: className aplica clases Tailwind: colores, márgenes, tipografía y disposición responsive.
Línea 25: className aplica clases Tailwind: colores, márgenes, tipografía y disposición responsive.
Línea 26: className aplica clases Tailwind: colores, márgenes, tipografía y disposición responsive.
Línea 27: Botón interactivo de la interfaz, asociado a acción/función.
Línea 28: onClick dispara la acción indicada al pulsar el elemento.
Línea 29: className aplica clases Tailwind: colores, márgenes, tipografía y disposición responsive.
Línea 31: aria-label describe el control para tecnologías de accesibilidad.
Línea 37: className aplica clases Tailwind: colores, márgenes, tipografía y disposición responsive.
Línea 40: className aplica clases Tailwind: colores, márgenes, tipografía y disposición responsive.
Línea 41: join une los textos del arreglo usando el separador indicado.
Línea 45: className aplica clases Tailwind: colores, márgenes, tipografía y disposición responsive.
Línea 46: className aplica clases Tailwind: colores, márgenes, tipografía y disposición responsive.
Línea 47: Campo del formulario: muestra valor del estado y recibe cambios del usuario.
Línea 49: checked vincula el checkbox al valor de estado React.
Línea 50: onChange actualiza el estado cuando cambia un input/select/checkbox.
Línea 51: className aplica clases Tailwind: colores, márgenes, tipografía y disposición responsive.
Línea 52: aria-label describe el control para tecnologías de accesibilidad.
Línea 56: Link cambia de ruta sin recarga completa de la aplicación.
FIN DE LA GUÍA. Debajo está el código original sin modificar.
*/
import { useContext } from "react"
import { Link } from "react-router-dom"
import { PlanContext } from "../context/PlanContext"

// Colores en Modo Enfoque: bordó = elegida, amarillo = previas, gris = las que destraba
const ESTILOS_ESTADO = {
  normal: "bg-sitec-barra text-white",
  enfocada: "bg-sitec-rojo text-white",
  previa: "bg-sitec-amarillo text-zinc-900",
  destraba: "bg-sitec-gris text-white",
  apagada: "bg-zinc-200 text-zinc-400",
}

export default function MateriaCard({ materia, estado = "normal", previas = [] }) {
  const { favoritas, enfocada, toggleFavorita, enfocar } = useContext(PlanContext)

  const esFavorita = favoritas.includes(materia.id)
  const claro = estado === "previa" || estado === "apagada"
  // Color del texto secundario según el fondo
  const textoSecundario = estado === "previa" ? "text-zinc-800" : estado === "apagada" ? "text-zinc-400" : "text-zinc-300"

  return (
    <article className={`flex flex-col transition-all duration-300 ${ESTILOS_ESTADO[estado]}`}>
      <div className="px-5 pt-4 pb-3 flex-1">
        <div className="flex items-start justify-between gap-2">
          <p className="text-[16px] leading-snug">{materia.nombre_materia}</p>
          <button
            onClick={() => toggleFavorita(materia.id)}
            className={`text-2xl leading-none cursor-pointer
              ${esFavorita ? (claro ? "text-zinc-700" : "text-white") : claro ? "text-zinc-400/60" : "text-zinc-500 hover:text-zinc-300"}`}
            aria-label={esFavorita ? "Quitar de favoritos" : "Agregar a favoritos"}
            title={esFavorita ? "Quitar de favoritos" : "Agregar a favoritos"}
          >
            ★
          </button>
        </div>
        <p className={`text-xs mt-1 ${textoSecundario}`}>
          Cód. {materia.codigo} · {materia.anio}° año · {materia.cuatrimestral ? "Cuatrimestral" : "Anual"}
        </p>
        <p className={`text-xs mt-2 ${textoSecundario}`}>
          Correlativas: {previas.length > 0 ? previas.join(", ") : "—"}
        </p>
      </div>

      <div className={`flex items-center justify-between px-5 py-2 text-xs border-t ${claro ? "border-black/15" : "border-white/10"}`}>
        <label className="flex items-center gap-1.5 cursor-pointer">
          <input
            type="checkbox"
            checked={enfocada === materia.id}
            onChange={() => enfocar(materia.id)}
            className="cursor-pointer accent-zinc-600"
            aria-label={`Enfocar ${materia.nombre_materia}`}
          />
          Ver correlativas
        </label>
        <Link to={`/materia/${materia.id}`} className="hover:underline">
          Detalle
        </Link>
      </div>
    </article>
  )
}
