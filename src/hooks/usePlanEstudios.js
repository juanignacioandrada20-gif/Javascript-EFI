/*
SITEC — GUÍA DE DEFENSA (comentarios de estudio, no cambian la lógica)
ARCHIVO: src/hooks/usePlanEstudios.js
FUNCIÓN GENERAL: Hook personalizado: obtiene materias y correlativas, maneja carga/error, crea grafo y ofrece recargar.
PARA EXPLICAR AL PROFESOR: Centralizamos la consulta a FastAPI para reutilizarla en distintas páginas.

EXPLICACIÓN DE LAS LÍNEAS DEL CÓDIGO ORIGINAL:
Línea 1: Importación: trae funciones/componentes de otro módulo para reutilizarlos.
Línea 2: Importación: trae funciones/componentes de otro módulo para reutilizarlos.
Línea 3: Importación: trae funciones/componentes de otro módulo para reutilizarlos.
Línea 7: Hook que trae datos desde FastAPI, construye grafo y maneja carga/error/recarga.
Línea 8: useState crea el estado «materias» (lista de materias recibida de API) y «setMaterias» para actualizarlo.
Línea 9: useState crea el estado «correlativas» (lista de vínculos de correlatividad) y «setCorrelativas» para actualizarlo.
Línea 10: useState crea el estado «loading» (si la consulta está cargando) y «setLoading» para actualizarlo.
Línea 11: useState crea el estado «error» (mensaje de error de la API) y «setError» para actualizarlo.
Línea 12: useState crea el estado «recargas» (contador que fuerza una nueva consulta) y «setRecargas» para actualizarlo.
Línea 15: useCallback conserva una referencia estable a la función según dependencias.
Línea 17: useEffect ejecuta un efecto de sincronización (carga/API, localStorage o evento) al montar/cambiar dependencias.
Línea 20: Lee JSON almacenado en localStorage y usa un valor inicial si no hay datos o son inválidos.
Línea 23: Intenta una operación que puede fallar; el error se maneja en catch.
Línea 25: Lanza las consultas en paralelo y espera a que todas se resuelvan.
Línea 29: Condición if: ejecuta el bloque/devolución únicamente si se cumple esta comprobación.
Línea 33: Captura fallos del servidor, validación o almacenamiento.
Línea 34: Condición if: ejecuta el bloque/devolución únicamente si se cumple esta comprobación.
Línea 35: Se ejecuta al terminar, incluso si hubo error: útil para quitar el indicador de envío/carga.
Línea 36: Condición if: ejecuta el bloque/devolución únicamente si se cumple esta comprobación.
Línea 42: return entrega el resultado o JSX que React renderizará.
Línea 47: useMemo reutiliza el cálculo del grafo mientras no cambien sus dependencias.
FIN DE LA GUÍA. Debajo está el código original sin modificar.
*/
import { useCallback, useEffect, useMemo, useState } from "react"
import { getCorrelativas, getMaterias } from "../services/api"
import { construirGrafo } from "../utils/correlativas"

// Hook que trae materias y correlativas de la API.
// Maneja con useState los datos, el indicador de carga y el error.
export default function usePlanEstudios() {
  const [materias, setMaterias] = useState([])
  const [correlativas, setCorrelativas] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [recargas, setRecargas] = useState(0)

  // Permite volver a pedir los datos (por ejemplo después de borrar algo)
  const recargar = useCallback(() => setRecargas((n) => n + 1), [])

  useEffect(() => {
    let cancelado = false

    async function cargar() {
      setLoading(true)
      setError(null)
      try {
        // Las dos peticiones se hacen en paralelo
        const [dataMaterias, dataCorrelativas] = await Promise.all([
          getMaterias(),
          getCorrelativas(),
        ])
        if (!cancelado) {
          setMaterias(dataMaterias)
          setCorrelativas(dataCorrelativas)
        }
      } catch (err) {
        if (!cancelado) setError(err.message)
      } finally {
        if (!cancelado) setLoading(false)
      }
    }

    cargar()
    // Si el componente se desmonta antes de que llegue la respuesta, no actualizamos el estado
    return () => {
      cancelado = true
    }
  }, [recargas])

  const grafo = useMemo(() => construirGrafo(correlativas), [correlativas])

  return { materias, correlativas, grafo, loading, error, recargar }
}
