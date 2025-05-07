let cols = 6;
let rows = 6;
let cellSize = 80;

function setup() {
  createCanvas(cols * cellSize, rows * cellSize);
  noLoop();
}

function draw() {
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      let px = x * cellSize;
      let py = y * cellSize;

      // Alternating background colors
      if ((x + y) % 2 == 0) {
        fill('#F8BFD8'); // light pink
      } else {
        fill('#E91E63'); // deep pink
      }
      noStroke();
      rect(px, py, cellSize, cellSize);

      // Diamond fill color
      if ((x + y) % 2 == 0) {
        fill('#E91E63'); // deep pink
      } else {
        fill('#F8BFD8'); // light pink
      }

      stroke(0); // black outline
      strokeWeight(2);
      drawNestedDiamonds(px + cellSize / 2, py + cellSize / 2, cellSize * 0.35, 6);
    }
  }
}

// Draw nested diamonds at a location
function drawNestedDiamonds(x, y, maxSize, count) {
  for (let i = 0; i < count; i++) {
    let s = maxSize * (1 - i * 0.15); // size decreases each step
    noFill();
    beginShape();
    vertex(x, y - s);
    vertex(x + s, y);
    vertex(x, y + s);
    vertex(x - s, y);
    endShape(CLOSE);
  }
}
