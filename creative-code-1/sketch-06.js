const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');
const math = require('canvas-sketch-util/math');

const settings = {
  dimensions: [ 2048, 2048 ]
};

const PARAMS = {
cols: 12,
rows: 12,
freq: 0.001,
amp: 2,
scaleMin: 20,
scaleMax: 54,
bg: '#f8f3de',
palette: [
'#311e35',
'#709fb0',
'#706992',
'#a0c0b9',
'#f2e8bf'
]
}
const getRandomColor = () => {
return PARAMS.palette[Math.floor(Math.random()*PARAMS.palette.length)];
}

const sketch = () => {
return ({ context, width, height, frame }) => {
context.fillStyle = PARAMS.bg
context.fillRect(0, 0, width, height)

const gridWidth = width * 0.8
const gridHeight = height * 0.8
const cols = PARAMS.cols
const rows = PARAMS.rows
const numCells = cols * rows
const cellWidth = gridWidth / cols
const cellHeight = gridHeight / rows

// Center the drawing
context.translate((width - gridWidth) / 2, (height - gridHeight) / 2)

for (let i = 0; i < numCells; i++) {

const col = i % cols
const row = Math.floor(i / cols)
const posX = col * cellWidth
const posY = row * cellHeight

const n = random.noise3D(posX, posY, 10, PARAMS.freq, PARAMS.amp)
const w = random.range(PARAMS.scaleMin, PARAMS.scaleMax)
const h = math.mapRange(n, -1, 1, PARAMS.scaleMin, PARAMS.scaleMax)

if (h < PARAMS.scaleMin) continue

context.save()
context.translate(posX, posY)
context.translate(cellWidth * 0.5 - w * 0.5, cellHeight * 0.5)
context.fillStyle = getRandomColor()

// Cylinder
context.beginPath()
context.translate(0, -h)
context.fillRect(0, 0, w, h)

// Bottom ellipse
context.beginPath()
context.translate(0, h)
context.ellipse(w * 0.5 , 0, w / 2, w / 4, Math.PI, Math.PI * 2, false)
context.closePath()
context.fill()

// Top ellipse
context.fillStyle = getRandomColor()
context.translate(0, -h)
context.beginPath()
context.ellipse(w * 0.5, 0, w / 2, w / 4, 0, Math.PI * 2, false)
context.closePath()
context.fill()

context.restore()
}
}
}

canvasSketch(sketch, settings);
