## 1. Types y Schema de Validación

- [x] 1.1 Agregar tipo `CreateRecipeInput` en `src/features/recipes/types.ts` (Recipe sin `id`)
- [x] 1.2 Crear schema Zod en `src/features/recipes/recipeSchema.ts` con validación de todos los campos y mensajes de error en español

## 2. API Layer

- [x] 2.1 Agregar `tagTypes: ['Recipe']` al API slice y tags `providesTags` en queries existentes (`getRecipes`, `getRecipeById`)
- [x] 2.2 Agregar mutation `createRecipe` en `recipesApi.ts` con `POST /recipes` e `invalidatesTags: ['Recipe']`
- [x] 2.3 Exportar hook `useCreateRecipeMutation`

## 3. Componente del Formulario

- [x] 3.1 Crear `src/features/recipes/RecipeCreatePage.tsx` con estructura base del formulario usando React Hook Form y zodResolver
- [x] 3.2 Implementar campos básicos: nombre, descripción, tiempo de preparación, URL de imagen
- [x] 3.3 Implementar dropdown de categoría cargando opciones desde `useGetCategoriesQuery`
- [x] 3.4 Implementar selector de dificultad (Fácil/Media/Difícil)
- [x] 3.5 Implementar lista dinámica de ingredientes con `useFieldArray` (agregar/quitar, mínimo 1)
- [x] 3.6 Implementar lista dinámica de pasos con `useFieldArray` (agregar/quitar/reordenar con botones subir/bajar, mínimo 1)
- [x] 3.7 Mostrar mensajes de error de validación junto a cada campo
- [x] 3.8 Implementar submit: llamar mutation, mostrar loading, redirigir a detalle tras éxito, mostrar error si falla

## 4. Routing y Navegación

- [x] 4.1 Agregar ruta `/recipes/new` en `App.tsx` (antes de `/recipes/:id`)
- [x] 4.2 Agregar botón/link "Agregar Receta" en `RecipeList.tsx` que navegue a `/recipes/new`
- [x] 4.3 Agregar botón "Cancelar" en el formulario que navegue al listado

## 5. Verificación Visual

- [x] 5.1 Verificar que el formulario se renderiza correctamente con todos los campos
- [x] 5.2 Verificar que la validación muestra errores al enviar vacío
- [x] 5.3 Verificar que la creación de receta funciona end-to-end (crear → redirigir a detalle → aparece en listado)
