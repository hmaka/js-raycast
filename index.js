const SCREEN_WIDTH = 1024;
const SCREEN_HEIGHT = 768;

const canvas = document.createElement("canvas")
canvas.setAttribute("width", SCREEN_WIDTH)
canvas.setAttribute("height", SCREEN_HEIGHT)
document.body.appendChild(canvas)

const context = canvas.getContext("2d")
const TICK = 30;

const CELL_SIZE = 64;
const PLAYER_SIZE = 10;

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
      if (map[j][i] == 1) {
        context.fillStyle = "grey";
        context.fillRect(posX + i * cellSize, posY + j * cellSize, cellSize, cellSize);
      }
    }
  }

  context.fillStyle = "red";
  context.fillRect(
    posX + player.x * scale - PLAYER_SIZE,
    posY + player.y * scale - PLAYER_SIZE * 2,
    PLAYER_SIZE,
    PLAYER_SIZE
  )
}

function gameLoop() {
  clearScreen()
  movePlayer()
  const rays = getRays()
  renderScene(rays)
  renderMiniMap(0, 0, 0.50, rays)
}

setInterval(gameLoop, TICK)



document.addEventListener("keydown", (e) => {
  if (e.key === "w") {
    player.speed = 2
  }
})

document.addEventListener("keyup", (e) => {
  if (e.key === "s") {
    player.speed = -2
  }
})



