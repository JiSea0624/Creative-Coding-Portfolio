let table;
function preload() {
  table = loadTable('Jan 11 to 24 Steps.csv', 'csv', 'header');
}

function setup() {
  createCanvas(1200, 400);
  background(255);

  let barWidth = 40;
  let spacing = 40; 

  for (let i = 0; i < table.getRowCount(); i++) {
    let dates = table.getString(i, 'Dates');
    let stepsRaw = table.getString(i, 'Steps');
    let steps = int(stepsRaw.replace(/,/g, ''));

    let x = 50 + i * (barWidth + spacing); 
    let h = map(steps, 0, 12000, 0, height - 100); 
    let y = height - h - 50; 

    // Draw gradient bar
    for (let j = 0; j < h; j++) {
      let inter = map(j, 0, h, 0, 1);
      let col = lerpColor(color(255, 102, 102), color(102, 204, 255), inter);
      stroke(col);
      line(x, y + j, x + barWidth, y + j);
    }

    // Display the date
    fill(0);
    noStroke();
    textAlign(CENTER);
    textSize(12);
    text(dates, x + barWidth / 2, height - 30);

    // Display the steps
    fill(0);
    textAlign(CENTER);
    text("(" + steps + " Steps)", x + barWidth / 2, y - 10);
    
    // Add the title at the top
    fill(0);
    textAlign(CENTER);
    textSize(25);
    text("January 11 to 24 Steps on the Year 2025", width / 2, 30);
  }
}
