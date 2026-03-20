## Context

La aplicación Recipe Book permite visualizar recetas (listado, búsqueda/filtro, detalle) pero no crearlas. El stack ya incluye React Hook Form, Zod y @hookform/resolvers instalados pero sin usar. La API mock (JSON Server) ya soporta `POST /recipes`. Este cambio añade el primer formulario de la aplicación, estableciendo el patrón para futuros formularios.

## Goals / Non-Goals

**Goals:**

- Permitir al usuario crear recetas completas con todos los campos del modelo
- Validar inputs antes de enviar al servidor con mensajes claros en español
- Manejar listas dinámicas de ingredientes y pasos (agregar, quitar, reordenar pasos)
- Establecer el patrón de formularios del proyecto (React Hook Form + Zod)
- Invalidar el cache de RTK Query tras crear una receta para mantener consistencia

**Non-Goals:**

- Edición o eliminación de recetas existentes
- Upload de archivos de imagen (solo URL)
- Creación de nuevas categorías desde el formulario
- Validación server-side o manejo de conflictos de concurrencia

## Decisions

### 1. React Hook Form + Zod para formularios y validación

**Decisión**: Usar React Hook Form con zodResolver para validación declarativa.

**Justificación**: Las dependencias ya están instaladas en el proyecto (`react-hook-form`, `zod`, `@hookform/resolvers`). RHF minimiza re-renders y Zod permite definir esquemas tipados que generan tanto validación como tipos TypeScript.

**Alternativa descartada**: Validación manual con useState — más código, sin tipado automático, más re-renders.

### 2. useFieldArray de RHF para listas dinámicas

**Decisión**: Usar `useFieldArray` para manejar ingredientes y pasos.

**Justificación**: Es la solución nativa de React Hook Form para arrays de campos. Soporta append, remove y move (reordenar) sin lógica custom. Mantiene la integración con validación de Zod.

**Alternativa descartada**: Estado local con useState para arrays — pierde integración con RHF y requiere sincronización manual.

### 3. Componente único RecipeCreatePage con secciones internas

**Decisión**: Un solo componente página `RecipeCreatePage.tsx` que contiene todo el formulario, sin extraer sub-componentes a menos que la complejidad lo requiera.

**Justificación**: Sigue el patrón existente de páginas auto-contenidas (como `RecipeDetailPage.tsx`). Extraer componentes prematuramente añade complejidad innecesaria para un formulario que se usa en un solo lugar.

### 4. Mutation RTK Query con cache invalidation via tags

**Decisión**: Agregar `createRecipe` como mutation en el API slice existente, usando `tagTypes` e `invalidatesTags` para refrescar el listado tras crear.

**Justificación**: RTK Query tags es el mecanismo estándar para invalidación de cache. Tras un POST exitoso, el listado de recetas se refrescará automáticamente.

### 5. Ruta `/recipes/new` antes de `/recipes/:id`

**Decisión**: Colocar la ruta `/recipes/new` antes de `/recipes/:id` en la configuración de React Router.

**Justificación**: React Router matchea rutas en orden. Si `/recipes/:id` va primero, "new" se interpretaría como un ID. Este es un patrón estándar en SPAs.

## Architecture Decisions

### Archivos nuevos

| Archivo | Propósito |
|---------|-----------|
| `src/features/recipes/RecipeCreatePage.tsx` | Componente página con formulario completo |
| `src/features/recipes/recipeSchema.ts` | Schema Zod para validación del formulario |

### Archivos modificados

| Archivo | Cambio |
|---------|--------|
| `src/features/recipes/recipesApi.ts` | Agregar `tagTypes`, tags en queries existentes, mutation `createRecipe` |
| `src/features/recipes/types.ts` | Agregar tipo `CreateRecipeInput` |
| `src/App.tsx` | Agregar ruta `/recipes/new` |
| `src/features/recipes/RecipeList.tsx` | Agregar botón/link "Agregar Receta" |

## Risks / Trade-offs

- **[JSON Server genera IDs automáticamente]** → No necesitamos generar IDs en el frontend; JSON Server asigna `id` auto-incremental en POST. Asumimos este comportamiento.
- **[Reordenar pasos puede ser confuso en mobile]** → Usaremos botones arriba/abajo en lugar de drag-and-drop para simplicidad. Drag-and-drop requeriría una dependencia adicional.
- **[Cache stale tras crear receta]** → Mitigado con invalidación de tags de RTK Query. El listado se refrescará automáticamente.
- **[Validación solo client-side]** → Aceptable para una mock API. En producción se agregaría validación server-side.
