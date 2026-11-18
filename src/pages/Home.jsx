/*
SITEC — GUÍA DE DEFENSA (comentarios de estudio, no cambian la lógica)
ARCHIVO: src/pages/Home.jsx
FUNCIÓN GENERAL: Pantalla inicial con accesos rápidos a secciones funcionales.
PARA EXPLICAR AL PROFESOR: Home muestra la bienvenida y enlaces.

EXPLICACIÓN DE LAS LÍNEAS DEL CÓDIGO ORIGINAL:
Línea 1: Importación: trae funciones/componentes de otro módulo para reutilizarlos.
Línea 10: Define la función/componente Home: Pantalla inicial con accesos rápidos a secciones funcionales.
Línea 11: return entrega el resultado o JSX que React renderizará.
Línea 12: className aplica clases Tailwind: colores, márgenes, tipografía y disposición responsive.
Línea 13: className aplica clases Tailwind: colores, márgenes, tipografía y disposición responsive.
Línea 14: className aplica clases Tailwind: colores, márgenes, tipografía y disposición responsive.
Línea 18: className aplica clases Tailwind: colores, márgenes, tipografía y disposición responsive.
Línea 19: map transforma cada elemento en otro (por ejemplo, crear una tarjeta JSX por materia).
Línea 20: Link cambia de ruta sin recarga completa de la aplicación.
Línea 21: key permite a React identificar establemente cada elemento de una lista.
Línea 23: className aplica clases Tailwind: colores, márgenes, tipografía y disposición responsive.
Línea 30: className aplica clases Tailwind: colores, márgenes, tipografía y disposición responsive.
FIN DE LA GUÍA. Debajo está el código original sin modificar.
*/
import { Link } from "react-router-dom"

const ACCESOS = [
  { texto: "Inscripciones Para Cursar", to: "/inscripciones/cursar" },
  { texto: "Estado de Cursada", to: "/estado-cursada" },
  { texto: "Plan de Estudio", to: "/materias" },
]

// Pantalla de bienvenida, como la portada del SITEC
export default function Home() {
  return (
    <main className="text-center pt-10">
      <h1 className="text-5xl text-zinc-800">Bienvenido/a</h1>
      <p className="text-zinc-600 mt-6">
        Módulo de Inscripciones y Correlativas · Tecnicatura Superior en Desarrollo de Software
      </p>

      <div className="flex flex-wrap justify-center gap-3 mt-10">
        {ACCESOS.map((a) => (
          <Link
            key={a.to}
            to={a.to}
            className="bg-sitec-barra hover:bg-sitec-rojo text-white px-6 py-3 transition-colors"
          >
            {a.texto}
          </Link>
        ))}
      </div>

      <div className="text-xs text-zinc-500 mt-16 space-y-1">
        <p>Campus: ITEC Río Cuarto</p>
        <p>Prototipo desarrollado en el EFI de PP1. Solo las secciones Inscripciones y Estado Cursada son funcionales.</p>
      </div>
    </main>
  )
}
