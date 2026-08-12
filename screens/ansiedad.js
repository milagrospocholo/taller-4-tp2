/**
 * Pantalla que representa el concepto de "Ansiedad".
 * Proceso interactivo de acumulación, saturación caótica y regulación progresiva.
 */
class AnsiedadScreen extends Screen {
  constructor() {
    super('ansiedad');
    this.shapes = [];
    this.ansiedadLevel = 0.0; // Nivel de ansiedad de 0.0 (calma) a 1.0 (saturación)
    this.maxShapes = 160; // Límite máximo de figuras aumentado para una saturación extrema de desborde
  }

  /**
   * Inicialización al entrar a la pantalla
   */
  enter() {
    this.shapes = [];
    this.ansiedadLevel = 0.0;
    
    // Crear las 3 figuras iniciales en calma (círculo, cuadrado, triángulo)
    const types = ['circle', 'square', 'triangle'];
    const padding = 150;
    
    // Posiciones iniciales bien distribuidas para que no se superpongan al inicio
    const positions = [
      { x: width * 0.25, y: height * 0.5 },
      { x: width * 0.5, y: height * 0.4 },
      { x: width * 0.75, y: height * 0.6 }
    ];

    for (let i = 0; i < 3; i++) {
      let angleSpeed = random(-0.01, 0.01);
      this.shapes.push({
        type: types[i],
        x: positions[i].x,
        y: positions[i].y,
        vx: random(-1, 1) * 0.8,
        vy: random(-1, 1) * 0.8,
        size: random(65, 80),
        angle: random(TWO_PI),
        rotationSpeed: angleSpeed,
        original: true,
        alpha: 255,
        fading: false,
        strokeColor: color(226, 232, 240) // Blanco/Gris claro para las originales
      });
    }
  }

  /**
   * Bucle principal de dibujo y actualización
   */
  draw() {
    background(10, 11, 13); // Fondo oscuro profundo

    // 1. Decaimiento natural y progresivo de la ansiedad cuando el usuario no interactúa
    // El decaimiento es lento para simular la descompresión progresiva
    if (this.ansiedadLevel > 0) {
      this.ansiedadLevel = max(0.0, this.ansiedadLevel - 0.0025);
    }

    // 2. Definir factores de movimiento y perturbación basados en el nivel de ansiedad
    const speedFactor = 1.0 + this.ansiedadLevel * 5.0; // Velocidad hasta 6x más rápida
    const jitter = this.ansiedadLevel * 6.5; // Vibración visual (jitter) de hasta 6.5 píxeles

    // 3. Control de población de figuras adicionales basado en el nivel actual de ansiedad
    // A menor ansiedad, menos figuras adicionales deben estar activas (targetCount decrece hacia 3)
    const targetCount = 3 + floor(this.ansiedadLevel * (this.maxShapes - 3));
    
    let activeNonOriginals = this.shapes.filter(s => !s.original && !s.fading);
    
    // Si tenemos más figuras activas que el objetivo actual, marcamos las sobrantes para desvanecerse
    if (activeNonOriginals.length + 3 > targetCount) {
      let overage = (activeNonOriginals.length + 3) - targetCount;
      // Marcamos las últimas figuras agregadas como fading = true
      for (let i = this.shapes.length - 1; i >= 0 && overage > 0; i--) {
        if (!this.shapes[i].original && !this.shapes[i].fading) {
          this.shapes[i].fading = true;
          overage--;
        }
      }
    }

    // 4. Aplicar fuerza de separación mutua en estado de calma
    // Esta fuerza se atenúa y desaparece por completo a medida que la ansiedad es máxima (superposición)
    this.applySeparation();

    // 5. Actualizar, rebotar y dibujar cada figura
    for (let i = this.shapes.length - 1; i >= 0; i--) {
      let s = this.shapes[i];

      // Actualizar desvanecimiento de figuras descartadas
      if (s.fading) {
        s.alpha -= 4; // Desvanecimiento gradual
        if (s.alpha <= 0) {
          this.shapes.splice(i, 1); // Remover del sistema al ser invisibles
          continue;
        }
      }

      // Actualizar posición con velocidad multiplicada por la ansiedad
      s.x += s.vx * speedFactor;
      s.y += s.vy * speedFactor;
      s.angle += s.rotationSpeed * speedFactor;

      // Mantener figuras dentro de la ventana de visualización (rebotar en bordes)
      this.keepInBounds(s);

      // Renderizar la figura con jitter (vibración por ansiedad)
      push();
      // Aplicar jitter aleatorio en x e y solo si hay ansiedad activa
      let rx = s.x + (jitter > 0 ? random(-jitter, jitter) : 0);
      let ry = s.y + (jitter > 0 ? random(-jitter, jitter) : 0);
      
      translate(rx, ry);
      rotate(s.angle);
      
      // Aplicar canal alfa al color para el desvanecimiento suave
      let c = color(s.strokeColor);
      c.setAlpha(s.alpha);
      
      stroke(c);
      strokeWeight(1.5);
      noFill();
      
      // Dibujar geometría pura según tipo
      if (s.type === 'circle') {
        circle(0, 0, s.size);
      } else if (s.type === 'square') {
        rectMode(CENTER);
        rect(0, 0, s.size, s.size);
      } else if (s.type === 'triangle') {
        // Triángulo equilátero centrado en su baricentro
        let r = s.size / 2;
        let h = r * sqrt(3);
        triangle(0, -h * 2/3, -r, h * 1/3, r, h * 1/3);
      }
      pop();
    }
  }

  /**
   * Evento de interacción: Clic del mouse
   * Incrementa la ansiedad e introduce figuras de forma progresiva.
   */
  mousePressed() {
    // Incrementar nivel de ansiedad
    this.ansiedadLevel = min(1.0, this.ansiedadLevel + 0.20);

    // Determinar cantidad de figuras a agregar en este clic (entre 10 y 15 para saturar de verdad)
    const shapesToAddCount = floor(random(10, 16));
    const types = ['circle', 'square', 'triangle'];
    
    // Paleta de colores para figuras adicionales (blanco, cian de acento, magenta de acento)
    const colors = [
      color(226, 232, 240), // Blanco/Gris claro
      color(0, 242, 254),   // Cian eléctrico
      color(255, 0, 127)    // Magenta/Rosa vibrante
    ];

    for (let i = 0; i < shapesToAddCount; i++) {
      // Evitar agregar figuras si ya se alcanzó el límite máximo
      if (this.shapes.length >= this.maxShapes) break;

      // Las nuevas figuras aparecen dispersas en un radio amplio para ocupar toda la pantalla
      let offsetX = random(-220, 220);
      let offsetY = random(-220, 220);
      let posX = constrain(mouseX + offsetX, 50, width - 50);
      let posY = constrain(mouseY + offsetY, 110, height - 50); // Evitar barra de navegación (60px)

      // Velocidad inicial ligeramente mayor para las figuras inyectadas por ansiedad
      let velAngle = random(TWO_PI);
      let velMag = random(1.0, 1.8);

      this.shapes.push({
        type: random(types),
        x: posX,
        y: posY,
        vx: cos(velAngle) * velMag,
        vy: sin(velAngle) * velMag,
        size: random(40, 65), // Tamaños ligeramente más variados y pequeños para acumulación
        angle: random(TWO_PI),
        rotationSpeed: random(-0.03, 0.03),
        original: false,
        alpha: 255,
        fading: false,
        strokeColor: random(colors)
      });
    }
  }

  /**
   * Aplica fuerzas de repulsión entre las figuras en estado de calma.
   * La repulsión se anula gradualmente a mayor nivel de ansiedad para permitir superposición.
   */
  applySeparation() {
    const safetyDist = 110; // Distancia mínima deseada entre centros
    const forceStrength = 0.04; // Intensidad del empuje de separación
    
    // A mayor ansiedad, menor es la fuerza de separación (se reduce a 0)
    const separationFactor = 1.0 - this.ansiedadLevel;
    if (separationFactor <= 0.05) return;

    for (let i = 0; i < this.shapes.length; i++) {
      for (let j = i + 1; j < this.shapes.length; j++) {
        let s1 = this.shapes[i];
        let s2 = this.shapes[j];

        // Ignorar figuras que están desapareciendo del lienzo
        if (s1.fading || s2.fading) continue;

        let dx = s2.x - s1.x;
        let dy = s2.y - s1.y;
        let d = dist(s1.x, s1.y, s2.x, s2.y);

        if (d === 0) {
          s2.x += random(-1, 1);
          s2.y += random(-1, 1);
          continue;
        }

        // Si hay solapamiento (distancia menor a la de seguridad)
        if (d < safetyDist) {
          let overlap = safetyDist - d;
          let nx = dx / d;
          let ny = dy / d;

          // Calcular empuje proporcional al solapamiento y factor de calma
          let pushX = nx * overlap * forceStrength * separationFactor;
          let pushY = ny * overlap * forceStrength * separationFactor;

          // Las figuras originales ofrecen mayor inercia y se mueven menos
          let w1 = s1.original ? 0.3 : 0.8;
          let w2 = s2.original ? 0.3 : 0.8;

          s1.x -= pushX * w2;
          s1.y -= pushY * w2;
          s2.x += pushX * w1;
          s2.y += pushY * w1;
        }
      }
    }
  }

  /**
   * Limita la posición de una figura a los bordes de la pantalla y la hace rebotar.
   * Evita solaparse con la barra de navegación superior (60px de altura).
   * @param {Object} shape - Objeto que representa la figura
   */
  keepInBounds(shape) {
    let r = shape.size / 2;
    let topMargin = 60; // Altura de la barra de navegación superior

    if (shape.x - r < 0) {
      shape.x = r;
      shape.vx = Math.abs(shape.vx);
    } else if (shape.x + r > width) {
      shape.x = width - r;
      shape.vx = -Math.abs(shape.vx);
    }

    if (shape.y - r < topMargin) {
      shape.y = topMargin + r;
      shape.vy = Math.abs(shape.vy);
    } else if (shape.y + r > height) {
      shape.y = height - r;
      shape.vy = -Math.abs(shape.vy);
    }
  }
}
