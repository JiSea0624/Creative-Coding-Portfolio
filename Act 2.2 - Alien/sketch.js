function setup() {
  createCanvas(400, 400);
  background(5);
  noLoop();
  drawCreepyAlien();
}

function drawCreepyAlien() {
  let centerX = width / 2;
  let centerY = height / 2;

  // Alien Head - pale sickly green with shadows
  fill(30, 50, 30);
  noStroke();
  ellipse(centerX, centerY, 180, 250);

  // Eyes - glowing green
  fill(0, 255, 100, 200);
  ellipse(centerX - 40, centerY - 30, 45, 85);
  ellipse(centerX + 40, centerY - 30, 45, 85);

  // Eye glow
  noFill();
  stroke(0, 255, 100, 100);
  strokeWeight(12);
  ellipse(centerX - 40, centerY - 30, 65, 105);
  ellipse(centerX + 40, centerY - 30, 65, 105);

  // Pupils - vertical, glowing core
  noStroke();
  fill(10, 250, 50);
  ellipse(centerX - 40, centerY - 30, 8, 25);
  ellipse(centerX + 40, centerY - 30, 8, 25);

  // Mouth - jagged, stitched
  stroke(150, 20, 20);
  strokeWeight(2);
  line(centerX - 20, centerY + 70, centerX + 20, centerY + 70);
  for (let i = -20; i <= 20; i += 10) {
    line(centerX + i, centerY + 66, centerX + i, centerY + 74);
  }
}
