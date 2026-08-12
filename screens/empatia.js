class EmpatiaScreen extends Screen {
  constructor() {
    super('empatia');
  }

  draw() {
    background(10, 11, 13);
    
    push();
    translate(width / 2, height / 2);
    noFill();
    strokeWeight(1.5);
    
    let xOffset = sin(frameCount * 0.03) * 40;
    
    // Círculo izquierdo
    stroke(0, 242, 254, 150);
    circle(-xOffset, 0, 100);
    
    // Círculo derecho
    stroke(255, 0, 127, 150);
    circle(xOffset, 0, 100);
    
    fill(255, 255, 255, 200);
    noStroke();
    textAlign(CENTER, CENTER);
    textFont('Inter');
    textSize(18);
    text("EMPATÍA", 0, -200);
    textSize(12);
    text("Reactividad abstracta de prueba", 0, 200);
    pop();
  }
}
