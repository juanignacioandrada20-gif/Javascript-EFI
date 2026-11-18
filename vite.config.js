/*
SITEC — GUÍA DE DEFENSA (comentarios de estudio, no cambian la lógica)
ARCHIVO: vite.config.js
FUNCIÓN GENERAL: Activa plugins React y Tailwind dentro de Vite.
PARA EXPLICAR AL PROFESOR: Es configuración de herramientas, no lógica funcional.

EXPLICACIÓN DE LAS LÍNEAS DEL CÓDIGO ORIGINAL:
Línea 1: Importación: trae funciones/componentes de otro módulo para reutilizarlos.
Línea 2: Importación: trae funciones/componentes de otro módulo para reutilizarlos.
Línea 3: Importación: trae funciones/componentes de otro módulo para reutilizarlos.
Línea 6: Exportación por defecto: permite importar este componente o función.
FIN DE LA GUÍA. Debajo está el código original sin modificar.
*/
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    tailwindcss(),
  ],
})
