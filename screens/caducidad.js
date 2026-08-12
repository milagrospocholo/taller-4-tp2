class CaducidadScreen extends Screen {
  constructor() {
    super('caducidad');
  }

  draw() {
    background(10, 11, 13);
    
    push();
    translate(width / 2, height / 2);
    noFill();
    stroke(255, 255, 255, 120);
    strokeWeight(1.5);
    
    // Triángulo que apunta hacia abajo
    let h = 50 + sin(frameCount * 0.05) * 15;
    triangle(0, h, -50, -h, 50, -h);
    
    stroke(255, 0, 127, 80);
    line(-100, 80, 100, 80);
    
    fill(255, 255, 255, 200);
    noStroke();
    textAlign(CENTER, CENTER);
    textFont('Inter');
    textSize(18);
    text("CADUCIDAD", 0, -200);
    textSize(12);
    text("Reactividad abstracta de prueba", 0, 200);
    pop();
  }
}
