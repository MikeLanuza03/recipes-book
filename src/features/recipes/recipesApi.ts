import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Category, CreateRecipeInput, Recipe } from "./types";

export const recipesApi = createApi({
  reducerPath: "recipesApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001" }),
  tagTypes: ["Recipe"],
  endpoints: (builder) => ({
    getRecipes: builder.query<Recipe[], void>({
      query: () => "/recipes",
      providesTags: ["Recipe"],
    }),
    getRecipeById: builder.query<Recipe, number>({
      query: (id) => `/recipes/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Recipe", id }],
    }),
    getCategories: builder.query<Category[], void>({
      query: () => "/categories",
    }),
    createRecipe: builder.mutation<Recipe, CreateRecipeInput>({
      query: (newRecipe) => ({
        url: "/recipes",
        method: "POST",
        body: newRecipe,
      }),
      invalidatesTags: ["Recipe"],
    }),
  }),
});

export const {
  useGetRecipesQuery,
  useGetRecipeByIdQuery,
  useGetCategoriesQuery,
  useCreateRecipeMutation,
} = recipesApi;
