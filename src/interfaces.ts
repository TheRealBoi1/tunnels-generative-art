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
  SQUARE,
  TRIANGLE,
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

export interface OutlineColorVariant extends PropertyVariant {
  value: number[]
}

export interface PropertyVariantCount extends PropertyVariant {
  probability: number
  value: number
}
