import * as P5 from 'p5'

export function drawPolygon(
  p5: P5,
  x: number,
  y: number,
  radius: number,
  pointsNumber: number,
  graphics?: P5.Graphics
) {
  let target: any = graphics || p5

  let angle = p5.TWO_PI / pointsNumber
  target.beginShape()

  for (let a = 0; a < p5.TWO_PI; a += angle) {
    let sx = x + Math.cos(a) * radius
    let sy = y + Math.sin(a) * radius
    target.vertex(sx, sy)
  }
  target.endShape(p5.CLOSE)
}
