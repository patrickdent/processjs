function setup() {
  createCanvas(1000, 1000)
  const center = {x: 500, y: 500}
}
function draw() {
    background(0)
    stroke(3, 236, 252)
    for (let y = 0; y <= 1000; y+=100) {
      line(0, y, 1000, y)    

    }
    for (let x = 0; x <= 1000; x+=100) {
      line(x, 0, x, 1000)
    }
}
