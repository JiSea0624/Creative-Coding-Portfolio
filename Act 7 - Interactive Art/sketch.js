let lines = [];

function setup() {
  createCanvas(400, 400);
  background(0);
}

function draw() {
  background(0);
  //Displacement of all lines
  lines.forEach((line) => line.display()); 
}

//Mouse/User Interaction
function mouseDragged() {
  if (lines.length > 50) lines.shift();
  lines.push(new InteractiveLine(width / 2, height / 2, mouseX, mouseY));
}

//Line Structures
class InteractiveLine {
  constructor(x1, y1, x2, y2) {
    this.x1 = x1; this.y1 = y1; 
    this.x2 = x2 + random(-1, 1); this.y2 = y2 + random(-1, 1);
    this.color = color(random(100, 255), random(50, 100), random(150, 200), 150);
    this.weight = random(1, 5);
  }

  //Fix the display outputs
  display() {
    stroke(this.color);
    strokeWeight(this.weight);
    line(this.x1, this.y1, this.x2, this.y2);
  }
}