
class Petal {
  constructor(distance, degree, height, deviation, center, color, rotationSpeed) {
    this.distance = distance
    this.degree = degree + rotationSpeed
    this.height = height
    this.deviation = deviation
    this.center = center
    this.color = color
    this.rotationSpeed = rotationSpeed
    this.calculatePoints()
  }

  calculatePoints() {
    const x1 = this.distance * sin(this.degree-this.deviation) + this.center.x
    const y1 = this.distance * cos(this.degree-this.deviation) + this.center.y
    const bezier1 = {
      x: (this.distance + (this.height/2)) * sin(this.degree-this.deviation) + this.center.x,
      y: (this.distance + (this.height/2)) * cos(this.degree-this.deviation) + this.center.y
    }

    const x2 = this.distance * sin(this.degree+this.deviation) + this.center.x
    const y2 = this.distance * cos(this.degree+this.deviation) + this.center.y
    const bezier2 = {
      x: (this.distance + (this.height/2)) * sin(this.degree+this.deviation) + this.center.x,
      y: (this.distance + (this.height/2)) * cos(this.degree+this.deviation) + this.center.y
    }

    const x3 = (this.distance + this.height) * sin(this.degree) + this.center.x
    const y3 = (this.distance + this.height) * cos(this.degree) + this.center.y
    const bezier3 = {
      x: (this.distance + (this.height/2)) * sin(this.degree) + this.center.x,
      y: (this.distance + (this.height/2)) * cos(this.degree) + this.center.y
    }

    this.base = [
      {x: x1, y: y1, bezier: bezier1},
      {x: x2, y: y2, bezier: bezier2}
    ]

    this.point = {x: x3, y: y3, bezier: bezier3}
  }

  draw() {
    stroke(...this.color)
    noFill()
    strokeWeight(2)
    bezier(
      this.base[0].x, this.base[0].y,
      this.base[0].bezier.x, this.base[0].bezier.y,
      this.point.bezier.x, this.point.bezier.y,
      this.point.x, this.point.y
    )
    bezier(
      this.base[1].x, this.base[1].y,
      this.base[1].bezier.x, this.base[1].bezier.y,
      this.point.bezier.x, this.point.bezier.y,
      this.point.x, this.point.y
    )
    this.degree += this.rotationSpeed

    this.calculatePoints()
  }
}

class Flower {
  constructor(rows, deviation, height, distance, center) {
    const colors = [
      [3, 236, 252],
      [252, 3, 227]
    ]
    const rotationSpeeds = [
      -0.1,
      0.22,
      0.1,
      -0.2,
    ]

    this.petals = []

    for (let row = 0; row <= rows; row++) {
      const start = row*deviation
      for (let degree = start; degree < start+360; degree += 2*deviation) {
        let petal = new Petal(distance, degree, height, deviation, center, colors[row%colors.length], rotationSpeeds[row%rotationSpeeds.length])
        this.petals.push(petal)
      }

      distance = distance+height
      height = height + 1
    }

    console.log(this.petals)
  }

  draw() {
    this.petals.forEach(petal => petal.draw())
  }
}


let flower

function setup() {
  createCanvas(1000, 1000)
  angleMode(DEGREES)
  const center = {x: 500, y: 500}
  const rows = 27
  const deviation = 5
  const height = 3
  const distance = 20

  flower = new Flower(rows, deviation, height, distance, center)
}

function draw() {
  clear()
  background(0)
  flower.draw()
}
