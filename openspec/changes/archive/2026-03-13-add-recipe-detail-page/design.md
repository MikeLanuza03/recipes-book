## Context

La aplicación Recipe Book actualmente tiene una vista única de listado con búsqueda y filtros. No existe infraestructura de routing ni vista de detalle. El modelo de datos `Recipe` solo contiene campos resumidos (name, image, category, difficulty, prepTime) sin campos de detalle como descripción, ingredientes o pasos. JSON Server soporta nativamente `GET /recipes/:id`, así que no se necesita configuración adicional en el backend.

## Goals / Non-Goals

**Goals:**

- Implementar navegación client-side con React Router entre listado y detalle
- Mostrar toda la información de una receta en una vista dedicada
- Mantener la arquitectura existente (feature-based, RTK Query, Tailwind)
- Preservar el estado de búsqueda/filtros al volver del detalle al listado

**Non-Goals:**

- Edición o creación de recetas (será un cambio futuro)
- Navegación entre recetas (anterior/siguiente) desde el detalle
- Compartir recetas o deep linking con metadata SEO
- Animaciones de transición entre vistas

## Decisions

### 1. React Router v7 con `BrowserRouter`

Usar `react-router-dom` v7 con `BrowserRouter` envolviendo la app en `main.tsx`. Las rutas se definen en `App.tsx` con `Routes`/`Route`.

**Alternativas consideradas:**
- **TanStack Router**: Más type-safe pero añade complejidad innecesaria para dos rutas simples.
- **Rutas en archivo separado**: No justificado con solo dos rutas; se puede refactorizar cuando crezca.

**Estructura de rutas:**
- `/` → `RecipeList`
- `/recipes/:id` → `RecipeDetail`

### 2. Extender el modelo `Recipe` con campos opcionales

Añadir `description`, `ingredients` y `steps` como campos opcionales en la interfaz `Recipe` existente. Esto permite que el listado siga funcionando sin esos campos (JSON Server los devuelve todos en `GET /recipes`, pero el listado simplemente no los usa).

```typescript
export interface Recipe {
  id: number;
  name: string;
  image: string;
  category: string;
  difficulty: string;
  prepTime: string;
  description?: string;
  ingredients?: string[];
  steps?: string[];
}
```

**Alternativas consideradas:**
- **Tipo `RecipeDetail` separado extendiendo `Recipe`**: Más explícito pero añade indirección innecesaria. JSON Server devuelve el mismo objeto completo en ambos endpoints.

### 3. Endpoint RTK Query `getRecipeById`

Añadir un nuevo endpoint `getRecipeById` en `recipesApi.ts` que haga `GET /recipes/:id`. JSON Server soporta esto nativamente.

**Decisión sobre cache**: No usar `selectFromResult` sobre `getRecipes` porque no queremos depender de que el listado ya esté cargado. Cada vista de detalle hace su propio fetch, y RTK Query cachea automáticamente por argumento.

### 4. Componente `RecipeDetail` como página

Crear `RecipeDetailPage.tsx` en `features/recipes/` que:
- Extrae `id` de los params de la URL con `useParams`
- Llama a `useGetRecipeByIdQuery(id)`
- Muestra estados de carga, error y no encontrado
- Renderiza la vista de detalle completa

### 5. `RecipeCard` como enlace con `Link`

Envolver el contenido de `RecipeCard` con `<Link to={/recipes/${recipe.id}}>` de React Router. Esto mantiene la semántica de navegación (accesible, se puede abrir en nueva pestaña) sin duplicar lógica.

### 6. Layout compartido con header en `App.tsx`

El header se mantiene en `App.tsx` fuera de las rutas. Solo el contenido de `<main>` cambia entre vistas. Esto evita duplicar el layout.

## Risks / Trade-offs

- **JSON Server devuelve todos los campos en el listado**: Enviamos más datos de los necesarios en `GET /recipes`. En una API real se optimizaría con campos selectivos, pero para el mock es aceptable.
- **Campos opcionales en `Recipe`**: Si un registro no tiene `ingredients` o `steps`, la vista de detalle debe manejar el caso gracefully mostrando un estado vacío. → Mitigación: validar y mostrar mensajes apropiados.
- **Pérdida de estado de filtros al navegar**: React Router desmonta `RecipeList` al cambiar de ruta. → Mitigación: RTK Query cachea las queries, así que los datos se mantienen. Los filtros de búsqueda se pierden al volver; esto es aceptable para esta iteración.
