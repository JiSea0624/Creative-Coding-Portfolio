//Trail of the Ellipse
let trail = []; 
let maxTrailLength = 10;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(0, 0, 0);
  
  //Trail's Mouse Position
  trail.push([mouseX, mouseY]);
  
  //Loop of the trail
  for (let i = 0; i < trail.length; i++) {
    noStroke();
    fill(180, 208, 224, map(i, 0, trail.length, 50, 255));
    ellipse(trail[i][0], trail[i][1], 8);
  }

  // Limitation of the trail's length
  if (trail.length > maxTrailLength) {
    trail.shift();
  }

  console.log(trail.length);
}
