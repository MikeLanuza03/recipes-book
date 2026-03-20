## ADDED Requirements

### Requirement: Formulario de creación de receta con campos completos

El sistema SHALL presentar un formulario con los siguientes campos: nombre (texto), descripción (texto largo), ingredientes (lista dinámica), pasos de preparación (lista dinámica ordenable), categoría (dropdown), dificultad (selector: Fácil/Media/Difícil), tiempo de preparación (texto), y URL de imagen (texto).

#### Scenario: Visualización inicial del formulario

- **WHEN** el usuario navega a `/recipes/new`
- **THEN** el sistema MUST mostrar el formulario con todos los campos vacíos
- **AND** el campo de ingredientes MUST mostrar al menos un campo vacío
- **AND** el campo de pasos MUST mostrar al menos un campo vacío
- **AND** el dropdown de categoría MUST mostrar las categorías cargadas desde la API
- **AND** el selector de dificultad MUST mostrar las opciones: Fácil, Media, Difícil

#### Scenario: Formulario no accesible con ID numérico

- **WHEN** el usuario navega a `/recipes/123`
- **THEN** el sistema MUST mostrar la página de detalle de receta, no el formulario

### Requirement: Gestión dinámica de ingredientes

El sistema SHALL permitir agregar y quitar ingredientes del formulario dinámicamente.

#### Scenario: Agregar ingrediente

- **WHEN** el usuario hace clic en el botón "Agregar ingrediente"
- **THEN** el sistema MUST añadir un nuevo campo de texto vacío a la lista de ingredientes

#### Scenario: Quitar ingrediente

- **WHEN** el usuario hace clic en el botón de quitar junto a un ingrediente
- **THEN** el sistema MUST eliminar ese ingrediente de la lista

#### Scenario: No se puede quitar el último ingrediente

- **WHEN** solo queda un ingrediente en la lista y el usuario intenta quitarlo
- **THEN** el sistema MUST mantener al menos un campo de ingrediente visible

### Requirement: Gestión dinámica de pasos con reordenamiento

El sistema SHALL permitir agregar, quitar y reordenar los pasos de preparación.

#### Scenario: Agregar paso

- **WHEN** el usuario hace clic en el botón "Agregar paso"
- **THEN** el sistema MUST añadir un nuevo campo de texto vacío al final de la lista de pasos

#### Scenario: Quitar paso

- **WHEN** el usuario hace clic en el botón de quitar junto a un paso
- **THEN** el sistema MUST eliminar ese paso de la lista y renumerar los pasos restantes

#### Scenario: Reordenar paso hacia arriba

- **WHEN** el usuario hace clic en el botón "subir" de un paso que no es el primero
- **THEN** el sistema MUST intercambiar ese paso con el paso anterior

#### Scenario: Reordenar paso hacia abajo

- **WHEN** el usuario hace clic en el botón "bajar" de un paso que no es el último
- **THEN** el sistema MUST intercambiar ese paso con el paso siguiente

#### Scenario: No se puede mover el primer paso hacia arriba

- **WHEN** el paso es el primero de la lista
- **THEN** el botón de "subir" MUST estar deshabilitado

#### Scenario: No se puede mover el último paso hacia abajo

- **WHEN** el paso es el último de la lista
- **THEN** el botón de "bajar" MUST estar deshabilitado

#### Scenario: No se puede quitar el último paso

- **WHEN** solo queda un paso en la lista y el usuario intenta quitarlo
- **THEN** el sistema MUST mantener al menos un campo de paso visible

### Requirement: Validación de campos requeridos

El sistema SHALL validar todos los campos requeridos antes de enviar el formulario y mostrar mensajes de error claros en español.

#### Scenario: Envío con campos vacíos

- **WHEN** el usuario intenta enviar el formulario con campos requeridos vacíos
- **THEN** el sistema MUST mostrar mensajes de error junto a cada campo vacío
- **AND** el formulario NO MUST enviarse al servidor

#### Scenario: Campos requeridos

- **WHEN** el usuario intenta enviar el formulario
- **THEN** el sistema MUST validar que nombre no esté vacío
- **AND** MUST validar que descripción no esté vacía
- **AND** MUST validar que al menos un ingrediente tenga texto
- **AND** MUST validar que al menos un paso tenga texto
- **AND** MUST validar que se haya seleccionado una categoría
- **AND** MUST validar que se haya seleccionado una dificultad
- **AND** MUST validar que el tiempo de preparación no esté vacío

#### Scenario: URL de imagen opcional

- **WHEN** el usuario deja el campo de URL de imagen vacío
- **THEN** el sistema MUST permitir el envío sin URL de imagen

#### Scenario: Mensaje de error descriptivo

- **WHEN** un campo requerido está vacío
- **THEN** el mensaje de error MUST ser descriptivo (ejemplo: "El nombre de la receta es obligatorio")

### Requirement: Envío del formulario y persistencia

El sistema SHALL enviar los datos del formulario al servidor vía POST /recipes y manejar la respuesta.

#### Scenario: Creación exitosa

- **WHEN** el usuario completa todos los campos requeridos y envía el formulario
- **THEN** el sistema MUST enviar un POST a `/recipes` con los datos del formulario
- **AND** MUST mostrar indicador de carga durante el envío
- **AND** tras respuesta exitosa MUST redirigir al detalle de la receta creada (`/recipes/:id`)
- **AND** MUST invalidar el cache del listado de recetas

#### Scenario: Error del servidor al crear

- **WHEN** el servidor responde con un error al intentar crear la receta
- **THEN** el sistema MUST mostrar un mensaje de error al usuario
- **AND** MUST mantener los datos del formulario sin perderlos

### Requirement: Navegación al formulario de creación

El sistema SHALL proporcionar acceso al formulario desde la página de listado de recetas.

#### Scenario: Botón de agregar receta en el listado

- **WHEN** el usuario está en la página de listado de recetas
- **THEN** el sistema MUST mostrar un botón o enlace "Agregar Receta" visible
- **AND** al hacer clic MUST navegar a `/recipes/new`

#### Scenario: Cancelar creación

- **WHEN** el usuario hace clic en "Cancelar" dentro del formulario
- **THEN** el sistema MUST navegar de regreso al listado de recetas sin guardar datos
