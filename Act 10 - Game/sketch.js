// Game variables
let player;
let trains = [];
let coins = [];
let lanes = [100, 200, 300]; 
let score = 0;
let gameState = "title";
let trainSpeed = 6;
let currentLane = 1; 

// Setup function
function setup() {
  createCanvas(400, 600); 

  // Initialize the player
  player = {
    x: lanes[currentLane],
    y: height - 100,
    width: 30,
    height: 30,
    color: color(0, 150, 255),
  };

  // Initialize trains (only 2)
  trains = [];
  let shuffledLanes = shuffle([...lanes]);
  for (let i = 0; i < 2; i++) {
    trains.push({
      x: shuffledLanes[i],
      y: random(-600, -100),
      width: 100,
      height: 100,
      color: color(200, 0, 0),
    });
  }

  // Initialize coins
  coins = [];
  for (let i = 0; i < 3; i++) {
    coins.push({
      x: random(lanes),
      y: random(-600, -100),
      radius: 15,
      color: color(255, 215, 0),
    });
  }
}

// Main game loop
function draw() {
  background(50, 180, 80); // Green grass

  if (gameState === "title") {
    drawTitleScreen();
  } else if (gameState === "play") {
    playGame();
  } else if (gameState === "gameOver") {
    drawGameOver();
  }
}

// Title screen
function drawTitleScreen() {
  textAlign(CENTER, CENTER);
  fill(0);
  textSize(24);
  text("Metro Mayhem", width / 2, height / 3);
  textSize(16);
  text("Dodge trains and collect coins!", width / 2, height / 2);
  text("Press ENTER to start", width / 2, height / 1.8);

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
  player.x = lanes[currentLane];

  // Reset trains
  trains = [];
  let shuffledLanes = shuffle([...lanes]);
  for (let i = 0; i < 2; i++) {
    trains.push({
      x: shuffledLanes[i],
      y: random(-600, -100),
      width: 100,
      height: 100,
      color: color(200, 0, 0),
    });
  }

  // Reset coins
  for (let coin of coins) {
    coin.y = random(-600, -100);
    let occupiedLanes = trains.map(train => train.x);
    let availableLanes = lanes.filter(lane => !occupiedLanes.includes(lane));
    coin.x = random(availableLanes);
  }
}

// Main gameplay
function playGame() {
  // Draw lanes
  fill(0, 255, 0, 50);
  for (let lane of lanes) {
    rect(lane - 50, 0, 100, height);
  }

  // Draw player
  fill(player.color);
  rect(player.x - player.width / 2, player.y - player.height / 2, player.width, player.height);

  // Player controls
  if (keyIsPressed) {
    if (keyCode === LEFT_ARROW && currentLane > 0) {
      currentLane--;
    } else if (keyCode === RIGHT_ARROW && currentLane < lanes.length - 1) {
      currentLane++;
    } else if (keyCode === UP_ARROW) {
      currentLane = 1;
    }
    player.x = lanes[currentLane];
  }

  // Move and draw trains
  for (let train of trains) {
    fill(train.color);
    rect(train.x - train.width / 2, train.y, train.width, train.height);
    train.y += trainSpeed;

    // Respawn train ensuring a free lane remains
    if (train.y > height) {
      let otherTrains = trains.filter(t => t !== train && t.y > 0 && t.y < height);
      let occupiedLanes = otherTrains.map(t => t.x);
      let availableLanes = lanes.filter(lane => !occupiedLanes.includes(lane));
      if (availableLanes.length > 0) {
        train.x = random(availableLanes);
        train.y = random(-600, -100);
      } else {
        train.y = height - 1; 
      }
    }

    // Collision with player
    if (
      player.x < train.x + train.width / 2 &&
      player.x + player.width > train.x - train.width / 2 &&
      player.y < train.y + train.height &&
      player.y + player.height > train.y
    ) {
      gameState = "gameOver";
    }
  }

  // Move and draw coins
  for (let coin of coins) {
    fill(coin.color);
    ellipse(coin.x, coin.y, coin.radius * 2);
    coin.y += trainSpeed;

    // Respawn coin
    if (coin.y > height) {
      coin.y = random(-600, -100);
      let occupiedLanes = trains.map(train => train.x);
      let availableLanes = lanes.filter(lane => !occupiedLanes.includes(lane));
      coin.x = random(availableLanes);
    }

    // Coin collection
    let distToPlayer = dist(player.x, player.y, coin.x, coin.y);
    if (distToPlayer < player.width / 2 + coin.radius) {
      score++;
      coin.y = random(-600, -100);
      let occupiedLanes = trains.map(train => train.x);
      let availableLanes = lanes.filter(lane => !occupiedLanes.includes(lane));
      coin.x = random(availableLanes);
    }
  }

  // Display score
  fill(0);
  textSize(18);
  text("Score: " + score, 40, 20);

  // Train speed increases based on score
  if (score % 10 === 0 && score > 0 && frameCount % 10 === 0) {
    if (score >= 20) {
      trainSpeed += 0.90;
    } 
    if (score >= 40) {
      trainSpeed += 1;
    } else {
      trainSpeed += 0.01;
    }
  }
}

// Game Over screen
function drawGameOver() {
  textAlign(CENTER, CENTER);
  fill(0);
  textSize(24);
  text("Game Over!", width / 2, height / 2);
  textSize(16);
  text("Score: " + score, width / 2, height / 1.8);
  text("Press R to restart", width / 2, height / 1.6);

  if (keyIsPressed && key === "r") {
    startGame();
  }
}