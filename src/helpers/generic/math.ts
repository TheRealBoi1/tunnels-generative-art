import { MultiPolygonShape, Polygon, Vertex } from '../../interfaces'

export function uToX(u: number, width: number): number {
  return u * width
}

export function vToY(v: number, height: number): number {
  return v * height
}

export function uvToXy(vertex: Vertex, width: number, height: number): Vertex {
  return [uToX(vertex[0], width), vToY(vertex[1], height)]
}

export function uvToXyPolygon(
  polygon: Polygon,
  width: number,
  height: number
): Polygon {
  return {
    ...polygon,
    vertices: polygon.vertices.map((vertex) => {
      return uvToXy(vertex, width, height)
    }),
  }
}

export function uvToXyShape(
  shape: MultiPolygonShape,
  width: number,
  height: number
): MultiPolygonShape {
  return {
    ...shape,
    mask: shape.mask ? uvToXyPolygon(shape.mask, width, height) : undefined,
    polygons: shape.polygons.map((polygon) => {
      return uvToXyPolygon(polygon, width, height)
    }),
  }
}

export function quadraticRangeRatio(x: number, range: number): number {
  return Math.pow(x, 2) / Math.pow(range, 2)
}
