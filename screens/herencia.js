class HerenciaScreen extends Screen {
  constructor() {
    super('herencia');
  }

  draw() {
    background(10, 11, 13);
    
    push();
    translate(width / 2, height / 2);
    noFill();
    stroke(255, 0, 127, 150); // Color acento rosa/magenta
    strokeWeight(1.5);
    
    // Un cuadrado que rota y escala
    let sz = 100 + cos(frameCount * 0.05) * 20;
    rectMode(CENTER);
    rect(0, 0, sz, sz);
    
    stroke(255, 255, 255, 50);
    circle(0, 0, 150);
    
    fill(255, 255, 255, 200);
    noStroke();
    textAlign(CENTER, CENTER);
    textFont('Inter');
    textSize(18);
    text("HERENCIA", 0, -200);
    textSize(12);
    text("Reactividad abstracta de prueba", 0, 200);
    pop();
  }
}
