## Why

La aplicación actualmente muestra un listado de recetas pero no permite ver los detalles completos de cada una. Los usuarios necesitan acceder a la información completa de una receta (ingredientes, pasos de preparación, descripción) para poder cocinarla. Sin una vista de detalle, la app no cumple su propósito principal.

## What Changes

- Agregar navegación con React Router para soportar múltiples vistas (listado y detalle)
- Crear página de detalle de receta que muestre: imagen grande, nombre, descripción, lista de ingredientes, pasos numerados, categoría, dificultad y tiempo de preparación
- Agregar botón de volver al listado desde la vista de detalle
- Ampliar el modelo de datos de `Recipe` con campos `description`, `ingredients` y `steps`
- Agregar endpoint RTK Query para obtener una receta individual (`GET /recipes/:id`)
- Actualizar el mock de datos (`db.json`) con los nuevos campos
- Hacer las recipe cards clickeables para navegar al detalle

## Capabilities

### New Capabilities

- `recipe-detail`: Vista de detalle de receta individual con todos sus datos, navegación desde el listado, y botón para volver atrás
- `app-routing`: Configuración de React Router con rutas para el listado (`/`) y el detalle (`/recipes/:id`)

### Modified Capabilities

- `recipe-listing`: Las recipe cards pasan a ser enlaces navegables al detalle de cada receta

## Impact

- **Dependencias**: Se añade `react-router-dom` como nueva dependencia
- **Modelo de datos**: Se amplía la interfaz `Recipe` con `description`, `ingredients` y `steps`
- **API**: Nuevo endpoint RTK Query `getRecipeById` para `GET /recipes/:id`
- **Mock data**: `db.json` necesita campos adicionales en cada receta
- **Componentes afectados**: `App.tsx` (wrapping con Router), `RecipeCard.tsx` (convertir en enlace), nuevos componentes para la vista de detalle
