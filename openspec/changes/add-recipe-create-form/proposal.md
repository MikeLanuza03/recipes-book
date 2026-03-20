## Why

Actualmente el libro de recetas solo permite visualizar recetas precargadas. Los usuarios necesitan poder agregar sus propias recetas para que la aplicación sea realmente útil como herramienta de gestión de recetas personales.

## What Changes

- Nuevo formulario de creación de recetas con campos: nombre, descripción, ingredientes (agregar/quitar dinámicamente), pasos de preparación (agregar/quitar/reordenar), categoría (dropdown con categorías existentes), dificultad (Fácil/Media/Difícil), tiempo de preparación y URL de imagen
- Validación de todos los campos requeridos con mensajes de error claros en español
- Nuevo endpoint RTK Query mutation `POST /recipes` para persistir la receta
- Nueva ruta `/recipes/new` para acceder al formulario
- Botón de navegación "Agregar Receta" en la página de listado
- Redirección automática al detalle de la receta creada tras guardar exitosamente

### In scope

- Formulario de creación con validación completa (React Hook Form + Zod)
- Mutation RTK Query para POST /recipes
- Ruta y navegación al formulario
- Listas dinámicas de ingredientes y pasos con agregar/quitar/reordenar
- Feedback visual de éxito/error al guardar

### Out of scope

- Edición de recetas existentes
- Eliminación de recetas
- Upload de imágenes (se usa URL)
- Creación de nuevas categorías

## Capabilities

### New Capabilities

- `recipe-create-form`: Formulario para crear nuevas recetas con validación, listas dinámicas de ingredientes/pasos, y persistencia vía API

### Modified Capabilities

_(ninguna — las capabilities existentes no cambian sus requisitos)_

## Impact

- **API layer**: Se agrega mutation `createRecipe` en `recipesApi.ts` con invalidación de cache
- **Routing**: Nueva ruta `/recipes/new` en `App.tsx` (debe ir antes de `/recipes/:id` para evitar conflicto)
- **Types**: Se crea tipo `CreateRecipeInput` (omitiendo `id` del tipo `Recipe`)
- **Navegación**: Se agrega botón/link en `RecipeList.tsx` para ir al formulario
- **Dependencias**: Se utilizan `react-hook-form`, `zod` y `@hookform/resolvers` (ya instalados)
