let canvas = document.querySelector("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let c = canvas.getContext("2d");

let mouse = {
  x: undefined,
  y: undefined,
};

const maxRadius = 40;

window.addEventListener("mousemove", function (event) {
  mouse.x = event.x;
  mouse.y = event.y;
});

window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  init();
});

// able to convert function makeSnow into class
function makeSnow(x, y, dx, dy, radius, opacity) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.minRadius = radius;
  this.opacity = opacity;

  this.draw = function () {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
    c.fill();
  };

  this.update = function () {
    if (
      this.x - this.radius > innerWidth ||
      this.x + this.radius < 0 ||
      this.y - this.radius > innerHeight
    ) {
      this.x = Math.random() * (innerWidth - radius * 2) + radius;
      this.y = 0;
      this.dx = Math.random() * 1 - 0.5;
      this.dy = Math.random() * 1 + 1;
    }

    this.x += this.dx;
    this.y += this.dy;

    // snow grows depending on the position of the mouse
    if (
      mouse.x - this.x < 50 &&
      mouse.x - this.x > -50 &&
      mouse.y - this.y < 50 &&
      mouse.y - this.y > -50
    ) {
      if (this.radius < maxRadius) {
        this.radius += 1;
      }
    } else if (this.radius > this.minRadius) {
      // shrink to minRadius
      this.radius -= 1;
    }

    this.draw();
  };
}

let circleArray = [];

function init() {
  circleArray = [];

  for (let i = 0; i < 300; i++) {
    let radius = Math.random() * 5 + 1;
    let x = Math.random() * (innerWidth - radius * 2) + radius;
    let y = Math.random() * (innerHeight - radius * 2) + radius;
    let dx = Math.random() * 1 - 0.5;
    let dy = Math.random() * 1 + 1;
    let opacity = Math.random();
    circleArray.push(new makeSnow(x, y, dx, dy, radius, opacity));
  }
}

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight);

  for (let i = 0; i < circleArray.length; i++) {
    circleArray[i].update();
  }
}

init();
animate();

// will be nica to make a button to control number of snow
