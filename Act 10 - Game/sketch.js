// Space Defender Game
let gameState = "title"; // Game states: "title", "mechanics", "playing", "gameOver", "win"
let player, asteroids;
let resourceMeter = 100; // Health bar (remaining health points)
let hits = 0; // Tracks how many times the player is hit
let timer = 180; // 3 minutes (180 seconds)

function setup() {
  createCanvas(800, 600);
  player = new Player();
  resetGame();
}

function draw() {
  background(20);

  if (gameState === "title") {
    drawTitleScreen();
  } else if (gameState === "mechanics") {
    drawMechanicsScreen();
  } else if (gameState === "playing") {
    playGame();
  } else if (gameState === "gameOver") {
    drawGameOverScreen();
  } else if (gameState === "win") {
    drawWinScreen();
  }
}

function drawTitleScreen() {
  textAlign(CENTER, CENTER);
  fill(255);
  textSize(48);
  text("Space Defender", width / 2, height / 2 - 50);
  textSize(24);
  text("Press ENTER to Start", width / 2, height / 2 + 20);
}

function drawMechanicsScreen() {
  textAlign(CENTER, CENTER);
  fill(255);
  textSize(24);
  text("Game Mechanics", width / 2, height / 2 - 150);
  textSize(18);
  text("- Use the mouse to move your ship.", width / 2, height / 2 - 100);
  text("- Avoid the red circles.", width / 2, height / 2 - 80);
  text("- You win if you avoid getting hit 5 times before time runs out.", width / 2, height / 2 - 60);
  text("- You lose if hit more than 5 times.", width / 2, height / 2 - 40);
  text("Press ENTER to Start", width / 2, height / 2 + 60);
}

function playGame() {
  player.update();
  player.display();

  // Update and display asteroids
  for (let i = asteroids.length - 1; i >= 0; i--) {
    asteroids[i].update();
    asteroids[i].display();

    // Check for collision with the player
    if (asteroids[i].collidesWith(player)) {
      triggerHit();
      asteroids.splice(i, 1);
    } else if (asteroids[i].y > height) {
      asteroids.splice(i, 1);
    }
  }

  // Spawn more asteroids
  if (frameCount % 20 === 0) {
    for (let i = 0; i < 4; i++) {
      asteroids.push(new Asteroid());
    }
  }

  drawResourceMeter();
  drawTimer();

  // Timer logic
  if (frameCount % 60 === 0 && timer > 0) {
    timer--;
  }

  if (timer <= 0) {
    if (hits <= 5) {
      gameState = "win";
    } else {
      gameState = "gameOver";
    }
  }

  // Check lose condition
  if (hits > 5) {
    gameState = "gameOver";
  }
}

function drawGameOverScreen() {
  textAlign(CENTER, CENTER);
  fill(255, 0, 0);
  textSize(48);
  text("Game Over", width / 2, height / 2 - 50);
  textSize(24);
  text("Press ENTER to Restart", width / 2, height / 2 + 20);
}

function drawWinScreen() {
  textAlign(CENTER, CENTER);
  fill(0, 255, 0);
  textSize(48);
  text("You Win!", width / 2, height / 2 - 50);
  textSize(24);
  text("Press ENTER to Restart", width / 2, height / 2 + 20);
}

function drawResourceMeter() {
  fill(255);
  rect(20, 20, 200, 20);
  fill(0, 255, 0);
  rect(20, 20, (5 - hits) * 40, 20);
  fill(255);
  textSize(18);
  textAlign(LEFT, CENTER);
  text(`Hits: ${hits}/5`, 230, 30);
}

function drawTimer() {
  fill(255);
  textSize(18);
  textAlign(LEFT, CENTER);
  text(`Time: ${nf(floor(timer / 60), 2)}:${nf(timer % 60, 2)}`, 20, 50);
}

function triggerHit() {
  hits++;
}

function resetGame() {
  asteroids = [];
  hits = 0;
  timer = 180;
  player.reset();
}

function keyPressed() {
  if (keyCode === ENTER) {
    if (gameState === "title") {
      gameState = "mechanics";
    } else if (gameState === "mechanics") {
      gameState = "playing";
      resetGame();
    } else if (gameState === "gameOver" || gameState === "win") {
      gameState = "title";
      resetGame();
    }
  }
}

class Player {
  constructor() {
    this.x = width / 2;
    this.y = height - 40;
    this.size = 50;
  }

  update() {
    this.x = constrain(mouseX, this.size / 2, width - this.size / 2);
  }

  display() {
    fill(0, 150, 255);
    rectMode(CENTER);
    rect(this.x, this.y, this.size, this.size);
  }

  reset() {
    this.x = width / 2;
  }
}

class Asteroid {
  constructor() {
    this.x = random(width);
    this.y = -20;
    this.size = random(30, 50);
    this.speed = random(6, 12); // Increased speed
  }

  update() {
    this.y += this.speed;
  }

  display() {
    fill(255, 0, 0);
    ellipse(this.x, this.y, this.size);
  }

  collidesWith(other) {
    return dist(this.x, this.y, other.x, other.y) < (this.size + other.size) / 2;
  }
}