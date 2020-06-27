
class Satellite {
  constructor(parent, radius, speed, distance) {
    this.degree = 0
    this.speed = speed
    this.parent = parent
    this.radius = radius
    this.distance = distance
  }

  draw() {
    this.move()
    stroke(0)
    fill(255)
    circle(this.x, this.y, this.radius*2)
  }

  move() {
    this.degree += this.speed
    this.x = this.distance * sin(this.degree) + this.parent.x
    this.y = this.distance * cos(this.degree) + this.parent.y
  }
}

let bodies = []

function setup() {
  createCanvas(1000, 1000)
  angleMode(DEGREES)
  const center = {x: 500, y: 500}
  let sun = new Satellite(center, 50, 0, 1)
  let s1 = new Satellite(center, 5, 0.5, 350)
  let s2 = new Satellite(s1, 2, -2, 50)
  let s3 = new Satellite(s2, 2.5, 20, 25)


  bodies.push(sun)
  bodies.push(s1)
  bodies.push(s2)
  bodies.push(s3)
}

let iterations = 0
function draw() {
  if (iterations > 360) {
    stop()
  } else {
    clear()

    bodies.forEach((body) => body.draw())
    iterations++
  }
}
