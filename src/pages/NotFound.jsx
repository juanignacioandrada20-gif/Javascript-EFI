/*
SITEC — GUÍA DE DEFENSA (comentarios de estudio, no cambian la lógica)
ARCHIVO: src/pages/NotFound.jsx
FUNCIÓN GENERAL: Pantalla 404 para rutas inexistentes.
PARA EXPLICAR AL PROFESOR: Se muestra cuando ninguna ruta de App coincide.

EXPLICACIÓN DE LAS LÍNEAS DEL CÓDIGO ORIGINAL:
Línea 1: Importación: trae funciones/componentes de otro módulo para reutilizarlos.
Línea 3: Define la función/componente NotFound: Pantalla 404 para rutas inexistentes.
Línea 4: return entrega el resultado o JSX que React renderizará.
Línea 5: className aplica clases Tailwind: colores, márgenes, tipografía y disposición responsive.
Línea 6: className aplica clases Tailwind: colores, márgenes, tipografía y disposición responsive.
Línea 7: className aplica clases Tailwind: colores, márgenes, tipografía y disposición responsive.
Línea 8: Link cambia de ruta sin recarga completa de la aplicación.
FIN DE LA GUÍA. Debajo está el código original sin modificar.
*/
import { Link } from "react-router-dom"

export default function NotFound() {
  return (
    <main className="text-center py-20">
      <h1 className="text-5xl text-zinc-800">404</h1>
      <p className="text-zinc-500 mt-4">La página que buscás no existe.</p>
      <Link to="/" className="inline-block mt-4 text-sitec-rojo hover:underline">Volver al inicio</Link>
    </main>
  )
}
