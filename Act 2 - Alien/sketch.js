function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  
  //Body of the Alien
  fill(80, 122, 255); 
  rect(100, 100, 200, 200, 5);
  
  //Appearance of the Alien
  //Antenna
  fill(33, 10, 183);
  ellipse(150, 60, 20, 20); //left
  rect(148, 70, 5, 30); //left
  ellipse(250, 60, 20, 20); //right
  rect(248, 70, 5, 30); //right
  //Hair
  fill(33, 10, 183);
  triangle(100, 100, 125, 130, 145, 100);
  triangle(145, 100, 175, 130, 200, 100);
  triangle(200, 100, 225, 130, 255, 100);
  triangle(255, 100, 278, 130, 300, 100);
  //Marks
  triangle(100, 250, 100, 260, 140, 255); //left
  triangle(100, 265, 100, 275, 140, 270); //left
  triangle(300, 250, 260, 255, 300, 260); //right
  triangle(300, 265, 260, 270, 300, 275); //right
  
  //Left Eye of the Alien
  fill(255, 255, 255);
  ellipse(145, 190, 100, 100); //outer eye
  fill(125, 220, 254);
  ellipse(145, 190, 65, 65); //inner eye
  fill(0, 0, 0);
  ellipse(145, 190, 45, 45); //pupil
  fill(255, 255, 255);
  ellipse(170, 175, 20, 20); //shimmer

  //Right Eye of the Alien
  fill(255, 255, 255);
  ellipse(255, 190, 100, 100); //outer eye
  fill(145, 220, 254);
  ellipse(255, 190, 65, 65); //inner eye
  fill(0, 0, 0);
  ellipse(255, 190, 45, 45); //pupil
  fill(255, 255, 255);
  ellipse(280, 175, 20, 20); //shimmer
  
  //Mouth of the Alien
  curve(100, 200, 170, 250, 230, 250, 300, 200);
}