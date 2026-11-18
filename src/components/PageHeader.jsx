/*
SITEC — GUÍA DE DEFENSA (comentarios de estudio, no cambian la lógica)
ARCHIVO: src/components/PageHeader.jsx
FUNCIÓN GENERAL: Encabezado reutilizable con título y subtítulo.
PARA EXPLICAR AL PROFESOR: Las props permiten usar un mismo componente en distintas pantallas.

EXPLICACIÓN DE LAS LÍNEAS DEL CÓDIGO ORIGINAL:
Línea 2: Define la función/componente PageHeader: Encabezado reutilizable con título y subtítulo.
Línea 3: return entrega el resultado o JSX que React renderizará.
Línea 4: className aplica clases Tailwind: colores, márgenes, tipografía y disposición responsive.
Línea 5: className aplica clases Tailwind: colores, márgenes, tipografía y disposición responsive.
Línea 6: className aplica clases Tailwind: colores, márgenes, tipografía y disposición responsive.
Línea 10: className aplica clases Tailwind: colores, márgenes, tipografía y disposición responsive.
FIN DE LA GUÍA. Debajo está el código original sin modificar.
*/
// Encabezado de cada vista, como los títulos del SITEC
export default function PageHeader({ titulo, subtitulo, children }) {
  return (
    <div className="mb-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <h1 className="text-2xl text-zinc-800">{titulo}</h1>
        {children}
      </div>
      {subtitulo && (
        <p className="text-[17px] text-zinc-700 mt-4 pb-2 border-b border-zinc-300">{subtitulo}</p>
      )}
    </div>
  )
}
