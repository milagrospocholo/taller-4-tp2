class IdentidadScreen extends Screen {
  constructor() {
    super('identidad');
  }

  draw() {
    background(10, 11, 13);
    
    push();
    translate(width / 2, height / 2);
    noFill();
    stroke(0, 242, 254, 180);
    strokeWeight(1.5);
    
    let r1 = 80 + sin(frameCount * 0.04) * 10;
    let r2 = 120 + cos(frameCount * 0.04) * 10;
    circle(0, 0, r1);
    circle(0, 0, r2);
    
    stroke(255, 255, 255, 60);
    rectMode(CENTER);
    rect(0, 0, 40, 40);
    
    fill(255, 255, 255, 200);
    noStroke();
    textAlign(CENTER, CENTER);
    textFont('Inter');
    textSize(18);
    text("IDENTIDAD", 0, -200);
    textSize(12);
    text("Reactividad abstracta de prueba", 0, 200);
    pop();
  }
}
