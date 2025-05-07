let cells = 5;
let cellSize;

function setup() {
  createCanvas(600, 600);
  cellSize = width / cells;
  noFill();
  background(30);
  strokeWeight(0.5);

  for (let y = 0; y < cells; y++) {
    for (let x = 0; x < cells; x++) {
      push();
      translate(x * cellSize, y * cellSize);

      // Determine rotation and color pattern
      let idx = x + y * cells;
      if ((x + y) % 2 == 0) {
        drawSpiral(0, 0, cellSize, false, idx);
      } else {
        drawSpiral(0, 0, cellSize, true, idx);
      }

      pop();
    }
  }
}

function drawSpiral(x, y, s, flip, index) {
  let steps = 100;
  for (let i = 0; i < steps; i++) {
    let t = i / steps;
    let c = lerpColor(color(0, 100, 255), color(30), t);
    stroke(c);

    // First direction
    let x1 = lerp(x, x + s, t);
    let y1 = lerp(y, y + s, 0);
    let x2 = lerp(x, x + s, 0);
    let y2 = lerp(y, y + s, t);

    if (flip) {
      line(x + s - x1, y + s - y1, x + s - x2, y + s - y2);
    } else {
      line(x1, y1, x2, y2);
    }

    // Opposite direction
    let x3 = lerp(x, x + s, t);
    let y3 = lerp(y + s, y, 0);
    let x4 = lerp(x + s, x, 0);
    let y4 = lerp(y, y + s, t);

    if (flip) {
      line(x + s - x3, y + s - y3, x + s - x4, y + s - y4);
    } else {
      line(x3, y3, x4, y4);
    }
  }
}
