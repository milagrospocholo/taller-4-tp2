/**
 * Pantalla que representa el concepto de "Caducidad".
 * Un único círculo grande y muy brillante en el centro de la pantalla.
 * Permanece quieto y se desgasta (pierde brillo y grosor) de forma progresiva
 * cada vez que el cursor del mouse ingresa a su área, hasta desaparecer por completo.
 */
class CaducidadScreen extends Screen {
  constructor() {
    super('caducidad');
    this.circleX = 0;
    this.circleY = 0;
    this.circleRadius = 260; // Tamaño grande, sin ocupar toda la pantalla
    this.intensity = 1.0; // Nivel de brillo/opacidad (1.0 a 0.0)
    this.active = true; // Determina si el círculo sigue existiendo
    this.isHovered = false; // Estado para detectar la entrada del cursor (mouseEnter)
  }

  /**
   * Inicialización al entrar a la pantalla
   */
  enter() {
    this.circleX = width / 2;
    this.circleY = height / 2;
    this.intensity = 1.0;
    this.active = true;
    this.isHovered = false;
  }

  /**
   * Bucle de dibujo y actualización de p5.js
   */
  draw() {
    background(10, 11, 13); // Fondo oscuro profundo

    if (!this.active) {
      return;
    }

    // 1. Detectar entrada del cursor (mouseEnter) al área del círculo
    let d = dist(mouseX, mouseY, this.circleX, this.circleY);
    let isInside = d < this.circleRadius / 2;

    if (isInside) {
      // Disparar el desgaste únicamente en el instante en que el cursor entra al círculo
      if (!this.isHovered) {
        this.isHovered = true;
        this.wearDown();
      }
    } else {
      // Resetear el estado cuando el cursor sale del círculo
      this.isHovered = false;
    }

    // 2. Dibujar el círculo si sigue activo
    if (this.active) {
      push();
      noFill();
      
      let alphaValue = this.intensity * 255;
      // Grosor del trazo disminuye con la intensidad (de 8.0px a 1.0px) para dar sensación de desgaste
      let strokeW = 1.0 + this.intensity * 7.0; 
      
      stroke(0, 242, 254, alphaValue); // Cian eléctrico brillante con opacidad variable
      strokeWeight(strokeW);
      
      circle(this.circleX, this.circleY, this.circleRadius);
      pop();
    }
  }

  /**
   * Reduce la intensidad de brillo y el grosor del círculo
   */
  wearDown() {
    // Reducir la intensidad un 10% en cada paso (10 interacciones completas hasta desaparecer)
    this.intensity -= 0.10;

    // Si la intensidad es menor a un umbral mínimo, el círculo se desvanece por completo
    if (this.intensity <= 0.01) {
      this.intensity = 0.0;
      this.active = false;
    }
  }

  /**
   * Mantener el círculo perfectamente centrado en caso de redimensión de la ventana
   */
  windowResized() {
    this.circleX = width / 2;
    this.circleY = height / 2;
  }
}
