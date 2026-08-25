# Registro y Bitácora de Desarrollo del Proyecto

Este documento contiene el registro completo del proceso de desarrollo del sistema de 9 interfaces reactivas abstractas realizadas en p5.js, detallando las tecnologías, la estructura del proyecto, las decisiones visuales y de interacción, las correcciones aplicadas y la evolución del código de forma cronológica.

---

## 1. Tecnologías y Herramientas Utilizadas

El desarrollo del proyecto está construido de forma modular con tecnologías web nativas estándar de frontend:
- **Visual Studio Code:** Entorno de desarrollo para la edición del código.
- **p5.js (v1.9.0):** Biblioteca principal de JavaScript para dibujo creativo, animaciones e interacciones en tiempo real cargada mediante CDN.
- **HTML5:** Estructuración de la navegación superior y contenedor de lienzo.
- **CSS3:** Diseño responsivo, reset de márgenes, tipografías personalizadas y estilo estético traslúcido (*glassmorphism*) para la interfaz de navegación superior.
- **JavaScript Moderno (ES6):** Programación orientada a objetos (clases) para estructurar el lienzo de forma modular y control de flujo de navegación.

---

## 2. Estructura de Archivos del Proyecto

El sistema está organizado de manera modular para garantizar la escalabilidad y facilitar el mantenimiento de las pantallas sin que colisionen las variables o funciones de dibujo:

```text
Tp2 Taller 4/
│
├── index.html                   # Página principal, barra de navegación y carga de librerías
├── style.css                    # Estilos premium CSS y reset del lienzo interactivo
├── screen_base.js               # Clase abstracta base "Screen" y ciclo de vida de pantallas
├── sketch.js                    # Orquestador y enrutador del ciclo de p5.js y eventos
├── CONVERSACION_PROYECTO.md     # Este archivo (Bitácora de desarrollo)
│
└── screens/                     # Carpeta de las 9 interfaces interactivas
    ├── memoria.js               # Placeholder interactivo de la pantalla Memoria
    ├── herencia.js              # Placeholder interactivo de la pantalla Herencia
    ├── caducidad.js             # Implementación final de la pantalla Caducidad
    ├── identidad.js             # Placeholder interactivo de la pantalla Identidad
    ├── empatia.js               # Placeholder interactivo de la pantalla Empatía
    ├── colaboracion.js          # Placeholder interactivo de la pantalla Colaboración
    ├── incertidumbre.js         # Implementación final de la pantalla Incertidumbre
    ├── ansiedad.js              # Implementación final de la pantalla Ansiedad
    └── expectativa.js           # Placeholder interactivo de la pantalla Expectativa
```

---

## 3. Identidad Visual y Reglas Estéticas del Sistema

Para garantizar que todas las interfaces formen parte de un único universo gráfico coherente, se establecieron las siguientes restricciones de diseño y paletas:

### Restricciones Geométricas
- **Figuras permitidas:** Círculo, Cuadrado, Triángulo, Línea.
- **Restricción absoluta:** Queda estrictamente prohibido el uso de imágenes, iconos, ilustraciones, fotografías, figuras humanas, objetos reales o cualquier elemento de naturaleza figurativa. Todo el contenido debe ser abstracto.

### Paleta Cromática (Temática de Contraste Dark Mode)
- **Fondo General del Lienzo:** `#0a0b0d` (Gris profundo casi negro, que proporciona alta relación de contraste y sensación de espacio).
- **Trazos / Estructuras base:** `#e2e8f0` (Blanco tiza o gris claro para dar neutralidad).
- **Acento Primario (Frío):** `#00f2fe` (Cian eléctrico vibrante para reactividad energética).
- **Acento Secundario (Cálido):** `#ff007f` (Magenta/Rosa neón intenso para tensión o contraste emocional).
- **Estética de Trazos:** Diseños limpios usando `noFill()` and `stroke()` con grosores finos y controlados (1.5px a 8px) para asemejar un diagrama alámbrico o "wireframe" de alta precisión.

### Estilo de Movimiento
- Desplazamiento orgánico, suave y amortiguado.
- Rebote elástico contra los bordes de la pantalla.
- Easing e interpolación lineal para las transiciones e intensidades.
- Margen superior restrictivo de 60 píxeles para evitar que cualquier figura se encime o se oculte debajo de la barra de navegación superior.

---

## 4. Registro Cronológico del Desarrollo del Proyecto

### Fase 1: Estructura Base y Enrutamiento (Aprobado)
- **Decisión de Arquitectura:** Se creó la clase abstracta `Screen` en `screen_base.js` con los métodos del ciclo de vida (`setup()`, `enter()`, `draw()`, `windowResized()` y gestores de mouse/teclado). Las 9 pantallas heredan de esta clase.
- **Navegación:** `sketch.js` gestiona el diccionario de pantallas instanciadas. Al pulsar un botón de la barra superior en el HTML, se invoca `selectScreen(nombre)` que actualiza las clases del botón activo y ejecuta el método `enter()` de la pantalla seleccionada para limpiar y reiniciar sus variables internas.

---

### Fase 2: Implementación de la Pantalla "Ansiedad" (Aprobado)
- **Concepto:** Representar la ansiedad como una acumulación y saturación caótica que luego busca la calma lentamente.
- **Estado Inicial:** Un círculo, un cuadrado y un triángulo flotando lentamente por la pantalla, manteniendo su espacio y rebotando de forma suave en los bordes gracias a una fuerza de repulsión activa en calma.
- **Interacción (Primera Versión):** Cada clic inyectaba entre 2 y 4 figuras con un límite máximo de 35 figuras, aumentando la velocidad, la vibración y reduciendo la repulsión para permitir la superposición de elementos.
- **Corrección de Intensidad (Versión Final):**
  - Se aumentó la saturación para dar una fuerte sensación de desborde y descontrol.
  - Se incrementó el límite de figuras a **160**.
  - Cada clic añade de **10 a 15 figuras** de golpe con una amplia dispersión espacial (radio de **220 píxeles** alrededor del cursor).
  - La velocidad del movimiento y rotación escala hasta 6 veces más rápido de lo habitual.
  - Se incorporó un efecto de vibración (*jitter*) aleatorio en cada frame sobre los ejes X e Y proporcional al nivel de ansiedad.
  - **Optimización de Rendimiento:** El bucle anidado que calcula la repulsión de las figuras se desactiva por completo en niveles altos de ansiedad (`ansiedadLevel > 0.95`), evitando colisiones de cómputo en el pico gráfico y asegurando una animación a 60 FPS estables.
- **Descompresión:** Si cesa la interacción, la ansiedad disminuye progresivamente. Las figuras adicionales reducen velocidad, se detiene la vibración y se desvanecen (reduciendo su canal `alpha`) de manera escalonada en cascada hasta dejar únicamente las 3 figuras base con su repulsión espacial activa.

---

### Fase 3: Implementación de la Pantalla "Caducidad" (Aprobado)
- **Concepto:** Representar el desgaste, la atenuación y la desaparición irreversible de algo que se agota progresivamente con cada interacción.
- **Interacción (Primera Versión):** Un círculo de 90px de diámetro en el centro que saltaba a otra posición aleatoria del lienzo cada vez que el mouse pasaba por encima, reduciendo su intensidad hasta desaparecer en 8 interacciones.
- **Corrección Estática e Intensidad (Versión Final):**
  - **Posición Fija:** El círculo permanece **completamente quieto** en el centro geométrico de la pantalla. No se mueve ni cambia de posición durante toda la interacción.
  - **Tamaño Grande:** Se aumentó el diámetro de la figura a **260 píxeles** para otorgarle jerarquía sin llegar a copar todo el lienzo.
  - **Estado Inicial Muy Luminoso:** Inicia a máxima intensidad (`intensity = 1.0`, `alpha = 255`) en color cian eléctrico (`#00f2fe`) y con un grosor de trazo robusto de **8.0 píxeles** para simular una presencia brillante.
  - **Desgaste por Hover-In:** Para restar intensidad, el mouse debe entrar en el círculo. Se creó una bandera lógica (`isHovered`) para disparar el desgaste solo en el instante en que el cursor cruza el perímetro.
  - **Volver a Pasar:** Para aplicar una nueva pérdida de brillo, es obligatorio retirar el mouse del círculo y volver a ingresarlo.
  - **Efecto Físico de Desgaste:** En cada uno de los 10 pasos de atenuación (10% de reducción por pasada):
    - La opacidad (`alpha`) decae progresivamente.
    - El grosor del trazo se afina linealmente desde los 8.0px iniciales hasta un mínimo de 1.0px, expresando visualmente el debilitamiento.
  - **Desaparición Irreversible:** En la décima interacción, el círculo desaparece del todo del renderizado (`active = false`) de forma irreversible.

---

### Fase 4: Implementación de la Pantalla "Incertidumbre" (Aprobado)
- **Concepto:** Representar la incertidumbre a través del comportamiento errático y la imposibilidad de anticipar qué va a ocurrir después en cada interacción física.
- **Estado Inicial (Orden Simétrico):** Se dibuja una grilla fija de **12 figuras** organizada en 4 columnas por 3 filas (4 círculos, 4 cuadrados y 4 triángulos). Todos los elementos inician con la misma escala (70px), sin rotación y pintados en color blanco para transmitir una sensación inicial de equilibrio, estructura y tranquilidad.
- **Interacción (Acción Única e Impredecible):** Al presionar el mouse, el sistema selecciona de manera aleatoria **una sola acción** de entre 6 posibilidades, logrando que el comportamiento sea completamente indescifrable:
  - **Acción 0 (Aparición):** Introduce una figura nueva de la paleta cromática en un lugar libre aleatorio. El tamaño escala progresivamente desde 0 mediante interpolación.
  - **Acción 1 (Desaparición):** Elige una figura al azar y reduce su escala objetivo a 0 para removerla ordenadamente.
  - **Acción 2 (Cambio de Tamaño):** Modifica el tamaño objetivo de una figura aleatoria hacia una escala pequeña (30px) o muy grande (150px).
  - **Acción 3 (Cambio de Color):** Cambia el color de trazo de una figura al azar (blanco, cian o magenta).
  - **Acción 4 (Intercambio de Posición):** Elige dos figuras cualesquiera y cruza sus variables de destino (`targetX`, `targetY`), haciendo que viajen suavemente y se crucen de manera cruzada.
  - **Acción 5 (Rotación General):** Rota simultáneamente todas las figuras un ángulo aleatorio.
- **Animación e Interpolación:** Todas las propiedades de posición, escala y ángulo se actualizan mediante interpolación lineal (`lerp`), evitando saltos visuales abruptos y proporcionando suavidad al caos inducido.
- **Estado Final:** No existe. El diseño final tras interactuar es un resultado emergente, único y diferente en cada sesión.
