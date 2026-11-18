/*
SITEC — GUÍA DE DEFENSA (comentarios de estudio, no cambian la lógica)
ARCHIVO: src/utils/correlativas.js
FUNCIÓN GENERAL: Lógica de grafo: construye requisitos y habilitaciones; recorre conexiones directas e indirectas.
PARA EXPLICAR AL PROFESOR: Representamos dependencias entre materias y calculamos previas y qué destraba cada una.

EXPLICACIÓN DE LAS LÍNEAS DEL CÓDIGO ORIGINAL:
Línea 7: Convierte filas de correlativas en dos mapas: requisitos y habilita.
Línea 11: Bucle for/of: recorre elementos de una lista y ejecuta el cuerpo para cada uno.
Línea 12: Condición if: ejecuta el bloque/devolución únicamente si se cumple esta comprobación.
Línea 13: push agrega elementos al final del arreglo.
Línea 15: Condición if: ejecuta el bloque/devolución únicamente si se cumple esta comprobación.
Línea 16: push agrega elementos al final del arreglo.
Línea 23: Recorre un grafo con pila de pendientes y Set para no repetir materias.
Línea 24: Set crea una colección de valores únicos para evitar repetidos.
Línea 25: ?? usa un valor alternativo solamente si el primero es null o undefined.
Línea 27: while repite mientras queden elementos pendientes.
Línea 28: pop quita y devuelve el último elemento del arreglo.
Línea 29: has comprueba si un Set contiene ese valor.
Línea 30: add incorpora el ID al Set sin duplicarlo.
Línea 31: push agrega elementos al final del arreglo.
Línea 38: Calcula requisitos directos e indirectos de una materia.
Línea 41: Calcula lo que una materia desbloquea directa e indirectamente.
Línea 44: Devuelve normal, enfocada, previa, destraba o apagada para pintar tarjetas.
Línea 45: Condición if: ejecuta el bloque/devolución únicamente si se cumple esta comprobación.
Línea 46: Condición if: ejecuta el bloque/devolución únicamente si se cumple esta comprobación.
Línea 47: has comprueba si un Set contiene ese valor.
Línea 48: has comprueba si un Set contiene ese valor.
FIN DE LA GUÍA. Debajo está el código original sin modificar.
*/
// Lógica del plan de estudios: arma un "grafo" con las correlativas
// y permite saber qué materias son previas o cuáles se destraban.

// A partir de la lista de la API arma dos mapas:
//  requisitos[id] -> materias que necesito para cursar "id"
//  habilita[id]   -> materias que "id" destraba directamente
export function construirGrafo(correlativas) {
  const requisitos = {}
  const habilita = {}

  for (const { materia_id, correlativa_id } of correlativas) {
    if (!requisitos[materia_id]) requisitos[materia_id] = []
    requisitos[materia_id].push(correlativa_id)

    if (!habilita[correlativa_id]) habilita[correlativa_id] = []
    habilita[correlativa_id].push(materia_id)
  }

  return { requisitos, habilita }
}

// Recorre el mapa en cadena (directas e indirectas) sin repetir materias.
function recorrer(id, mapa) {
  const visitadas = new Set()
  const pendientes = [...(mapa[id] ?? [])]

  while (pendientes.length > 0) {
    const actual = pendientes.pop()
    if (visitadas.has(actual)) continue
    visitadas.add(actual)
    pendientes.push(...(mapa[actual] ?? []))
  }

  return visitadas
}

// Todas las materias que hay que aprobar antes (toda la cadena hacia atrás)
export const previasDe = (id, grafo) => recorrer(id, grafo.requisitos)

// Todas las materias que se destraban (toda la cadena hacia adelante)
export const destrabaDe = (id, grafo) => recorrer(id, grafo.habilita)

// Estado visual de una materia cuando hay una materia en "Modo Enfoque"
export function estadoEnEnfoque(id, enfocada, grafo) {
  if (enfocada === null) return "normal"
  if (id === enfocada) return "enfocada"
  if (previasDe(enfocada, grafo).has(id)) return "previa"
  if (destrabaDe(enfocada, grafo).has(id)) return "destraba"
  return "apagada"
}
