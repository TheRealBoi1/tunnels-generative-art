import {
  DoorNumber,
  OutlineColorVariant,
  OutlineWidthVariant,
  PropertyVariantCount,
  Shape,
  ShapeVariant,
  SpeedVariant,
} from './interfaces'

export const COLOR_BACKGROUND = [51, 0, 0]
export const FRAME_RATE = 30

export const MIN_DOOR_NUMBER = 20
export const MAX_DOOR_NUMBER = 60

export const MIN_ANGLE_GAP = 10
export const MAX_ANGLE_GAP = 45

export const SPEED_VARIANTS: SpeedVariant[] = [
  {
    name: 'Slow',
    probability: 25,
    value: 1000,
  },
  {
    name: 'Normal',
    probability: 50,
    value: 600,
  },
  {
    name: 'Fast',
    probability: 25,
    value: 400,
  },
]

export const SHAPE_VARIANT_COUNTS: PropertyVariantCount[] = [
  {
    probability: 50,
    value: 1,
  },
  {
    probability: 10000,
    value: 2,
  },
]
export const SHAPE_VARIANTS: ShapeVariant[] = [
  {
    name: 'Square',
    probability: 25,
    value: Shape.SQUARE,
  },
  {
    name: 'Triangle',
    probability: 25,
    value: Shape.TRIANGLE,
  },
]

export const OUTLINE_WIDTH_VARIANT_COUNTS: PropertyVariantCount[] = [
  {
    probability: 50,
    value: 1,
  },
  {
    probability: 40,
    value: 2,
  },
  {
    probability: 10,
    value: 3,
  },
]
export const OUTLINE_WIDTH_VARIANTS: OutlineWidthVariant[] = [
  {
    name: 'Thin',
    probability: 12,
    value: 0.004,
  },
  {
    name: 'Light',
    probability: 20,
    value: 0.007,
  },
  {
    name: 'Normal',
    probability: 36,
    value: 0.01,
  },
  {
    name: 'Heavy',
    probability: 20,
    value: 0.014,
  },
  {
    name: 'Ultra Bold',
    probability: 12,
    value: 0.025,
  },
]

export const OUTLINE_COLOR_VARIANT_COUNTS: PropertyVariantCount[] = [
  {
    probability: 60,
    value: 1,
  },
  {
    probability: 30,
    value: 2,
  },
  {
    probability: 10,
    value: 3,
  },
]
export const OUTLINE_COLOR_VARIANTS: OutlineColorVariant[] = [
  {
    name: 'Deep Red',
    probability: 5,
    value: [100, 0, 0],
  },
  {
    name: 'Red',
    probability: 5,
    value: [225, 0, 0],
  },
  {
    name: 'Deep Green',
    probability: 5,
    value: [0, 100, 0],
  },
  {
    name: 'Green',
    probability: 5,
    value: [0, 225, 0],
  },
  {
    name: 'Deep Blue',
    probability: 5,
    value: [0, 0, 100],
  },
  {
    name: 'Blue',
    probability: 5,
    value: [0, 0, 225],
  },
]

export const FILL_COLOR_VARIANT_COUNTS: PropertyVariantCount[] = [
  {
    probability: 85,
    value: 1,
  },
  {
    probability: 10,
    value: 2,
  },
  {
    probability: 5,
    value: 3,
  },
]
export const FILL_COLOR_VARIANTS: OutlineColorVariant[] = [
  {
    name: 'Black',
    probability: 255,
    value: [0, 0, 0],
  },
  {
    name: 'Light Gray',
    probability: 255,
    value: [225, 225, 225],
  },
  {
    name: 'Deep Red',
    probability: 5,
    value: [100, 0, 0],
  },
  {
    name: 'Red',
    probability: 5,
    value: [225, 0, 0],
  },
  {
    name: 'Deep Green',
    probability: 5,
    value: [0, 100, 0],
  },
  {
    name: 'Green',
    probability: 5,
    value: [0, 225, 0],
  },
  {
    name: 'Deep Blue',
    probability: 5,
    value: [0, 0, 100],
  },
  {
    name: 'Blue',
    probability: 5,
    value: [0, 0, 225],
  },
]
