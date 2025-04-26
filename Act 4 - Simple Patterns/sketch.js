function setup() {
  createCanvas(400, 400);
  noLoop();
}

function draw() {
  background(225);

  //Loop for rows
  for (let y = 50; y <= height; y += 95) {
    //Loop for columns
    for (let x = 50; x <= width; x += 100) {
      //Red Hues
      let r = random(150, 255); 
      let g = random(20, 80); 
      let b = random(20, 80); 

      //Circles in decreasing sizes
      for (let size = 80; size > 0; size -= 10) {
        fill(r, g, b, 200);
        ellipse(x, y, size, size);
      }
    }
  }
}
