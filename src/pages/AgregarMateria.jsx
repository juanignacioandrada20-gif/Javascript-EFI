/*
SITEC — GUÍA DE DEFENSA (comentarios de estudio, no cambian la lógica)
ARCHIVO: src/pages/AgregarMateria.jsx
FUNCIÓN GENERAL: Pantalla contenedora de formulario de materias y de correlativas.
PARA EXPLICAR AL PROFESOR: Carga carreras para el selector y refresca el plan tras un alta.

EXPLICACIÓN DE LAS LÍNEAS DEL CÓDIGO ORIGINAL:
Línea 1: Importación: trae funciones/componentes de otro módulo para reutilizarlos.
Línea 2: Importación: trae funciones/componentes de otro módulo para reutilizarlos.
Línea 3: Importación: trae funciones/componentes de otro módulo para reutilizarlos.
Línea 4: Importación: trae funciones/componentes de otro módulo para reutilizarlos.
Línea 5: Importación: trae funciones/componentes de otro módulo para reutilizarlos.
Línea 6: Importación: trae funciones/componentes de otro módulo para reutilizarlos.
Línea 7: Importación: trae funciones/componentes de otro módulo para reutilizarlos.
Línea 8: Importación: trae funciones/componentes de otro módulo para reutilizarlos.
Línea 10: Define la función/componente AgregarMateria: Pantalla contenedora de formulario de materias y de correlativas.
Línea 11: Variable calculada a partir de los datos actuales para mostrar/filtrar la vista.
Línea 12: useState crea el estado «carreras» (lista de carreras del backend) y «setCarreras» para actualizarlo.
Línea 15: useEffect ejecuta un efecto de sincronización (carga/API, localStorage o evento) al montar/cambiar dependencias.
Línea 21: Condición if: ejecuta el bloque/devolución únicamente si se cumple esta comprobación.
Línea 22: Condición if: ejecuta el bloque/devolución únicamente si se cumple esta comprobación.
Línea 24: return entrega el resultado o JSX que React renderizará.
Línea 26: Componente reutilizable que muestra título y subtítulo.
Línea 31: className aplica clases Tailwind: colores, márgenes, tipografía y disposición responsive.
FIN DE LA GUÍA. Debajo está el código original sin modificar.
*/
import PageHeader from "../components/PageHeader"
import { useEffect, useState } from "react"
import ErrorMessage from "../components/ErrorMessage"
import FormCorrelativa from "../components/FormCorrelativa"
import FormMateria from "../components/FormMateria"
import Loader from "../components/Loader"
import usePlanEstudios from "../hooks/usePlanEstudios"
import { getCarreras } from "../services/api"

export default function AgregarMateria() {
  const { materias, correlativas, loading, error, recargar } = usePlanEstudios()
  const [carreras, setCarreras] = useState([])

  // Las carreras se usan para el select del formulario
  useEffect(() => {
    getCarreras()
      .then(setCarreras)
      .catch(() => setCarreras([]))
  }, [])

  if (loading) return <Loader />
  if (error) return <ErrorMessage mensaje={error} onReintentar={recargar} />

  return (
    <main>
      <PageHeader
        titulo="Cargar plan de estudios"
        subtitulo="Agregá materias y sus correlativas. Se guardan en la API."
      />

      <div className="grid md:grid-cols-2 gap-6 items-start">
        <FormMateria materias={materias} carreras={carreras} onCreada={recargar} />
        <FormCorrelativa materias={materias} correlativas={correlativas} onCreada={recargar} />
      </div>
    </main>
  )
}
