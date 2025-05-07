function setup() {
  createCanvas(400, 400);
  background(255); // White background
  drawAlien();
}

function drawAlien() {
  let centerX = width / 2;
  let centerY = height / 2 + 50;

  // BODY (oval head)
  fill(90);
  noStroke();
  ellipse(centerX, centerY, 250, 150);

  // BODY SPOTS (aligned and balanced)
  fill(60);
  ellipse(centerX - 60, centerY - 15, 18, 14);
  ellipse(centerX + 70, centerY - 15, 18, 14);

  // MOUTH (arc shape)
  fill(210);
  noStroke();
  arc(centerX, centerY + 10, 180, 90, 0, PI, CHORD);

  // TEETH
  fill(255);
  noStroke();
  triangle(centerX - 60, centerY + 5, centerX - 55, centerY + 20, centerX - 50, centerY + 5);
  triangle(centerX, centerY + 5, centerX, centerY + 25, centerX + 5, centerY + 5);
  triangle(centerX + 50, centerY + 5, centerX + 55, centerY + 25, centerX + 60, centerY + 5);

  // EYE STALKS
  let stalkX = [-90, -60, -30, 0, 30, 60, 90];
  let stalkHeights = [150, 120, 135, 200, 170, 125, 155];

  for (let i = 0; i < stalkX.length; i++) {
    let x = centerX + stalkX[i];
    let stalkTopY = centerY - stalkHeights[i];

    // Stalk
    stroke(90);
    strokeWeight(5);
    line(x, centerY - 52, x, stalkTopY);

    // Eye (with slight color variation)
    noStroke();
    fill(180 + i * 10, 240 - i * 15, 255);
    ellipse(x, stalkTopY, 30, 30);

    // Glow around eye
    stroke(180 + i * 10, 240 - i * 15, 255, 100);
    strokeWeight(4);
    noFill();
    ellipse(x, stalkTopY, 40, 40);

    // Pupil
    noStroke();
    fill(0);
    ellipse(x, stalkTopY, 6, 6);
  }

  // LEGS
  fill(90);
  rect(centerX - 30, centerY + 65, 20, 40);
  rect(centerX + 10, centerY + 65, 20, 40);

  // FEET
  fill(60);
  ellipse(centerX - 20, centerY + 105, 30, 10);
  ellipse(centerX + 20, centerY + 105, 30, 10);
}
