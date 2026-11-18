/*
SITEC — GUÍA DE DEFENSA (comentarios de estudio, no cambian la lógica)
ARCHIVO: src/components/FormCorrelativa.jsx
FUNCIÓN GENERAL: Formulario controlado de alta de vínculo entre materias.
PARA EXPLICAR AL PROFESOR: Valida que no sea ella misma, que el año sea válido y que no esté duplicada.

EXPLICACIÓN DE LAS LÍNEAS DEL CÓDIGO ORIGINAL:
Línea 1: Importación: trae funciones/componentes de otro módulo para reutilizarlos.
Línea 2: Importación: trae funciones/componentes de otro módulo para reutilizarlos.
Línea 3: Importación: trae funciones/componentes de otro módulo para reutilizarlos.
Línea 7: Define la función/componente FormCorrelativa: Formulario controlado de alta de vínculo entre materias.
Línea 8: useState crea el estado «form» (valores de los campos del formulario) y «setForm» para actualizarlo.
Línea 9: useState crea el estado «errors» (errores de validación por campo) y «setErrors» para actualizarlo.
Línea 10: useState crea el estado «enviando» (si se está enviando el formulario) y «setEnviando» para actualizarlo.
Línea 11: useState crea el estado «mensaje» (resultado de creación/error) y «setMensaje» para actualizarlo.
Línea 13: Actualiza el estado de un formulario controlado usando name y value del evento.
Línea 15: El operador ... (spread) copia/expande elementos; ayuda a crear un estado nuevo sin mutar el anterior.
Línea 18: Encuentra una materia en el arreglo por ID.
Línea 20: Comprueba requisitos del formulario y devuelve objeto de errores.
Línea 25: Condición if: ejecuta el bloque/devolución únicamente si se cumple esta comprobación.
Línea 26: Condición if: ejecuta el bloque/devolución únicamente si se cumple esta comprobación.
Línea 28: Condición if: ejecuta el bloque/devolución únicamente si se cumple esta comprobación.
Línea 29: Condición if: ejecuta el bloque/devolución únicamente si se cumple esta comprobación.
Línea 34: some responde true si al menos un elemento cumple la condición.
Línea 43: Previene recarga de página, valida, envía a API y muestra resultado.
Línea 44: Evita que el navegador envíe el formulario y recargue la página.
Línea 49: Obtiene las claves del objeto; length permite contar cuántos errores hubo.
Línea 52: Intenta una operación que puede fallar; el error se maneja en catch.
Línea 53: Espera la respuesta del POST a la API.
Línea 63: Captura fallos del servidor, validación o almacenamiento.
Línea 65: Se ejecuta al terminar, incluso si hubo error: útil para quitar el indicador de envío/carga.
Línea 70: sort ordena el arreglo usando la comparación indicada.
Línea 72: return entrega el resultado o JSX que React renderizará.
Línea 73: Formulario controlado: onSubmit ejecuta handleSubmit.
Línea 74: className aplica clases Tailwind: colores, márgenes, tipografía y disposición responsive.
Línea 75: className aplica clases Tailwind: colores, márgenes, tipografía y disposición responsive.
Línea 78: onChange actualiza el estado cuando cambia un input/select/checkbox.
Línea 80: map transforma cada elemento en otro (por ejemplo, crear una tarjeta JSX por materia).
Línea 81: key permite a React identificar establemente cada elemento de una lista.
Línea 87: onChange actualiza el estado cuando cambia un input/select/checkbox.
Línea 89: map transforma cada elemento en otro (por ejemplo, crear una tarjeta JSX por materia).
Línea 90: key permite a React identificar establemente cada elemento de una lista.
Línea 96: className aplica clases Tailwind: colores, márgenes, tipografía y disposición responsive.
Línea 101: Botón interactivo de la interfaz, asociado a acción/función.
Línea 103: disabled impide pulsar mientras está enviando o faltan datos.
Línea 104: className aplica clases Tailwind: colores, márgenes, tipografía y disposición responsive.
FIN DE LA GUÍA. Debajo está el código original sin modificar.
*/
import { useState } from "react"
import { createCorrelativa } from "../services/api"
import CampoForm, { inputStyle } from "./CampoForm"

const FORM_INICIAL = { materia_id: "", correlativa_id: "" }

export default function FormCorrelativa({ materias, correlativas, onCreada }) {
  const [form, setForm] = useState(FORM_INICIAL)
  const [errors, setErrors] = useState({})
  const [enviando, setEnviando] = useState(false)
  const [mensaje, setMensaje] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const buscar = (id) => materias.find((m) => m.id === Number(id))

  const validate = () => {
    const newErrors = {}
    const materia = buscar(form.materia_id)
    const previa = buscar(form.correlativa_id)

    if (!materia) newErrors.materia_id = "Elegí la materia"
    if (!previa) newErrors.correlativa_id = "Elegí la correlativa"

    if (materia && previa) {
      if (materia.id === previa.id) {
        newErrors.correlativa_id = "Una materia no puede ser correlativa de sí misma"
      } else if (previa.anio > materia.anio) {
        newErrors.correlativa_id = "La correlativa no puede ser de un año posterior"
      } else if (
        correlativas.some((c) => c.materia_id === materia.id && c.correlativa_id === previa.id)
      ) {
        newErrors.correlativa_id = "Esa correlatividad ya existe"
      }
    }

    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMensaje(null)

    const newErrors = validate()
    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) return

    setEnviando(true)
    try {
      await createCorrelativa({
        materia_id: Number(form.materia_id),
        correlativa_id: Number(form.correlativa_id),
      })
      setMensaje({
        tipo: "ok",
        texto: `Ahora ${buscar(form.materia_id).nombre_materia} requiere ${buscar(form.correlativa_id).nombre_materia}`,
      })
      setForm(FORM_INICIAL)
      onCreada()
    } catch (err) {
      setMensaje({ tipo: "error", texto: err.message })
    } finally {
      setEnviando(false)
    }
  }

  const ordenadas = [...materias].sort((a, b) => a.anio - b.anio || a.nombre_materia.localeCompare(b.nombre_materia))

  return (
    <form onSubmit={handleSubmit} noValidate className="bg-white border border-zinc-200 p-6 ">
      <h2 className="text-lg text-zinc-800">Nueva correlativa</h2>
      <p className="text-sm text-zinc-500 mt-1">Para cursar la materia hay que tener aprobada la correlativa.</p>

      <CampoForm label="Materia" error={errors.materia_id}>
        <select name="materia_id" value={form.materia_id} onChange={handleChange} className={inputStyle}>
          <option value="">Elegir...</option>
          {ordenadas.map((m) => (
            <option key={m.id} value={m.id}>{m.anio}° - {m.nombre_materia}</option>
          ))}
        </select>
      </CampoForm>

      <CampoForm label="Requiere (correlativa)" error={errors.correlativa_id}>
        <select name="correlativa_id" value={form.correlativa_id} onChange={handleChange} className={inputStyle}>
          <option value="">Elegir...</option>
          {ordenadas.map((m) => (
            <option key={m.id} value={m.id}>{m.anio}° - {m.nombre_materia}</option>
          ))}
        </select>
      </CampoForm>

      {mensaje && (
        <p className={`mt-4 text-sm ${mensaje.tipo === "ok" ? "text-zinc-800 font-semibold" : "text-red-600"}`}>
          {mensaje.texto}
        </p>
      )}

      <button
        type="submit"
        disabled={enviando || materias.length < 2}
        className="bg-sitec-rojo hover:bg-sitec-rojo-2 text-white font-semibold w-full mt-6 py-3 cursor-pointer disabled:opacity-50"
      >
        {enviando ? "Guardando..." : "Guardar correlativa"}
      </button>
    </form>
  )
}
