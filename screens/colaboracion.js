class ColaboracionScreen extends Screen {
  constructor() {
    super('colaboracion');
  }

  draw() {
    background(10, 11, 13);
    
    push();
    translate(width / 2, height / 2);
    noFill();
    stroke(255, 255, 255, 100);
    strokeWeight(1.5);
    
    let nodes = 4;
    let radius = 60 + sin(frameCount * 0.02) * 10;
    
    // Dibujar nodos (círculos) y líneas que los unen
    for (let i = 0; i < nodes; i++) {
      let angle = TWO_PI / nodes * i + frameCount * 0.01;
      let x = cos(angle) * radius;
      let y = sin(angle) * radius;
      
      stroke(0, 242, 254, 180);
      circle(x, y, 20);
      
      // Dibujar línea al centro
      stroke(255, 255, 255, 40);
      line(0, 0, x, y);
    }
    stroke(255, 0, 127, 100);
    circle(0, 0, 30);
    
    fill(255, 255, 255, 200);
    noStroke();
    textAlign(CENTER, CENTER);
    textFont('Inter');
    textSize(18);
    text("COLABORACIÓN", 0, -200);
    textSize(12);
    text("Reactividad abstracta de prueba", 0, 200);
    pop();
  }
}
