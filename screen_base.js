/**
 * Clase base para todas las pantallas del sistema interactivo.
 * Define la interfaz común y el ciclo de vida de cada subsistema.
 */
class Screen {
  /**
   * @param {string} name - Nombre identificador de la pantalla.
   */
  constructor(name) {
    this.name = name;
  }

  /**
   * Inicialización única de la pantalla. Se ejecuta al iniciar el sketch.
   */
  setup() {
    // Implementar en subclase si es necesario
  }

  /**
   * Se ejecuta cada vez que el usuario entra a esta pantalla.
   * Útil para reiniciar variables, animaciones o estados locales.
   */
  enter() {
    // Implementar en subclase si es necesario
  }

  /**
   * Método de dibujo y actualización. Se ejecuta dentro del loop draw() de p5.js.
   */
  draw() {
    // Implementar en subclase
  }

  /**
   * Eventos de entrada del mouse y teclado.
   * Delegados desde el sketch principal cuando esta pantalla está activa.
   */
  mousePressed() {}
  mouseReleased() {}
  mouseDragged() {}
  mouseMoved() {}
  keyPressed() {}

  /**
   * Se ejecuta cuando cambia el tamaño de la ventana.
   */
  windowResized() {
    // Implementar en subclase si es necesario
  }
}
