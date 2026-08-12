class ExpectativaScreen extends Screen {
  constructor() {
    super('expectativa');
  }

  draw() {
    background(10, 11, 13);
    
    push();
    translate(width / 2, height / 2);
    noFill();
    stroke(0, 242, 254, 150);
    strokeWeight(1.5);
    
    // Líneas que convergen hacia el centro
    stroke(255, 255, 255, 30);
    for (let angle = 0; angle < TWO_PI; angle += PI / 6) {
      let x1 = cos(angle) * 150;
      let y1 = sin(angle) * 150;
      let x2 = cos(angle) * (80 + sin(frameCount * 0.02) * 20);
      let y2 = sin(angle) * (80 + sin(frameCount * 0.02) * 20);
      line(x1, y1, x2, y2);
    }
    
    // Círculo central en crecimiento progresivo
    stroke(0, 242, 254, 180);
    let r = (frameCount * 0.5) % 120;
    circle(0, 0, r);
    circle(0, 0, r * 0.5);
    
    fill(255, 255, 255, 200);
    noStroke();
    textAlign(CENTER, CENTER);
    textFont('Inter');
    textSize(18);
    text("EXPECTATIVA", 0, -200);
    textSize(12);
    text("Reactividad abstracta de prueba", 0, 200);
    pop();
  }
}
