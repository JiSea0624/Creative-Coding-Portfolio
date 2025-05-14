// Game variables
let sylus;
let wanderers = [];
let mana = [];
let lanes = [100, 200, 300];
let score = 0;
let gameState = "title";
let trainSpeed = 6;
let currentLane = 1;

// Images
let sylusImg, wandererImg, mcImg, grassImg;

// Preload images
function preload() {
  sylusImg = loadImage("sylus.png");
  wandererImg = loadImage("wanderer.png");
  mcImg = loadImage("mc.png");
  grassImg = loadImage("grass.png");
}

// Setup function
function setup() {
  createCanvas(400, 600);

  // Initialize Sylus
  sylus = {
    x: lanes[currentLane],
    y: height - 100,
    width: 50,
    height: 100,
  };

  // Initialize Wanderers
  initializeWanderers();

  // Initialize Mana
  initializeMana();
}

function initializeWanderers() {
  wanderers = [];
  let shuffledLanes = shuffle([...lanes]);
  for (let i = 0; i < 2; i++) {
    wanderers.push({
      x: shuffledLanes[i],
      y: random(-600, -100),
      width: 100,
      height: 100,
    });
  }
}

function initializeMana() {
  mana = [];
  for (let i = 0; i < 3; i++) {
    mana.push({
      x: random(lanes),
      y: random(-600, -100),
      size: 30,
    });
  }
}

// Main game loop
function draw() {
  background(grassImg);

  if (gameState === "title") {
    drawTitleScreen();
  } else if (gameState === "play") {
    playGame();
  } else if (gameState === "gameOver") {
    drawGameOver();
  } else if (gameState === "end") {
    drawEndScreen();
  }
}

// Title screen
function drawTitleScreen() {
  textAlign(CENTER, CENTER);
  fill(0);
  textSize(24);
  text("L.A.D.S Mayhem", width / 2, height / 3);
  textSize(16);
  text("Dodge Wanderers and collect Mana!", width / 2, height / 2);
  text("Use Left, Up, and Right keys to move.", width / 2, height / 1.8);
  text("Press ENTER to start", width / 2, height / 1.6);

  if (keyIsPressed && keyCode === ENTER) {
    startGame();
  }
}

// Start/restart game
function startGame() {
  gameState = "play";
  score = 0;
  currentLane = 1;
  trainSpeed = 6;
  sylus.x = lanes[currentLane];
  initializeWanderers();
  initializeMana();
}

// Main gameplay
function playGame() {
  for (let lane of lanes) {
    fill(0, 255, 0, 50);
    rect(lane - 50, 0, 100, height);
  }

  // Draw Sylus
  image(sylusImg, sylus.x - sylus.width / 2, sylus.y - sylus.height / 2, sylus.width, sylus.height);

  // Player controls
  if (keyIsPressed) {
    if (keyCode === LEFT_ARROW && currentLane > 0) {
      currentLane--;
    } else if (keyCode === RIGHT_ARROW && currentLane < lanes.length - 1) {
      currentLane++;
    } else if (keyCode === UP_ARROW) {
      currentLane = 1; 
    }
    sylus.x = lanes[currentLane];
  }

  // Move and draw Wanderers
  for (let wanderer of wanderers) {
    image(wandererImg, wanderer.x - wanderer.width / 2, wanderer.y, wanderer.width, wanderer.height);
    wanderer.y += trainSpeed;

    if (wanderer.y > height) {
      wanderer.x = random(lanes);
      wanderer.y = random(-600, -100);
    }

    // Collision
    if (
      sylus.x < wanderer.x + wanderer.width / 2 &&
      sylus.x + sylus.width > wanderer.x - wanderer.width / 2 &&
      sylus.y < wanderer.y + wanderer.height &&
      sylus.y + sylus.height > wanderer.y
    ) {
      gameState = "gameOver";
    }
  }

  // Move and draw Mana
  for (let m of mana) {
    fill(203, 222, 255);
    push();
    translate(m.x, m.y);
    rotate(PI / 4);
    rect(-m.size / 2, -m.size / 2, m.size, m.size);
    pop();
    m.y += trainSpeed;

    if (m.y > height) {
      m.x = random(lanes);
      m.y = random(-600, -100);
    }

    if (dist(sylus.x, sylus.y, m.x, m.y) < m.size) {
      score++;
      m.y = random(-600, -100);
    }
  }

  // Speed adjustment
  if (score % 10 === 0 && score > 0 && frameCount % 10 === 0) {
    if (score >= 10) {
      trainSpeed += 0.70;
    } 
    if (score >= 20) {
      trainSpeed += 0.90;
    } else {
      trainSpeed += 0.01;
    }
  }

  // Score display
  fill(0);
  textSize(18);
  text("Score: " + score, 40, 20);

  if (score >= 30) {
    gameState = "end";
  }
}

function drawEndScreen() {
  background(grassImg);

  // Draw Sylus
  image(sylusImg, sylus.x - sylus.width / 2, sylus.y - sylus.height / 2, sylus.width, sylus.height);

  // Draw MC
  let mc = { x: sylus.x, y: min(frameCount - 500, sylus.y - 50), width: 50, height: 100 }; // MC moves towards Sylus

  image(mcImg, mc.x - mc.width / 2, mc.y, mc.width, mc.height);

  // Display ending text when MC reaches Sylus
  if (mc.y >= sylus.y - 50) {
    fill(0);
    textSize(24);
    textAlign(CENTER, CENTER);
    text("My Dragon, My Hero", width / 2, height / 2);
    noLoop();
  }
}



function drawGameOver() {
  background(50, 180, 80); 

  textAlign(CENTER, CENTER);
  fill(0);
  textSize(24);
  text("Game Over!", width / 2, height / 2 - 30);
  textSize(16);
  text("Score: " + score, width / 2, height / 2); 
  text("Press R to restart", width / 2, height / 2 + 30);

  if (keyIsPressed && key === "r") {
    startGame(); 
  }
}