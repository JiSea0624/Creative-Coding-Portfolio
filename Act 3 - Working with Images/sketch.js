let img;
let maskGraphics;

function preload() {
  img = loadImage('https://media.istockphoto.com/id/610041376/photo/beautiful-sunrise-over-the-sea.jpg?s=612x612&w=0&k=20&c=R3Tcc6HKc1ixPrBc7qXvXFCicm8jLMMlT99MfmchLNA=');
}

function setup() {
  createCanvas(550, 550);
  background(220);
  noStroke();

  // Create a mask using createGraphics
  maskGraphics = createGraphics(550, 550);
  maskGraphics.background(0); // Black as the transparent area
  maskGraphics.fill(255); // White as the visible area
  maskGraphics.ellipse(275, 275, 400, 400); // Create a circular mask

  // Apply the mask to the image
  img.mask(maskGraphics);

  // Draw the masked image
  image(img, 0, 0, width, height);

  // Add text inside the masked shape
  fill(255, 255, 255);
  rect(180, 245, 200, 50, 5);
  fill(0, 0, 0);
  textSize(30);
  textAlign(CENTER, CENTER);
  text("Sunrise", width / 2, height / 2);
}

function draw() {
  // Watercolor effect
  let x = random(width);
  let y = random(height);
  let c = img.get(x, y);
  fill(c[0], c[1], c[2], 50);
  ellipse(x, y, 30, 30);
}
