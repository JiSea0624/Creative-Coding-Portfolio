let sound, fft;

function preload() {
  sound = loadSound('Luminary (Slowed Down).mp3'); //Sound file
}

function setup() {
  createCanvas(600, 400);
  sound.loop(); // Auto-play
  fft = new p5.FFT(); //For FFT object
}

function draw() {
  background(0);

  let spectrum = fft.analyze(); //Frequency spectrum
  let numBars = 60, gap = 2;
  let barWidth = (width - gap) / numBars;

  for (let i = 0; i < numBars; i++) {
    let x = i * (barWidth + gap);
    let barHeight = map(spectrum[floor(map(i, 0, numBars, 0, spectrum.length))], 0, 255, 0, height); //Energy value to the Height of the Bar
    
    //Rectangle Bar
    fill(200, 50, 50);
    noStroke();
    rect(x, height - barHeight, barWidth, barHeight);
  }
}