## ADDED Requirements

### Requirement: Botón de compartir por WhatsApp en página de detalle

El sistema SHALL mostrar un botón "Compartir por WhatsApp" en la página de detalle de una receta que permita al usuario compartir la receta a través de WhatsApp.

#### Scenario: Botón visible en la página de detalle

- **WHEN** el usuario navega a la página de detalle de una receta (`/recipes/:id`)
- **THEN** el sistema MUST mostrar un botón "Compartir por WhatsApp" visible en la zona de metadata de la receta

#### Scenario: Botón no visible durante carga o error

- **WHEN** la receta está cargando o no se encontró
- **THEN** el botón de compartir NO MUST mostrarse

### Requirement: Apertura de WhatsApp con mensaje pre-formateado

Al presionar el botón, el sistema SHALL abrir WhatsApp con un mensaje que incluya el nombre de la receta, la categoría y el enlace a la página de detalle.

#### Scenario: Compartir receta exitosamente

- **WHEN** el usuario hace clic en el botón "Compartir por WhatsApp"
- **THEN** el sistema MUST abrir una nueva ventana/pestaña con la URL `https://wa.me/?text=<mensaje-codificado>`
- **AND** el mensaje MUST incluir el nombre de la receta
- **AND** el mensaje MUST incluir la categoría de la receta
- **AND** el mensaje MUST incluir la URL completa de la página de detalle de la receta

#### Scenario: Formato del mensaje compartido

- **WHEN** el usuario comparte una receta llamada "Tacos al Pastor" de categoría "Mexicana" desde `http://localhost:5173/recipes/1`
- **THEN** el mensaje MUST contener el texto del nombre "Tacos al Pastor"
- **AND** MUST contener la categoría "Mexicana"
- **AND** MUST contener la URL `http://localhost:5173/recipes/1`

#### Scenario: Caracteres especiales en el mensaje

- **WHEN** la receta tiene caracteres especiales en el nombre (acentos, ñ, etc.)
- **THEN** el sistema MUST codificar correctamente el mensaje usando `encodeURIComponent`
