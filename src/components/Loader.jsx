/*
SITEC — GUÍA DE DEFENSA (comentarios de estudio, no cambian la lógica)
ARCHIVO: src/components/Loader.jsx
FUNCIÓN GENERAL: Indicador visual de carga mientras llega la API.
PARA EXPLICAR AL PROFESOR: Muestra un spinner con Tailwind y texto configurable.

EXPLICACIÓN DE LAS LÍNEAS DEL CÓDIGO ORIGINAL:
Línea 1: Define la función/componente Loader: Indicador visual de carga mientras llega la API.
Línea 2: return entrega el resultado o JSX que React renderizará.
Línea 3: className aplica clases Tailwind: colores, márgenes, tipografía y disposición responsive.
Línea 4: className aplica clases Tailwind: colores, márgenes, tipografía y disposición responsive.
Línea 5: className aplica clases Tailwind: colores, márgenes, tipografía y disposición responsive.
FIN DE LA GUÍA. Debajo está el código original sin modificar.
*/
export default function Loader({ texto = "Cargando..." }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-20">
      <div className="w-8 h-8 border-4 border-zinc-400 border-t-transparent rounded-full animate-spin" />
      <p className="text-zinc-500 text-sm">{texto}</p>
    </div>
  )
}
