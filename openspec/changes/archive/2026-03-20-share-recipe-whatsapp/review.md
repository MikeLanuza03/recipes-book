## Pre-Implementation Review

### Security

- [ ] La URL de WhatsApp usa `https://wa.me/` (dominio oficial) — no hay riesgo de inyección
- [ ] El mensaje se codifica con `encodeURIComponent` para evitar inyección de parámetros en la URL
- [ ] No se transmite información sensible — solo nombre, categoría y URL pública

### Performance

- [ ] No se agregan dependencias ni bundles adicionales
- [ ] No hay llamadas API extra — se usa la data ya cargada de la receta
- [ ] `window.open` no bloquea el hilo principal

### Accessibility

- [ ] El botón debe tener texto descriptivo ("Compartir por WhatsApp")
- [ ] El botón debe ser accesible por teclado (elemento `<a>` o `<button>`)
- [ ] Considerar `aria-label` si se usa solo un icono (no aplica — se usa texto)

### Testing

- [ ] Verificar que el botón aparece cuando la receta carga correctamente
- [ ] Verificar que el botón NO aparece durante loading o error
- [ ] Verificar que la URL generada contiene nombre, categoría y enlace
- [ ] Verificar que caracteres especiales (acentos, ñ) se codifican correctamente
- [ ] Verificar en mobile que abre la app de WhatsApp
