/*
SITEC — GUÍA DE DEFENSA (comentarios de estudio, no cambian la lógica)
ARCHIVO: src/utils/mensajes.js
FUNCIÓN GENERAL: Calcula estado y texto de la barra de inscripción según si la materia desbloquea otras.
PARA EXPLICAR AL PROFESOR: El color amarillo/gris es orientativo: priorización, no validación oficial de aprobación.

EXPLICACIÓN DE LAS LÍNEAS DEL CÓDIGO ORIGINAL:
Línea 1: Importación: trae funciones/componentes de otro módulo para reutilizarlos.
Línea 5: Devuelve texto y color según materias que la seleccionada habilita.
Línea 6: Variable calculada a partir de los datos actuales para mostrar/filtrar la vista.
Línea 8: Condición if: ejecuta el bloque/devolución únicamente si se cumple esta comprobación.
Línea 15: Variable calculada a partir de los datos actuales para mostrar/filtrar la vista.
Línea 16: filter devuelve un arreglo nuevo SOLO con elementos que cumplen la condición.
Línea 17: map transforma cada elemento en otro (por ejemplo, crear una tarjeta JSX por materia).
Línea 21: join une los textos del arreglo usando el separador indicado.
FIN DE LA GUÍA. Debajo está el código original sin modificar.
*/
import { destrabaDe } from "./correlativas"

// Según si la materia es correlativa de otras, define el color de la barra
// y el mensaje que se muestra al inscribirse
export function estadoInscripcion(materia, materias, grafo) {
  const destraba = destrabaDe(materia.id, grafo)

  if (destraba.size === 0) {
    return {
      estado: "sin_correlativa",
      mensaje: "OJO! Si no tenés tiempo para cursar todo el año, priorizá otra materia con correlativa.",
    }
  }

  const nombres = materias
    .filter((m) => (grafo.habilita[materia.id] ?? []).includes(m.id))
    .map((m) => m.nombre_materia)

  return {
    estado: "con_correlativa",
    mensaje: `Cuenta con correlativa: es requisito de ${nombres.join(", ")}.`,
  }
}
