# SITEC — JAVASCRIPT COMENTADO PARA LA DEFENSA

Este repositorio es una copia de estudio del frontend de SITEC. Cada archivo JS/JSX incluye una guía de comentarios con el número de línea original, el significado de las funciones y cómo explicarlas al profesor. El código ejecutable se conserva intacto; las explicaciones son comentarios que no lo modifican.

## Cómo abrir en Visual Studio Code

1. Descargá el ZIP desde GitHub > Code > Download ZIP y descomprimilo.
2. Abrí la carpeta en VS Code.
3. En una terminal, ejecutá `npm install` y después `npm run dev`.
4. Entrá en http://localhost:5173/.
5. Buscá cualquier archivo en `src` para ver su guía explicativa al comienzo, seguida por el código.

## API backend

Copiá `.env.example` a `.env` y definí `VITE_API_URL=https://efi-python-javascript.fastapicloud.dev` o tu API local.

## Estructura

- `src/main.jsx`: inicia React.
- `src/App.jsx`: router, layout y proveedor del contexto.
- `src/components/`: elementos reutilizables.
- `src/pages/`: pantallas.
- `src/context/`: estado global, inscripciones/favoritos simulados en localStorage.
- `src/hooks/`: carga de materias, relaciones, errores y recargas.
- `src/services/api.js`: conexión fetch al backend Python.
- `src/utils/`: grafo de correlativas y mensajes.

## Importante

La inscripción y la condición académica se simulan en el frontend y se almacenan en localStorage, no en la base de datos Python. `package-lock.json` se genera con `npm install` y no requiere explicaciones de código.

Esta copia es independiente del repositorio original de los compañeros.
