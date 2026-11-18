/*
SITEC — GUÍA DE DEFENSA (comentarios de estudio, no cambian la lógica)
ARCHIVO: src/components/BarraMateria.jsx
FUNCIÓN GENERAL: Barra de selección de materia; botón circular y mensaje por estado.
PARA EXPLICAR AL PROFESOR: Recibe una función onToggle como prop para inscribir o dar de baja.

EXPLICACIÓN DE LAS LÍNEAS DEL CÓDIGO ORIGINAL:
Línea 3: Diccionario de estados que conecta una situación con estilos y mensajes visuales.
Línea 9: Define la función/componente BarraMateria: Barra de selección de materia; botón circular y mensaje por estado.
Línea 12: return entrega el resultado o JSX que React renderizará.
Línea 14: className aplica clases Tailwind: colores, márgenes, tipografía y disposición responsive.
Línea 15: className aplica clases Tailwind: colores, márgenes, tipografía y disposición responsive.
Línea 17: Botón interactivo de la interfaz, asociado a acción/función.
Línea 18: onClick dispara la acción indicada al pulsar el elemento.
Línea 20: aria-label describe el control para tecnologías de accesibilidad.
Línea 22: className aplica clases Tailwind: colores, márgenes, tipografía y disposición responsive.
Línea 29: className aplica clases Tailwind: colores, márgenes, tipografía y disposición responsive.
FIN DE LA GUÍA. Debajo está el código original sin modificar.
*/
// Barra de una materia, como en el boceto de "Inscripciones Para Cursar".
// estado: "libre" (sin inscribir), "sin_correlativa" (gris) o "con_correlativa" (amarillo)
const ESTILOS = {
  libre: "bg-sitec-barra text-white",
  sin_correlativa: "bg-sitec-gris text-white",
  con_correlativa: "bg-sitec-amarillo text-zinc-900",
}

export default function BarraMateria({ materia, estado = "libre", mensaje, onToggle, textoBoton }) {
  const inscripta = estado !== "libre"

  return (
    <li>
      <div className={`flex items-center justify-between gap-4 pl-8 pr-4 py-3.5 transition-colors ${ESTILOS[estado]}`}>
        <span className="text-[17px]">{materia.nombre_materia}</span>

        <button
          onClick={() => onToggle(materia.id)}
          title={textoBoton}
          aria-label={`${textoBoton} ${materia.nombre_materia}`}
          aria-pressed={inscripta}
          className={`w-11 h-11 shrink-0 rounded-full cursor-pointer transition-colors flex items-center justify-center text-lg
            ${inscripta ? "bg-white text-zinc-800" : "bg-zinc-500 hover:bg-zinc-400 text-transparent"}`}
        >
          ✓
        </button>
      </div>

      {inscripta && mensaje && <p className="text-[13px] text-zinc-700 pl-8 pt-1.5 pb-1">{mensaje}</p>}
    </li>
  )
}
