import { z } from "zod";

export const recipeSchema = z.object({
  name: z.string().min(1, "El nombre de la receta es obligatorio"),
  description: z.string().min(1, "La descripción es obligatoria"),
  category: z.string().min(1, "Selecciona una categoría"),
  difficulty: z.string().min(1, "Selecciona una dificultad"),
  prepTime: z.string().min(1, "El tiempo de preparación es obligatorio"),
  image: z.string().optional().default(""),
  ingredients: z
    .array(z.object({ value: z.string() }))
    .min(1)
    .refine((items) => items.some((item) => item.value.trim() !== ""), {
      message: "Agrega al menos un ingrediente",
    }),
  steps: z
    .array(z.object({ value: z.string() }))
    .min(1)
    .refine((items) => items.some((item) => item.value.trim() !== ""), {
      message: "Agrega al menos un paso de preparación",
    }),
});

export type RecipeFormData = z.infer<typeof recipeSchema>;
