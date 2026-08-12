class MemoriaScreen extends Screen {
  constructor() {
    super('memoria');
  }

  draw() {
    background(10, 11, 13); // Fondo base
    
    // Dibujo de un placeholder geométrico abstracto interactivo para probar la pantalla
    push();
    translate(width / 2, height / 2);
    noFill();
    stroke(0, 242, 254, 150); // Color acento cian
    strokeWeight(1.5);
    
    // Un círculo que late basado en frameCount
    let d = 100 + sin(frameCount * 0.05) * 20;
    circle(0, 0, d);
    
    // Líneas cruzadas
    stroke(255, 255, 255, 50);
    line(-150, 0, 150, 0);
    line(0, -150, 0, 150);
    
    // Texto temporal de desarrollo (se eliminará al desarrollar la lógica real)
    fill(255, 255, 255, 200);
    noStroke();
    textAlign(CENTER, CENTER);
    textFont('Inter');
    textSize(18);
    text("MEMORIA", 0, -200);
    textSize(12);
    text("Reactividad abstracta de prueba", 0, 200);
    pop();
  }
}
