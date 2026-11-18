/*
SITEC — GUÍA DE DEFENSA (comentarios de estudio, no cambian la lógica)
ARCHIVO: src/context/PlanContext.jsx
FUNCIÓN GENERAL: Contexto global: favoritas, inscripciones simuladas, condiciones, año, enfoque y panel; guarda algunas en localStorage.
PARA EXPLICAR AL PROFESOR: PlanContext comparte estados mediante useContext y persiste datos locales sin enviarlos al backend.

EXPLICACIÓN DE LAS LÍNEAS DEL CÓDIGO ORIGINAL:
Línea 1: Importación: trae funciones/componentes de otro módulo para reutilizarlos.
Línea 10: Exporta «PlanContext» para utilizarlo desde otros módulos.
Línea 13: Define los tres estados que recorre el botón de simulación.
Línea 15: Lee JSON almacenado en localStorage y usa un valor inicial si no hay datos o son inválidos.
Línea 16: Intenta una operación que puede fallar; el error se maneja en catch.
Línea 17: Recupera del navegador el dato asociado a esa clave.
Línea 18: Convierte una cadena JSON nuevamente en objeto/arreglo JavaScript.
Línea 19: Captura fallos del servidor, validación o almacenamiento.
Línea 24: Convierte el valor a JSON y lo conserva en localStorage.
Línea 25: Intenta una operación que puede fallar; el error se maneja en catch.
Línea 26: Convierte un objeto/arreglo de JavaScript a texto JSON para enviarlo o guardarlo.
Línea 27: Captura fallos del servidor, validación o almacenamiento.
Línea 33: Si un ID está en el arreglo lo quita; si no está lo agrega, sin mutar el anterior.
Línea 34: filter devuelve un arreglo nuevo SOLO con elementos que cumplen la condición.
Línea 36: Define la función/componente PlanProvider: Contexto global: favoritas, inscripciones simuladas, condiciones, año, enfoque y panel; guarda algunas en localStorage.
Línea 37: useState crea el estado «favoritas» (IDs de materias favoritas) y «setFavoritas» para actualizarlo.
Línea 38: useState crea el estado «cursada» (IDs de materias inscriptas (simulación)) y «setCursada» para actualizarlo.
Línea 39: useState crea el estado «condiciones» (objeto de notas/condiciones simuladas por materia) y «setCondiciones» para actualizarlo.
Línea 40: useState crea el estado «anioActual» (año de cursada seleccionado) y «setAnioActual» para actualizarlo.
Línea 41: useState crea el estado «enfocada» (ID de materia con Modo Enfoque activo) y «setEnfocada» para actualizarlo.
Línea 42: useState crea el estado «favoritosAbierto» (si el modal está abierto) y «setFavoritosAbierto» para actualizarlo.
Línea 44: useEffect ejecuta un efecto de sincronización (carga/API, localStorage o evento) al montar/cambiar dependencias.
Línea 45: useEffect ejecuta un efecto de sincronización (carga/API, localStorage o evento) al montar/cambiar dependencias.
Línea 46: useEffect ejecuta un efecto de sincronización (carga/API, localStorage o evento) al montar/cambiar dependencias.
Línea 47: useEffect ejecuta un efecto de sincronización (carga/API, localStorage o evento) al montar/cambiar dependencias.
Línea 49: Agrega o quita una materia de favoritas actualizando el estado.
Línea 50: Agrega o quita una materia de la cursada simulada.
Línea 51: Vacía la lista local de materias inscriptas.
Línea 54: Avanza circularmente por sin_nota → aprobada → desaprobada.
Línea 56: ?? usa un valor alternativo solamente si el primero es null o undefined.
Línea 58: El operador ... (spread) copia/expande elementos; ayuda a crear un estado nuevo sin mutar el anterior.
Línea 62: Selecciona una materia; si se selecciona la misma otra vez, desactiva el enfoque.
Línea 63: Quita el enfoque actual.
Línea 66: Limpia una materia eliminada de favoritas, inscripciones, condiciones y enfoque.
Línea 67: filter devuelve un arreglo nuevo SOLO con elementos que cumplen la condición.
Línea 68: filter devuelve un arreglo nuevo SOLO con elementos que cumplen la condición.
Línea 70: El operador ... (spread) copia/expande elementos; ayuda a crear un estado nuevo sin mutar el anterior.
Línea 77: return entrega el resultado o JSX que React renderizará.
FIN DE LA GUÍA. Debajo está el código original sin modificar.
*/
import { createContext, useEffect, useState } from "react"

// Estado global del alumno:
//  - favoritas: materias prioritarias / objetivos
//  - cursada: materias en las que se inscribió para cursar este cuatrimestre
//  - condiciones: condición simulada de cada materia (sin nota / aprobada / desaprobada)
//  - enfocada: materia seleccionada en "Modo Enfoque" del plan de estudio
//  - favoritosAbierto: si el panel de favoritos está visible
// eslint-disable-next-line react-refresh/only-export-components
export const PlanContext = createContext()

// Orden en que cambia la condición al tocar el botón de simulación
const CONDICIONES = ["sin_nota", "aprobada", "desaprobada"]

function cargar(clave, inicial) {
  try {
    const guardado = localStorage.getItem(clave)
    return guardado ? JSON.parse(guardado) : inicial
  } catch {
    return inicial
  }
}

function guardar(clave, valor) {
  try {
    localStorage.setItem(clave, JSON.stringify(valor))
  } catch {
    // storage lleno o bloqueado
  }
}

// Agrega el id si no está, lo saca si ya está
const alternar = (lista, id) =>
  lista.includes(id) ? lista.filter((x) => x !== id) : [...lista, id]

export function PlanProvider({ children }) {
  const [favoritas, setFavoritas] = useState(() => cargar("favoritas", []))
  const [cursada, setCursada] = useState(() => cargar("cursada", []))
  const [condiciones, setCondiciones] = useState(() => cargar("condiciones", {}))
  const [anioActual, setAnioActual] = useState(() => cargar("anioActual", 1))
  const [enfocada, setEnfocada] = useState(null)
  const [favoritosAbierto, setFavoritosAbierto] = useState(false)

  useEffect(() => guardar("favoritas", favoritas), [favoritas])
  useEffect(() => guardar("cursada", cursada), [cursada])
  useEffect(() => guardar("condiciones", condiciones), [condiciones])
  useEffect(() => guardar("anioActual", anioActual), [anioActual])

  const toggleFavorita = (id) => setFavoritas((prev) => alternar(prev, id))
  const toggleCursada = (id) => setCursada((prev) => alternar(prev, id))
  const limpiarCursada = () => setCursada([])

  // Botón de simulación: pasa a la siguiente condición
  const simularCondicion = (id) =>
    setCondiciones((prev) => {
      const actual = prev[id] ?? "sin_nota"
      const siguiente = CONDICIONES[(CONDICIONES.indexOf(actual) + 1) % CONDICIONES.length]
      return { ...prev, [id]: siguiente }
    })

  // Si toco la misma materia otra vez, salgo del modo enfoque
  const enfocar = (id) => setEnfocada((prev) => (prev === id ? null : id))
  const salirDeEnfoque = () => setEnfocada(null)

  // Cuando se borra una materia de la API la sacamos de todas las listas
  const quitarMateria = (id) => {
    setFavoritas((prev) => prev.filter((x) => x !== id))
    setCursada((prev) => prev.filter((x) => x !== id))
    setCondiciones((prev) => {
      const copia = { ...prev }
      delete copia[id]
      return copia
    })
    setEnfocada((prev) => (prev === id ? null : prev))
  }

  return (
    <PlanContext.Provider
      value={{
        favoritas,
        cursada,
        condiciones,
        anioActual,
        enfocada,
        favoritosAbierto,
        toggleFavorita,
        toggleCursada,
        limpiarCursada,
        simularCondicion,
        setAnioActual,
        enfocar,
        salirDeEnfoque,
        quitarMateria,
        abrirFavoritos: () => setFavoritosAbierto(true),
        cerrarFavoritos: () => setFavoritosAbierto(false),
      }}
    >
      {children}
    </PlanContext.Provider>
  )
}
