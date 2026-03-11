import canvasSketch from './node_modules/canvas-sketch'
import Color from './node_modules/canvas-sketch-util/color'

const settings = {
  animate: true
}

const defaults = {
  color: Color.parse([80, 80, 80]),
  radius: 12,
  spacing: 8,
  speed: 10
}

class Element {

  constructor (x, y) {
    this.x = x
    this.y = y
    this.radius = this.previous_radius = defaults.radius
    this.color = this.previous_color = defaults.color
  }

  update (radius, color) {
    this.previous_radius = this.radius
    this.previous_color = this.color
    this.radius = radius
    this.color = color
  }

  draw (context) {
    context.save()

    context.translate(this.x, this.y)
    context.strokeStyle = Color.style(this.color)
    context.lineWidth = 1
    context.beginPath()
    context.arc(0, 0, this.radius, 0, Math.PI*2)
    context.stroke()

    context.restore()
  }
}

const sketch = ({ context, width, height, render }) => {
  let elements = []
  let spacing = defaults.spacing
  let pitch = 2*defaults.radius + spacing
  let rows = Math.floor(height / (pitch))
  let columns = Math.floor(width / (pitch))
  let r_pitch = height / rows
  let c_pitch = width / columns

  const cursor = {
    color: '#fc0',
    thickness: 12,
    radius: 17
  }
  let mouse = {}

  document.onmouseenter = document.onmouseenter = () => {
    let body = document.getElementsByTagName("body")[0]
    body.style.cursor = 'pointer'
    setTimeout(() => { body.style.cursor = 'none' }, 20)
  }
  document.onmousemove = document.onmousemove = (e) => {
    mouse.x = e.pageX
    mouse.y = e.pageY
  }
  document.onmouseleave = document.onmouseleave = () => {
    delete mouse.x, mouse.y
  }


  context.canvas.addEventListener('touchstart', (e) => { e.preventDefault() }, {passive: false})

  context.canvas.addEventListener('touchmove', (e) => {
    e.preventDefault()
    mouse.x = e.touches[0].pageX
    mouse.y = e.touches[0].pageY
  }, { passive: false })

  context.canvas.addEventListener('touchend', () => { delete mouse.x, mouse.y }, {passive: false})
  context.canvas.addEventListener('touchcancel', () => { delete mouse.x, mouse.y }, {passive: false})

  return {
    render ({ width, height }) {

      context.save()

      context.clearRect(0, 0, width, height)

      if (mouse.x) {
        context.save()

        context.translate(mouse.x, mouse.y)
        context.lineWidth = cursor.thickness
        context.strokeStyle = cursor.color
        context.beginPath()
        context.moveTo(-cursor.radius, -cursor.radius)
        context.lineTo(cursor.radius, cursor.radius)
        context.moveTo(-cursor.radius, cursor.radius)
        context.lineTo(cursor.radius, -cursor.radius)
        context.stroke()

        context.restore()
      }

      let color, dist = 0
      const max_dist = width * Math.sqrt(2)

      elements.forEach((e) => {
        if (mouse.x) {
          dist = Math.hypot(e.x - mouse.x, e.y - mouse.y)
          color = Color.blend(defaults.color, Color.parse("#abc"), 1 - Math.min(dist / (max_dist/2), 1))
          radius = Math.min(dist**(1/2) / (max_dist/2)**(1/2) * defaults.radius, defaults.radius)
        } else {
          color = defaults.color
          radius = defaults.radius
        }
        e.update(radius, color)
        e.draw(context)
      })
      context.restore()
    },

    resize ({ width, height }) {

      elements = []
      pitch = 2 * defaults.radius + spacing
      rows = Math.floor(height / (pitch))
      columns = Math.floor(width / (pitch))
      r_pitch = height / rows
      c_pitch = width / columns

      header.object.style.background = "none"
      hsx = hsy = Math.ceil(width*0.05/c_pitch)
      hw = Math.ceil(header.initial_width/c_pitch)
      hh = Math.ceil(header.initial_height/r_pitch)
      hex = hsx + hw
      hey = hsy + hh
      header.object.style.left = hsx * c_pitch + "px"
      header.object.style.top = hsy * r_pitch + "px"
      header.object.style.width = hw * c_pitch + "px"
      header.object.style.height = hh * r_pitch + "px"

      footer.object.style.background = "none"
      fex = fey = Math.ceil(width*0.05/c_pitch)
      fw = Math.ceil(footer.initial_width/c_pitch)
      fh = Math.ceil(footer.initial_height/r_pitch)
      footer.object.style.right = fex * c_pitch + "px"
      footer.object.style.bottom = fey * r_pitch + "px"
      footer.object.style.width = fw * c_pitch + "px"
      footer.object.style.height = fh * r_pitch + "px"

      fsx = columns - fex - fw
      fsy = rows - fey - fh
      fex = fsx + fw
      fey = fsy + fh

      for (let i = 0; i < rows; i++) {
        for (let j = 0; j<columns; j++) {
          if (j >= hsx && j < hex && i >= hsy && i < hey) continue
          if (j >= fsx && j < fex && i >= fsy && i < fey) continue
          elements.push(new Element(j * c_pitch + (c_pitch / 2), i * r_pitch + (r_pitch / 2)))
        }
      }

      render()
    }
  }
}

canvasSketch(sketch, settings)
