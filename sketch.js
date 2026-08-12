// Mapa de pantallas registradas en el sistema
const screens = {};
// Pantalla actualmente activa
let currentScreen = null;

/**
 * Función global para cambiar la pantalla activa.
 * Puede ser invocada desde la interfaz HTML (botones de navegación).
 * @param {string} screenName - Nombre identificador de la pantalla.
 */
function selectScreen(screenName) {
  if (screens[screenName]) {
    currentScreen = screens[screenName];
    currentScreen.enter();
  }

  // Actualizar el estado visual de los botones de navegación en el HTML
  const buttons = document.querySelectorAll('.nav-btn');
  buttons.forEach(btn => {
    if (btn.getAttribute('onclick').includes(`'${screenName}'`)) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
}

/**
 * Inicialización de p5.js
 */
function setup() {
  // Crear el canvas y colocarlo dentro del contenedor específico en el DOM
  const canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('canvas-container');

  // Inicializar e instanciar cada una de las 9 pantallas
  screens['memoria'] = new MemoriaScreen();
  screens['herencia'] = new HerenciaScreen();
  screens['caducidad'] = new CaducidadScreen();
  screens['identidad'] = new IdentidadScreen();
  screens['empatia'] = new EmpatiaScreen();
  screens['colaboracion'] = new ColaboracionScreen();
  screens['incertidumbre'] = new IncertidumbreScreen();
  screens['ansiedad'] = new AnsiedadScreen();
  screens['expectativa'] = new ExpectativaScreen();

  // Ejecutar el setup de cada pantalla para inicializaciones locales
  for (let key in screens) {
    screens[key].setup();
  }

  // Seleccionar la pantalla inicial por defecto
  selectScreen('memoria');
}

/**
 * Loop de dibujo principal de p5.js
 */
function draw() {
  if (currentScreen) {
    currentScreen.draw();
  }
}

/**
 * Eventos del mouse y teclado.
 * Se delegan a la pantalla activa si esta los ha implementado.
 */
function mousePressed() {
  if (currentScreen) {
    currentScreen.mousePressed();
  }
}

function mouseReleased() {
  if (currentScreen) {
    currentScreen.mouseReleased();
  }
}

function mouseDragged() {
  if (currentScreen) {
    currentScreen.mouseDragged();
  }
}

function mouseMoved() {
  if (currentScreen) {
    currentScreen.mouseMoved();
  }
}

function keyPressed() {
  if (currentScreen) {
    currentScreen.keyPressed();
  }
}

/**
 * Manejo del cambio de tamaño de la ventana para mantener la responsividad del lienzo
 */
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  if (currentScreen) {
    currentScreen.windowResized();
  }
}
