const SCREEN_WIDTH = 900;
const SCREEN_HEIGHT = 675;

const canvas = document.createElement("canvas")
canvas.setAttribute("width", SCREEN_WIDTH)
canvas.setAttribute("height", SCREEN_HEIGHT)
document.body.appendChild(canvas)

const context = canvas.getContext("2d")
const TICK = 30;

const CELL_SIZE = 64;
const PLAYER_SIZE = 10;
const FOV = toRadians(60);

const COLORS = {
  rays: "#ffa600"
}

const map = [
  [1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 0, 1],
  [1, 0, 0, 1, 0, 0, 1],
  [1, 0, 1, 1, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1]

];

const player = {
  x: CELL_SIZE * 1.5,
  y: CELL_SIZE * 2,
  angle: 0,
  speed: 0,
}

function clearScreen() {
  context.fillStyle = "purple";
  context.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
}

function movePlayer() {
  player.x += Math.cos(player.angle) * player.speed;
  player.y += Math.sin(player.angle) * player.speed;

}

function outOfMapBounds(x, y) {
  return x < 0 || x >= map[0].length || y < 0 || y >= map.length;
}
function distance(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

function getRays() {
  return []
}

function renderScene(rays) {

}

function renderMiniMap(posX = 0, posY = 0, scale = 1, rays) {
  const cellSize = scale * CELL_SIZE;

  for (let i = 0; i < map.length; ++i) {
    for (let j = 0; j < map[i].length; ++j) {
      if (map[i][j] == 1) {
        context.fillStyle = "grey";
        context.fillRect(posX + j * cellSize, posY + i * cellSize, cellSize, cellSize);
      }
    }
  }

  context.fillStyle = "red";
  context.fillRect(
    posX + player.x * scale - PLAYER_SIZE / 2,
    posY + player.y * scale - PLAYER_SIZE / 2,
    PLAYER_SIZE,
    PLAYER_SIZE
  )
  const rayLength = PLAYER_SIZE * 2;
  context.strokeStyle = "red"
  context.beginPath()
  context.moveTo(player.x * scale + posX, player.y * scale + posY)
  context.lineTo(
    (player.x + Math.cos(player.angle) * rayLength) * scale,
    (player.y + Math.sin(player.angle) * rayLength) * scale,
  )
  context.closePath()
  context.stroke()

  context.strokeStyle = COLORS.rays;

}

function gameLoop() {
  clearScreen()
  movePlayer()
  const rays = getRays()
  renderScene(rays)
  renderMiniMap(0, 0, 0.50, rays)
}

setInterval(gameLoop, TICK)

function toRadians(degrees) {
  return (degrees * Math.PI) / 180;
}

document.addEventListener("keydown", (e) => {
  if (e.key === "w") {
    player.speed = 2
  }
})

document.addEventListener("keydown", (e) => {
  if (e.key === "s") {
    player.speed = -2
  }
})

document.addEventListener("keyup", (e) => {
  if (e.key === "s" || e.key === "w") {
    player.speed = 0
  }
})

document.addEventListener("mousemove", (e) => {
  player.angle += toRadians(e.movementX)
})


