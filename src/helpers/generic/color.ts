import * as P5 from 'p5'
import { Polygon } from '../../interfaces'

export function generateRandomColor(
  p5: P5,
  minR?: number,
  maxR?: number,
  minG?: number,
  maxG?: number,
  minB?: number,
  maxB?: number
) {
  return p5.color(
    p5.random(minR || 0, maxR || 255),
    p5.random(minG || 0, maxG || 255),
    p5.random(minB || 0, maxB || 255)
  )
}

export function shufflePolygonColors(
  p5: P5,
  polygons: Polygon[],
  baseColor: P5.Color,
  levelVariant: number,
  cumulative: boolean
) {
  let lastColor = baseColor
  polygons.forEach((p) => {
    let randomVariant = p5.random(-levelVariant, levelVariant)
    let newR = lastColor.levels[0] + randomVariant
    let newG = lastColor.levels[1] + randomVariant
    let newB = lastColor.levels[2] + randomVariant

    if (cumulative) {
      lastColor = p5.color(newR, newG, newB)
      p.color = lastColor
    } else {
      p.color = p5.color(newR, newG, newB)
    }
  })
}
