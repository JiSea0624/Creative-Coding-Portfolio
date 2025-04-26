function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(217, 210, 208); //background color
  
  //road(optional)
  fill(63, 63, 64); //road color
  rect(0, 210, 400, 80); //road 
  fill(226, 237, 6); //color of the line
  rect(0, 250, 90, 10); //yellow line
  rect(110, 250, 110, 10); //yellow line
  rect(238, 250, 110, 10); //yellow line
  rect(370, 250, 30, 10); //yellow line
  
  fill(255, 0, 0); //color of the car
  rect(100, 180, 200, 60); //car size
  
  fill(0, 0, 0); //color of the tires
  ellipse(150, 240, 45, 45); //outer left tire
  ellipse(250, 240, 45, 45); //outer right tire
  
  fill(255, 255, 255); //color of the tires
  ellipse(150, 240, 40, 40); //inner left tire
  ellipse(250, 240, 40, 40); //inner right tire
  
  //lines inside the left tire
  line(130, 240, 170, 240); //horizontal line
  line(150, 260, 150, 220); //vertical line
  line(135, 255, 165, 225); //right slant line
  line(165, 254, 134, 225); //left slant line
  
  //lines inside the right tire
  line(230, 240, 272, 240); //horizontal line
  line(250, 260, 250, 220); //vertical line
  line(265, 255, 235, 225); //right slant line
  line(237, 254, 264, 225); //left slant line
  
  fill(255, 237, 87); //color of the light
  ellipse(300, 215, 10, 25); //light
  
  line(200, 180, 200, 240); //door line
  
  fill(127, 0, 0); //color of the door handle
  ellipse(215, 190, 10, 5); //right door handle
  ellipse(130, 190, 10, 5); //left door handle
  
  //car cover
  line(110, 180, 140, 135); //left line
  line(260, 180, 232, 135); //right line
  line(140, 135, 232, 135); //top line
}