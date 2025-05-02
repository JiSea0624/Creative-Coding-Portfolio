// Trail of the Shapes
let trail = []; 
let maxTrailLength = 15; 

function setup() {
  createCanvas(400, 400); 
}

function draw() {
  background(0, 0, 0); 
  
  // Mouse position and a Shapes in the trail
  trail.push({
    x: mouseX, y: mouseY, shape: random(['circle', 'square', 'triangle'])
  });
  
  // Elements of the trail
  for (let i = 0; i < trail.length; i++) {
    noStroke(); 
    let alpha = map(i, 0, trail.length, 255, 50); 
    let size = map(i, 0, trail.length, 5, 20); 
    fill(180, 208, 224, alpha); 
    
    // Shape styles in the trail
    let shape = trail[i].shape;
    if (shape === 'circle') {
      ellipse(trail[i].x, trail[i].y, size);
    } else if (shape === 'square') {
      rectMode(CENTER); 
      rect(trail[i].x, trail[i].y, size, size); 
    } else if (shape === 'triangle') {
      triangle(
        trail[i].x, trail[i].y - size / 2, 
        trail[i].x - size / 2, trail[i].y + size / 2, 
        trail[i].x + size / 2, trail[i].y + size / 2  
      ); 
    }
  }

  // Limit the trail's length to avoid memory overflow
  if (trail.length > maxTrailLength) {
    trail.shift(); 
  }
}
