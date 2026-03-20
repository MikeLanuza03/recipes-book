## 1. Implementación del botón de compartir

- [x] 1.1 Agregar función `handleShareWhatsApp` en `RecipeDetailPage.tsx` que construya el mensaje con nombre, categoría y URL, y abra `https://wa.me/?text=<encoded>`
- [x] 1.2 Agregar botón "Compartir por WhatsApp" en la zona de badges/metadata de la receta
- [x] 1.3 Estilizar el botón con Tailwind CSS (color verde WhatsApp, consistente con el diseño existente)

## 2. Verificación

- [x] 2.1 Verificar que el botón aparece en la página de detalle y no aparece durante loading/error
- [x] 2.2 Verificar que al hacer clic se abre WhatsApp con el mensaje correcto (nombre, categoría, URL)
- [x] 2.3 Verificar que caracteres especiales en nombres de recetas se codifican correctamente
