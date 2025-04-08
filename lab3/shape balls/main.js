// Set up the canvas
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let balls = [];
let evilCircle;
let ballCountElement = document.getElementById('ballCount');

// Shape class (Parent class)
class Shape {
  constructor(x, y, velX, velY) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
  }
}

// Ball class (Child class)
class Ball extends Shape {
  constructor(x, y, velX, velY, size, color) {
    super(x, y, velX, velY);
    this.size = size;
    this.color = color;
    this.exists = true;  // track if ball is eaten by the evil circle
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }

  update() {
    if (this.exists) {
      this.x += this.velX;
      this.y += this.velY;

      if (this.x + this.size > canvas.width || this.x - this.size < 0) {
        this.velX = -this.velX;
      }

      if (this.y + this.size > canvas.height || this.y - this.size < 0) {
        this.velY = -this.velY;
      }
    }
  }

  collisionDetect() {
    for (const ball of balls) {
      if (!(this === ball) && ball.exists) {
        const dx = this.x - ball.x;
        const dy = this.y - ball.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.size + ball.size) {
          ball.color = this.color = randomRGB();
        }
      }
    }
  }
}

// EvilCircle class (Child of Shape)
class EvilCircle extends Shape {
  constructor(x, y) {
    super(x, y, 20, 20);
    this.size = 10;
    this.color = "white";
  }

  draw() {
    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 3;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.stroke();
  }

  checkBounds() {
    if (this.x + this.size > canvas.width || this.x - this.size < 0) {
      this.velX = -this.velX;
    }

    if (this.y + this.size > canvas.height || this.y - this.size < 0) {
      this.velY = -this.velY;
    }
  }

  collisionDetect() {
    for (const ball of balls) {
      if (ball.exists) {
        const dx = this.x - ball.x;
        const dy = this.y - ball.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.size + ball.size) {
          ball.exists = false;
          updateBallCount();
        }
      }
    }
  }
}

// Random RGB Color Generator
function randomRGB() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r},${g},${b})`;
}

// Update Ball Count on Screen
function updateBallCount() {
  const count = balls.filter(ball => ball.exists).length;
  ballCountElement.textContent = count;
}

// Event Listener for Moving the Evil Circle with Arrow Keys
window.addEventListener("keydown", (e) => {
  if (e.key === "a") evilCircle.x -= evilCircle.velX;
  if (e.key === "d") evilCircle.x += evilCircle.velX;
  if (e.key === "w") evilCircle.y -= evilCircle.velY;
  if (e.key === "s") evilCircle.y += evilCircle.velY;
});

// Loop function that runs every animation frame
function loop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw and update all balls
  for (const ball of balls) {
    if (ball.exists) {
      ball.draw();
      ball.update();
      ball.collisionDetect();
    }
  }

  // Draw Evil Circle and check bounds/collision
  evilCircle.draw();
  evilCircle.checkBounds();
  evilCircle.collisionDetect();

  // Request the next animation frame
  requestAnimationFrame(loop);
}

// Create random balls
function createBalls(numBalls) {
  for (let i = 0; i < numBalls; i++) {
    const size = Math.random() * 20 + 10;
    const x = Math.random() * (canvas.width - size * 2) + size;
    const y = Math.random() * (canvas.height - size * 2) + size;
    const velX = (Math.random() - 0.5) * 10;
    const velY = (Math.random() - 0.5) * 10;
    const color = randomRGB();

    balls.push(new Ball(x, y, velX, velY, size, color));
  }

  updateBallCount();
}

// Initialize Evil Circle and balls
evilCircle = new EvilCircle(canvas.width / 2, canvas.height / 2);
createBalls(20);

// Start the loop
loop();