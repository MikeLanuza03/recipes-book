## Why

Las recetas existentes en `db.json` tienen inconsistencias ortográficas y de formato que afectan la calidad visual de la aplicación: tildes faltantes, nombres con formato inconsistente y unidades de medida que varían entre recetas.

## What Changes

- Corregir tilde faltante: "porcion" → "porción" (receta Hot cakes, paso 3)
- Corregir nombre: "Hot cakes" → "Hotcakes" (es una sola palabra en español)
- Unificar formato de tiempo de preparación: "15 minutos" → "15 min" (consistente con el resto de recetas que usan "min")

### In scope

- Correcciones ortográficas en `db.json`
- Consistencia en unidades de medida de `prepTime`

### Out of scope

- Cambios de contenido o descripciones de recetas
- Agregar o quitar recetas
- Cambios en componentes o código fuente

## Capabilities

### New Capabilities

_(ninguna)_

### Modified Capabilities

_(ninguna — solo se corrigen datos, no cambian requisitos funcionales)_

## Impact

- **Archivo modificado**: `db.json` — correcciones de texto en la receta con id 7
- **Sin impacto en código**: No se modifican componentes, tipos ni API
