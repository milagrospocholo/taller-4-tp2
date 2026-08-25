/**
 * Pantalla que representa el concepto de "Incertidumbre".
 * Inicia con una grilla equilibrada y tranquila de 12 figuras que reacciona a los clics
 * del mouse ejecutando exactamente una única acción aleatoria e impredecible por clic.
 */
class IncertidumbreScreen extends Screen {
  constructor() {
    super('incertidumbre');
    this.shapes = [];
    // Paleta cromática oficial del proyecto
    this.palette = [];
  }

  /**
   * Inicialización inicial única al arrancar p5.js
   */
  setup() {
    // Definimos la paleta cromática del sistema
    this.palette = [
      color(226, 232, 240), // Blanco/Gris claro
      color(0, 242, 254),   // Cian de acento
      color(255, 0, 127)    // Magenta de acento
    ];
  }

  /**
   * Configuración al entrar a la pantalla (Estado Inicial)
   */
  enter() {
    this.shapes = [];
    
    const cols = 4;
    const rows = 3;
    
    // Márgenes seguros con respecto a la barra de navegación superior (60px)
    const xMargin = width * 0.16;
    const yMarginTop = 160;
    const yMarginBottom = 110;
    
    const xSpacing = (width - 2 * xMargin) / (cols - 1);
    const ySpacing = (height - yMarginTop - yMarginBottom) / (rows - 1);
    
    const types = ['circle', 'square', 'triangle'];
    
    // Generar grilla simétrica y equilibrada de 12 figuras (4 de cada tipo)
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        let x = xMargin + c * xSpacing;
        let y = yMarginTop + r * ySpacing;
        
        // Distribución secuencial equilibrada de formas geométricas
        let shapeIndex = (r * cols + c) % types.length;
        
        this.shapes.push({
          type: types[shapeIndex],
          x: x,
          y: y,
          targetX: x,
          targetY: y,
          size: 70,
          targetSize: 70,
          angle: 0,
          targetAngle: 0,
          color: color(226, 232, 240) // Todas inician en blanco para transmitir tranquilidad y orden
        });
      }
    }
  }

  /**
   * Bucle de dibujo y actualización principal de p5.js
   */
  draw() {
    background(10, 11, 13); // Fondo oscuro profundo

    // Recorrer y actualizar las figuras utilizando interpolación lineal (lerp)
    for (let i = this.shapes.length - 1; i >= 0; i--) {
      let s = this.shapes[i];

      // Interpolación para transiciones visuales ultra fluidas a 60 FPS
      s.x = lerp(s.x, s.targetX, 0.12);
      s.y = lerp(s.y, s.targetY, 0.12);
      s.size = lerp(s.size, s.targetSize, 0.12);
      s.angle = lerp(s.angle, s.targetAngle, 0.12);

      // Eliminar de memoria figuras que han encogido por completo (Acción de Desaparición)
      if (s.targetSize === 0 && s.size < 0.5) {
        this.shapes.splice(i, 1);
        continue;
      }

      // Renderizado
      push();
      translate(s.x, s.y);
      rotate(s.angle);
      stroke(s.color);
      strokeWeight(1.5);
      noFill();

      // Dibujar forma geométrica
      if (s.type === 'circle') {
        circle(0, 0, s.size);
      } else if (s.type === 'square') {
        rectMode(CENTER);
        rect(0, 0, s.size, s.size);
      } else if (s.type === 'triangle') {
        let r = s.size / 2;
        let h = r * sqrt(3);
        triangle(0, -h * 2/3, -r, h * 1/3, r, h * 1/3);
      }
      pop();
    }
  }

  /**
   * Evento de clic: selecciona y ejecuta EXACTAMENTE una única acción al azar
   */
  mousePressed() {
    // Si no quedan figuras en pantalla, solo permitimos la acción de aparición
    let action;
    if (this.shapes.length === 0) {
      action = 0; // Forzar aparición de nueva figura
    } else {
      action = floor(random(6)); // Seleccionar aleatoriamente una de las 6 acciones (0 a 5)
    }

    switch (action) {
      case 0:
        this.actionAddShape();
        break;
      case 1:
        this.actionRemoveShape();
        break;
      case 2:
        this.actionChangeSize();
        break;
      case 3:
        this.actionChangeColor();
        break;
      case 4:
        this.actionSwapPositions();
        break;
      case 5:
        this.actionRotateAll();
        break;
    }
  }

  /**
   * Acción 0: Aparece una nueva figura en una posición aleatoria de la pantalla
   */
  actionAddShape() {
    // Límite máximo razonable para evitar excesiva sobrecarga y mantener abstracción
    if (this.shapes.length >= 36) return;

    const types = ['circle', 'square', 'triangle'];
    const margin = 80;
    const topMargin = 120;
    
    let posX = random(margin, width - margin);
    let posY = random(topMargin, height - margin);
    let finalSize = random(50, 110);

    this.shapes.push({
      type: random(types),
      x: posX,
      y: posY,
      targetX: posX,
      targetY: posY,
      size: 0, // Inicia invisible y escala progresivamente
      targetSize: finalSize,
      angle: random(TWO_PI),
      targetAngle: random(TWO_PI),
      color: random(this.palette)
    });
  }

  /**
   * Acción 1: Desaparece una figura existente elegida al azar
   */
  actionRemoveShape() {
    if (this.shapes.length === 0) return;
    
    let idx = floor(random(this.shapes.length));
    this.shapes[idx].targetSize = 0; // Desvanecer mediante tamaño antes de remover en draw()
  }

  /**
   * Acción 2: Una figura elegida al azar cambia radicalmente su tamaño
   */
  actionChangeSize() {
    if (this.shapes.length === 0) return;

    let idx = floor(random(this.shapes.length));
    this.shapes[idx].targetSize = random(30, 150);
  }

  /**
   * Acción 3: Una figura elegida al azar cambia de color dentro de la paleta permitida
   */
  actionChangeColor() {
    if (this.shapes.length === 0) return;

    let idx = floor(random(this.shapes.length));
    let currentColor = this.shapes[idx].color;
    let newColor = random(this.palette);
    
    // Asegurar que el color realmente cambie
    let attempts = 0;
    while (currentColor.toString() === newColor.toString() && attempts < 5) {
      newColor = random(this.palette);
      attempts++;
    }
    this.shapes[idx].color = newColor;
  }

  /**
   * Acción 4: Dos figuras elegidas al azar intercambian sus posiciones de destino
   */
  actionSwapPositions() {
    if (this.shapes.length < 2) return;

    let idx1 = floor(random(this.shapes.length));
    let idx2 = floor(random(this.shapes.length));
    
    while (idx2 === idx1) {
      idx2 = floor(random(this.shapes.length));
    }

    // Intercambiar las coordenadas target para gatillar la traslación animada
    let tempX = this.shapes[idx1].targetX;
    let tempY = this.shapes[idx1].targetY;
    
    this.shapes[idx1].targetX = this.shapes[idx2].targetX;
    this.shapes[idx1].targetY = this.shapes[idx2].targetY;
    
    this.shapes[idx2].targetX = tempX;
    this.shapes[idx2].targetY = tempY;
  }

  /**
   * Acción 5: Todas las figuras presentes rotan un ángulo aleatorio simultáneamente
   */
  actionRotateAll() {
    if (this.shapes.length === 0) return;

    let rotAngle = random(-PI, PI);
    for (let s of this.shapes) {
      s.targetAngle += rotAngle;
    }
  }

  /**
   * Control dinámico de grilla para mantener responsividad de la ventana
   */
  windowResized() {
    // Si aún mantenemos la grilla inicial ordenada (sin clics o con las posiciones originales intactas)
    // podemos reajustar sus posiciones. Sin embargo, para evitar romper composiciones avanzadas
    // resultantes de la interacción aleatoria (como intercambios), solo reajustamos si no se ha alterado la grilla.
    // En este caso, al ser un lienzo dinámico experimental reactivo a Incertidumbre, la redimensión del lienzo
    // recalculará de forma básica los targets relativos o mantendrá los valores actuales para conservar la composición lograda.
  }
}
