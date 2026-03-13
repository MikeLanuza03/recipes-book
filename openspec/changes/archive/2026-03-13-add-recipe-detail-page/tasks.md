## 1. Data Model & Mock Data

- [x] 1.1 Ampliar la interfaz `Recipe` en `types.ts` con campos opcionales: `description?: string`, `ingredients?: string[]`, `steps?: string[]`
- [x] 1.2 Actualizar `db.json` agregando `description`, `ingredients` y `steps` a cada receta existente

## 2. API Layer

- [x] 2.1 Agregar endpoint `getRecipeById` en `recipesApi.ts` que haga `GET /recipes/:id` y retorne un `Recipe`
- [x] 2.2 Exportar el hook `useGetRecipeByIdQuery` desde `recipesApi.ts`

## 3. Routing Setup

- [x] 3.1 Instalar `react-router-dom` como dependencia
- [x] 3.2 Envolver la app con `BrowserRouter` en `main.tsx`
- [x] 3.3 Configurar rutas en `App.tsx`: `/` para `RecipeList`, `/recipes/:id` para `RecipeDetailPage`, y redirigir rutas desconocidas a `/`
- [x] 3.4 Mantener el header fuera de las rutas como layout compartido

## 4. Recipe Detail Page

- [x] 4.1 Crear componente `RecipeDetailPage.tsx` en `features/recipes/` que extraiga el `id` de `useParams` y llame a `useGetRecipeByIdQuery`
- [x] 4.2 Implementar estado de carga con indicador visual
- [x] 4.3 Implementar estado de error y estado de "receta no encontrada" con enlace de vuelta al listado
- [x] 4.4 Mostrar imagen grande de la receta con fallback a placeholder
- [x] 4.5 Mostrar nombre como heading, y category/difficulty/prepTime como badges
- [x] 4.6 Mostrar descripción de la receta (ocultar sección si no existe)
- [x] 4.7 Mostrar lista de ingredientes (ocultar sección si no existe o está vacía)
- [x] 4.8 Mostrar pasos de preparación como lista numerada (ocultar sección si no existe o está vacía)
- [x] 4.9 Agregar botón "Volver al listado" que navegue a `/` usando `Link`

## 5. Recipe Card Navigation

- [x] 5.1 Envolver el contenido de `RecipeCard` con `<Link to={/recipes/${recipe.id}}>` para hacer cada card navegable al detalle
