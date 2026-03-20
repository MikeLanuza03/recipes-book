## Context

La página de detalle de receta (`RecipeDetailPage.tsx`) muestra la información completa de una receta. Actualmente no tiene ninguna funcionalidad de compartir. WhatsApp ofrece una API de deep linking (`https://wa.me/?text=...`) que permite abrir la app con un mensaje pre-formateado sin requerir SDK ni dependencias.

## Goals / Non-Goals

**Goals:**

- Permitir al usuario compartir una receta por WhatsApp con un clic
- Generar un mensaje legible con nombre, categoría y enlace directo a la receta
- Funcionar tanto en desktop (abre WhatsApp Web) como en mobile (abre la app)

**Non-Goals:**

- No se busca soporte para otras plataformas de compartir
- No se requiere un componente genérico de "share" reutilizable
- No se implementa acortador de URLs ni tracking

## Decisions

### 1. Usar `https://wa.me/?text=` como mecanismo de compartir

**Decisión**: Construir la URL de WhatsApp usando `https://wa.me/?text=<encoded-message>` y abrirla con `window.open`.

**Justificación**: Es la API oficial de WhatsApp para compartir. No requiere dependencias, funciona en todos los navegadores y dispositivos, y WhatsApp se encarga de manejar la redirección a web o app nativa.

**Alternativa descartada**: Web Share API (`navigator.share`) — no es específica de WhatsApp y tiene soporte limitado en desktop.

### 2. Construir la URL de la receta con `window.location.origin`

**Decisión**: Usar `window.location.origin + /recipes/${id}` para generar el enlace de la receta.

**Justificación**: Genera la URL correcta independientemente del entorno (localhost en desarrollo, dominio en producción). No requiere configuración adicional.

### 3. Botón inline junto a los badges de metadata

**Decisión**: Colocar el botón de compartir en la zona de badges (categoría, dificultad, tiempo), como un botón estilizado con icono/texto.

**Justificación**: Es un lugar visible sin alterar el layout existente. Sigue el patrón visual de la página.

## Architecture Decisions

### Archivos modificados

| Archivo | Cambio |
|---------|--------|
| `src/features/recipes/RecipeDetailPage.tsx` | Agregar botón "Compartir por WhatsApp" y función `handleShare` |

### Archivos nuevos

Ninguno — el cambio es mínimo y se implementa directamente en el componente existente.

## Risks / Trade-offs

- **[WhatsApp no instalado]** → El enlace `wa.me` redirige a la página web de WhatsApp con opción de descargar. No requiere manejo especial.
- **[URL larga en el mensaje]** → Aceptable. WhatsApp maneja URLs largas correctamente y las convierte en enlaces clicables.
- **[Mensaje en español hardcoded]** → Aceptable para el alcance actual del proyecto. Internacionalización está fuera de scope.
