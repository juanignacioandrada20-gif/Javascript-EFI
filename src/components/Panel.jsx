/*
SITEC — GUÍA DE DEFENSA (comentarios de estudio, no cambian la lógica)
ARCHIVO: src/components/Panel.jsx
FUNCIÓN GENERAL: Recuadro de contenido con clases Tailwind.
PARA EXPLICAR AL PROFESOR: children permite envolver contenido variable.

EXPLICACIÓN DE LAS LÍNEAS DEL CÓDIGO ORIGINAL:
Línea 2: Define la función/componente Panel: Recuadro de contenido con clases Tailwind.
Línea 3: return entrega el resultado o JSX que React renderizará.
FIN DE LA GUÍA. Debajo está el código original sin modificar.
*/
// Recuadro blanco donde va el contenido de cada vista
export default function Panel({ children, className = "" }) {
  return <section className={`bg-white px-6 sm:px-10 py-8 ${className}`}>{children}</section>
}
