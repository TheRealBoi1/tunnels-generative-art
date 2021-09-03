import * as P5 from 'p5'
import { MultiPolygonShape, Polygon } from '../../interfaces'

export function renderPolygon(p5: P5, polygon: Polygon, graphic?: P5.Graphics) {
  let target: P5 | P5.Graphics = graphic || p5
  target.push()
  target.beginShape()
  target.fill(polygon.color)
  target.noStroke()
  polygon.vertices.forEach((v) => {
    target.vertex(v[0], p5.windowHeight - v[1])
  })
  target.endShape(p5.CLOSE)
  target.pop()
}

export function renderMultiPolygonShape(
  p5: P5,
  shape: MultiPolygonShape,
  graphic?: P5.Graphics
) {
  shape.polygons.forEach((polygon) => {
    renderPolygon(p5, polygon, graphic)
  })
}

export function imageMultiPolygonShape(
  p5: P5,
  shape: MultiPolygonShape
): P5.Image {
  const shapeGraphic = p5.createGraphics(p5.width, p5.height)
  renderMultiPolygonShape(p5, shape, shapeGraphic)

  let sImage = p5.createImage(shapeGraphic.width, shapeGraphic.height)
  sImage.copy(
    shapeGraphic,
    0,
    0,
    shapeGraphic.width,
    shapeGraphic.height,
    0,
    0,
    shapeGraphic.width,
    shapeGraphic.height
  )

  if (shape.mask) {
    const maskGraphic = p5.createGraphics(p5.width, p5.height)
    renderPolygon(p5, shape.mask, maskGraphic)

    // @ts-ignore
    sImage.mask(maskGraphic)
  }
  return sImage
}
