class IncertidumbreScreen extends Screen {
  constructor() {
    super('incertidumbre');
  }

  draw() {
    background(10, 11, 13);
    
    push();
    translate(width / 2, height / 2);
    noFill();
    strokeWeight(1.5);
    
    // Dibujar una serie de líneas con pequeñas variaciones aleatorias para representar incertidumbre
    randomSeed(99);
    for (let i = -4; i <= 4; i++) {
      let offset = i * 25;
      let jitterX = random(-5, 5) * sin(frameCount * 0.1);
      let jitterY = random(-5, 5) * cos(frameCount * 0.1);
      
      stroke(0, 242, 254, 120);
      line(offset + jitterX, -100, offset + jitterY, 100);
    }
    
    fill(255, 255, 255, 200);
    noStroke();
    textAlign(CENTER, CENTER);
    textFont('Inter');
    textSize(18);
    text("INCERTIDUMBRE", 0, -200);
    textSize(12);
    text("Reactividad abstracta de prueba", 0, 200);
    pop();
  }
}
