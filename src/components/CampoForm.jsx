/*
SITEC — GUÍA DE DEFENSA (comentarios de estudio, no cambian la lógica)
ARCHIVO: src/components/CampoForm.jsx
FUNCIÓN GENERAL: Contenedor reutilizable de un campo, etiqueta y mensaje de error.
PARA EXPLICAR AL PROFESOR: Recibe props label/error/children para evitar repetir HTML.

EXPLICACIÓN DE LAS LÍNEAS DEL CÓDIGO ORIGINAL:
Línea 2: Define la función/componente CampoForm: Contenedor reutilizable de un campo, etiqueta y mensaje de error.
Línea 3: return entrega el resultado o JSX que React renderizará.
Línea 4: className aplica clases Tailwind: colores, márgenes, tipografía y disposición responsive.
Línea 5: className aplica clases Tailwind: colores, márgenes, tipografía y disposición responsive.
Línea 7: className aplica clases Tailwind: colores, márgenes, tipografía y disposición responsive.
Línea 12: Exporta «inputStyle» para utilizarlo desde otros módulos.
FIN DE LA GUÍA. Debajo está el código original sin modificar.
*/
// Contenedor de un campo de formulario: label + input + mensaje de error
export default function CampoForm({ label, error, children }) {
  return (
    <div className="mt-4">
      <label className="block text-[13px] mb-1 text-zinc-700">{label}</label>
      {children}
      {error && <p className="text-xs text-red-700 mt-1">{error}</p>}
    </div>
  )
}

export const inputStyle =
  "w-full px-2 py-1.5 bg-white border border-zinc-300 outline-none focus:border-zinc-500"
