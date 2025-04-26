//Input Variable
var word="Hello World";
var font1;
//Load the font file
function preload()
{
  font1 = loadFont("Hansel Script.ttf")
}

function setup() {
  createCanvas(400, 400);
  background(0);
  fill(255);
  textFont(font1, 50);
  textAlign(CENTER);
  text(word, 200, 200);
}