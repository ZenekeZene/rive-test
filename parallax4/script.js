const wrapper = document.getElementById('wrapper')
const canvas = document.getElementById('canvas')
const context = canvas.getContext('2d')
const loadingScreen = document.getElementById('loading')
const videoButton = document.getElementById('video-button')
const video = document.getElementById('video')
const motionButton = document.querySelector('.allow-motion-button')
const ua = navigator.userAgent.toLowerCase()
const isAndroid = ua.indexOf('android') > -1
let loadCounter = 0
let isMoving = false
const pointerInitial = { x: 0, y: 0 }
const pointer = { x: 0, y: 0 }
const motionInitial = { x: null, y: null }
const motion = { x: 0, y: 0 }
let alpha = 0
let beta = 0
let totalX = 0
let totalY = 0
const maxOffset = 2000

function isMobile () {
  return "ontouchstart" in document.documentElement
}

function stopVideo (video) {
  video.pause()
  video.currentTime = 0
}

let showVideo = false
videoButton.addEventListener('click', () => {
  showVideo = !showVideo

  video.classList.toggle('invisible', !showVideo)
  canvas.classList.toggle('invisible', showVideo)
  videoButton.classList.toggle('stop', showVideo)
  showVideo && video.play()
  !showVideo && stopVideo(video)
})

const baseConfig = {
  position: { x: 0, y: 0 },
  blend: null,
  opacity: 1,
}

const layerList = [
  {
    ...baseConfig,
    src: './images/background.png',
    zIndex: -7,
  },
  {
    ...baseConfig,
    src: './images/buildings2.png',
    zIndex: -5,
  },
  {
    ...baseConfig,
    src: './images/floor.png',
    zIndex: -4,
  },
  {
    ...baseConfig,
    src: './images/buildings.png',
    zIndex: -3,
  },
  {
    ...baseConfig,
    src: './images/shadow-cars2.png',
    zIndex: -2.5,
    opacity: 0.7,
  },
  {
    ...baseConfig,
    src: './images/shadow-cars.png',
    zIndex: -2.5,
    opacity: 0.3,
  },
  {
    ...baseConfig,
    src: './images/shadow-bus.png',
    zIndex: -2,
  },
  {
    ...baseConfig,
    src: './images/cars.png',
    zIndex: -1.8,
  },
  {
    ...baseConfig,
    src: './images/cars2.png',
    zIndex: -1.5,
  },
  {
    ...baseConfig,
    src: './images/shadow-canvas.png',
    zIndex: -2,
    opacity: 0.5,
  },
  {
    ...baseConfig,
    src: './images/guy-shadow.png',
    zIndex: -1.5,
    opacity: 0.5,
  },
  {
    ...baseConfig,
    src: './images/bus.png',
    zIndex: -1,
  },
  {
    ...baseConfig,
    src: './images/mask.png',
    zIndex: 0,
  },
  {
    ...baseConfig,
    src: './images/bike.png',
    zIndex: 0.5,
  },
  {
    ...baseConfig,
    src: './images/head.png',
    zIndex: 1.3,
  },
  {
    ...baseConfig,
    src: './images/body.png',
    zIndex: 2,
  },
  {
    ...baseConfig,
    src: './images/bag.png',
    zIndex: 2.7,
  },
  {
    ...baseConfig,
    src: './images/dog.png',
    zIndex: 2.8,
  },
  {
    ...baseConfig,
    src: './images/dots1.png',
    zIndex: 4,
  },
  {
    ...baseConfig,
    src: './images/dots2.png',
    zIndex: 5,
  },
]

layerList.forEach((layer) => {
  layer.image = new Image()
  layer.image.onload = () => {
    loadCounter += 1
    if (loadCounter < layerList.length) return
    hideLoading()
    requestAnimationFrame(drawCanvas)
  }
  layer.image.src = layer.src
})

function hideLoading () {
  canvas.classList.add('bounceIn')
  loadingScreen.classList.add('hidden')
}

function drawCanvas () {
  context.clearRect(0, 0, canvas.width, canvas.height)

  TWEEN.update()

  const coef = isAndroid ? 0.5 : 1.2
  const rotateX = (pointer.y * -0.15) + (motion.y * -coef)
  const rotateY = (pointer.x * 0.15) + (motion.x * coef)
  canvas.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`

  layerList.forEach((layer) => {
    layer.position = getOffset(layer)
    context.globalCompositeOperation = layer.blend || 'source-over'
    context.globalAlpha = layer.opacity
    if (layer.mode === 'isMoving' && isMoving === true) {
      context.drawImage(layer.image, layer.position.x, layer.position.y)
    } else if (!layer?.mode) {
      context.drawImage(layer.image, layer.position.x, layer.position.y)
    } else if (layer.mode === 'no-moving' && !isMoving) {
      context.drawImage(layer.image, layer.position.x, layer.position.y)
    }
  })
  requestAnimationFrame(drawCanvas)
}

function getOffset (layer) {
  const touchMultiplier = 0.3
  const touchOffsetX = pointer.x * layer.zIndex * touchMultiplier
  const touchOffsetY = pointer.y * layer.zIndex * touchMultiplier

  const motionMultiplier = isAndroid ? 0.5 : 2
  const motionOffsetX = motion.x * layer.zIndex * motionMultiplier
  const motionOffsetY = motion.y * layer.zIndex * motionMultiplier

  return {
    x: touchOffsetX + motionOffsetX,
    y: touchOffsetY + motionOffsetY,
  }
}

function pointerStart(event) {
  isMoving = true
  if (event.type === 'touchstart') {
    pointerInitial.x = event.touches[0].clientX
    pointerInitial.y = event.touches[0].clientY
  } else if (event.type === 'mousedown') {
    pointerInitial.x = event.clientX
    pointerInitial.y = event.clientY
  }
}

function pointerMove (event) {
  // event.preventDefault()
  if (!isMoving) return
  let currentX = 0
  let currentY = 0
  if (event.type === 'touchmove') {
    currentX = event.touches[0].clientX
    currentY = event.touches[0].clientY
  } else if (event.type === 'mousemove') {
    currentX = event.clientX
    currentY = event.clientY
  }
  pointer.x = currentX - pointerInitial.x
  pointer.y = currentY - pointerInitial.y
}

function endGesture () {
  isMoving = false
  TWEEN.removeAll()
  new TWEEN.Tween(pointer).to({ x: 0, y: 0 }, 300).easing(TWEEN.Easing.Back.Out).start()
}

function handleClick (event) {
  event.preventDefault()
  wrapper.classList.remove("surprise")
  void wrapper.offsetWidth
  wrapper.classList.add("surprise")
  navigator.vibrate(100)
}

canvas.addEventListener('touchstart', pointerStart)
canvas.addEventListener('mousedown', pointerStart)
window.addEventListener('touchmove', pointerMove)
window.addEventListener('mousemove', pointerMove)
canvas.addEventListener('touchmove', (event)=>  { event.preventDefault() })
canvas.addEventListener('mousemove', (event)=>  { event.preventDefault() })
canvas.addEventListener('click', handleClick)
window.addEventListener('touchend', () => { endGesture() })
window.addEventListener('mouseup', () => { endGesture() })

function handleMotion (event) {
  motionButton.classList.remove('visible')

  alpha = event.rotationRate.alpha
  beta = event.rotationRate.beta

  totalX += beta
  totalY += alpha

  if (Math.abs(totalX) > maxOffset) {
    totalX = maxOffset * Math.sign(totalX)
  }
  if (Math.abs(totalY) > maxOffset) {
    totalY = maxOffset * Math.sign(totalY)
  }

  const xOffset = -totalY / 100
  const yOffset = totalX / 100

  motion.x = xOffset
  motion.y = yOffset

  if (window.orientation === 90) {
    motion.x = -xOffset
    motion.y = -yOffset
  } else if (window.orientation === -90) {
    motion.x = xOffset
    motion.y = yOffset
  } else if (window.orientation === 180) {
    motion.x = -yOffset
    motion.y = xOffset
  } else if (window.orientation === 0) {
    motion.x = yOffset
    motion.y = -xOffset
  }
}

function handleOrientation (event) {
  motionButton.classList.remove('visible')

  if (!motionInitial.x && !motionInitial.y) {
    motionInitial.x = event.beta
    motionInitial.y = event.gamma
  }

  if (window.orientation === 0) {
    motion.x = event.gamma - motionInitial.y
    motion.y = event.beta - motionInitial.x
  } else if (window.orientation === 90) {
    motion.x = event.beta - motionInitial.x
    motion.y = -event.gamma + motionInitial.y
  } else if (window.orientation === -90) {
    motion.x = -event.beta + motionInitial.x
    motion.y = event.gamma - motionInitial.y
  } else {
    motion.x = -event.gamma + motionInitial.y
    motion.y = -event.beta + motionInitial.x
  }
}

if (isAndroid) {
  window.addEventListener("deviceorientation", handleOrientation)
} else {
  window.addEventListener("devicemotion", handleMotion)
}

window.addEventListener('orientationchange', () => {
  motionInitial.x = 0
  motionInitial.y = 0
})

if (window.DeviceOrientationEvent && DeviceOrientationEvent.requestPermission) {
  motionButton.classList.add('visible')
}

function enableMotion () {
  DeviceOrientationEvent.requestPermission()
  motionButton.classList.remove('visible')
}
