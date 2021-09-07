import { Color } from 'p5'

export interface Vertex {
  [index: number]: number
}

export interface Polygon {
  vertices: Vertex[]
  color?: Color
}

export interface MultiPolygonShape {
  polygons: Polygon[]
  mask?: Polygon
}

export enum Shape {
  TRIANGLE,
  SQUARE,
  PENTAGON,
  HEXAGON,
  HEPTAGON,
  OCTAGON,
}

export interface PropertyVariant {
  name?: string
  probability: number
}

export interface ShapeVariant extends PropertyVariant {
  value: Shape
}

export interface SpeedVariant extends PropertyVariant {
  value: number
}

export interface OutlineWidthVariant extends PropertyVariant {
  value: number
}

export interface ColorPaletteVariant extends PropertyVariant {
  value: string[]
}

export interface PropertyVariantCount extends PropertyVariant {
  probability: number
  value: number
}
