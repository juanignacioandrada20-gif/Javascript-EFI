/*
SITEC — GUÍA DE DEFENSA (comentarios de estudio, no cambian la lógica)
ARCHIVO: src/services/api.js
FUNCIÓN GENERAL: Servicio HTTP: URL base y funciones GET, POST, DELETE a FastAPI; convierte respuestas JSON y errores.
PARA EXPLICAR AL PROFESOR: api.js concentra fetch y evita repetir peticiones en cada componente.

EXPLICACIÓN DE LAS LÍNEAS DEL CÓDIGO ORIGINAL:
Línea 3: Exporta «API_URL» para utilizarlo desde otros módulos.
Línea 9: Función HTTP común: ejecuta fetch, controla errores y convierte JSON.
Línea 10: fetch realiza la petición HTTP a la URL construida con la API base y la ruta.
Línea 12: El operador ... (spread) copia/expande elementos; ayuda a crear un estado nuevo sin mutar el anterior.
Línea 15: Comprueba error HTTP (fuera de 200–299) para construir un mensaje.
Línea 17: Intenta una operación que puede fallar; el error se maneja en catch.
Línea 18: Interpreta la respuesta HTTP como JSON.
Línea 20: Condición if: ejecuta el bloque/devolución únicamente si se cumple esta comprobación.
Línea 21: ?? usa un valor alternativo solamente si el primero es null o undefined.
Línea 22: Captura fallos del servidor, validación o almacenamiento.
Línea 25: Lanza un error que la interfaz puede capturar y mostrar.
Línea 28: Condición if: ejecuta el bloque/devolución únicamente si se cumple esta comprobación.
Línea 29: Interpreta la respuesta HTTP como JSON.
Línea 33: GET /materias/?size=100; devuelve el arreglo items de la página.
Línea 38: GET /materias/:id; devuelve detalle de una materia.
Línea 40: POST /materias/ con objeto serializado a JSON.
Línea 41: Convierte un objeto/arreglo de JavaScript a texto JSON para enviarlo o guardarlo.
Línea 43: DELETE /materias/:id en el backend.
Línea 48: GET de vínculos; devuelve items.
Línea 53: POST de relación materia y correlativa.
Línea 54: Convierte un objeto/arreglo de JavaScript a texto JSON para enviarlo o guardarlo.
Línea 56: DELETE de relación compuesta por los dos IDs.
Línea 60: GET de carreras; devuelve items.
FIN DE LA GUÍA. Debajo está el código original sin modificar.
*/
// Todas las peticiones a la API de FastAPI (EFI PP1 Python) pasan por acá.
// La URL se toma de la variable de entorno VITE_API_URL (.env / Vercel).
export const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000"

// La API pagina con fastapi-pagination: { items, total, page, size, pages }.
// Pedimos size=100 (el máximo) para traer el plan completo en una sola página.
const TAMANIO_PAGINA = 100

async function request(path, options = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  })

  if (!res.ok) {
    let mensaje = `Error ${res.status}`
    try {
      const data = await res.json()
      // FastAPI devuelve "detail" como string (HTTPException) o como lista (errores de validación)
      if (typeof data.detail === "string") mensaje = data.detail
      else if (Array.isArray(data.detail)) mensaje = data.detail[0]?.msg ?? mensaje
    } catch {
      // la respuesta no era JSON
    }
    throw new Error(mensaje)
  }

  if (res.status === 204) return null
  return res.json()
}

// ---- Materias ----
export async function getMaterias() {
  const data = await request(`/materias/?size=${TAMANIO_PAGINA}`)
  return data.items
}

export const getMateria = (id) => request(`/materias/${id}`)

export const createMateria = (materia) =>
  request("/materias/", { method: "POST", body: JSON.stringify(materia) })

export const deleteMateria = (id) => request(`/materias/${id}`, { method: "DELETE" })

// ---- Correlativas ----
// Cada correlativa es { materia_id, correlativa_id }:
// "para cursar materia_id hay que tener correlativa_id"
export async function getCorrelativas() {
  const data = await request(`/correlativas/?size=${TAMANIO_PAGINA}`)
  return data.items
}

export const createCorrelativa = (correlativa) =>
  request("/correlativas/", { method: "POST", body: JSON.stringify(correlativa) })

export const deleteCorrelativa = (materiaId, correlativaId) =>
  request(`/correlativas/${materiaId}/${correlativaId}`, { method: "DELETE" })

// ---- Carreras ----
export async function getCarreras() {
  const data = await request(`/carreras/?size=${TAMANIO_PAGINA}`)
  return data.items
}
