/*
SITEC — GUÍA DE DEFENSA (comentarios de estudio, no cambian la lógica)
ARCHIVO: src/components/ErrorMessage.jsx
FUNCIÓN GENERAL: Error visual con detalle y botón de reintentar.
PARA EXPLICAR AL PROFESOR: Se usa al fallar una petición HTTP.

EXPLICACIÓN DE LAS LÍNEAS DEL CÓDIGO ORIGINAL:
Línea 1: Define la función/componente ErrorMessage: Error visual con detalle y botón de reintentar.
Línea 2: return entrega el resultado o JSX que React renderizará.
Línea 3: className aplica clases Tailwind: colores, márgenes, tipografía y disposición responsive.
Línea 4: className aplica clases Tailwind: colores, márgenes, tipografía y disposición responsive.
Línea 5: className aplica clases Tailwind: colores, márgenes, tipografía y disposición responsive.
Línea 7: Botón interactivo de la interfaz, asociado a acción/función.
Línea 8: onClick dispara la acción indicada al pulsar el elemento.
Línea 9: className aplica clases Tailwind: colores, márgenes, tipografía y disposición responsive.
FIN DE LA GUÍA. Debajo está el código original sin modificar.
*/
export default function ErrorMessage({ mensaje, onReintentar }) {
  return (
    <div className="max-w-xl mx-auto my-10 bg-white border border-zinc-300 border-l-4 border-l-sitec-rojo p-5">
      <p className="text-zinc-800">No se pudieron cargar los datos</p>
      <p className="text-sm text-zinc-500 mt-1">{mensaje}</p>
      {onReintentar && (
        <button
          onClick={onReintentar}
          className="mt-4 bg-sitec-rojo hover:bg-sitec-rojo-2 text-white text-sm px-4 py-1.5 cursor-pointer"
        >
          Reintentar
        </button>
      )}
    </div>
  )
}
