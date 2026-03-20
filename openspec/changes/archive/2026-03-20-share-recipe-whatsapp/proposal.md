## Why

Los usuarios no tienen forma de compartir recetas con amigos o familiares directamente desde la aplicación. WhatsApp es la plataforma de mensajería más usada en Latinoamérica, por lo que agregar un botón de compartir por WhatsApp en la página de detalle aumenta la utilidad y el alcance de la app.

## What Changes

- Nuevo botón "Compartir por WhatsApp" en la página de detalle de receta (`RecipeDetailPage`)
- Al presionarlo, abre WhatsApp (web o app nativa) con un mensaje pre-formateado que incluye: nombre de la receta, categoría y enlace a la página de detalle
- Se usa la API de WhatsApp (`https://wa.me/?text=...`) sin dependencias adicionales

### In scope

- Botón de compartir por WhatsApp en la página de detalle
- Mensaje pre-formateado con nombre, categoría y URL de la receta
- Apertura en nueva pestaña/ventana

### Out of scope

- Compartir por otras redes sociales (Facebook, Twitter, etc.)
- Compartir desde el listado o la tarjeta de receta
- Tracking de shares o analytics

## Capabilities

### New Capabilities

- `share-recipe-whatsapp`: Botón para compartir una receta por WhatsApp desde la página de detalle

### Modified Capabilities

_(ninguna — la página de detalle gana un botón pero sus requisitos existentes no cambian)_

## Impact

- **Archivos modificados**: `src/features/recipes/RecipeDetailPage.tsx` — se agrega botón de compartir en la zona de metadata/badges
- **Dependencias**: Ninguna nueva — se usa la URL scheme nativa de WhatsApp
- **APIs**: No se modifican endpoints del servidor
