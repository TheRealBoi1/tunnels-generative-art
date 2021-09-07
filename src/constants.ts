import {
  ColorPaletteVariant,
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
export const MAX_ANGLE_GAP = 40

export const MIN_ANGLE_OFFSET = -25
export const MAX_ANGLE_OFFSET = 25

export const MIN_SCALE_OFFSET = 0.05
export const MAX_SCALE_OFFSET = 0.3

export const SPEED_VARIANTS: SpeedVariant[] = [
  {
    name: 'Slow',
    probability: 25,
    value: 1200,
  },
  {
    name: 'Normal',
    probability: 50,
    value: 800,
  },
  {
    name: 'Fast',
    probability: 25,
    value: 600,
  },
]

export const SHAPE_VARIANT_COUNTS: PropertyVariantCount[] = [
  {
    probability: 15,
    value: 1,
  },
  {
    probability: 20,
    value: 2,
  },
  {
    probability: 20,
    value: 3,
  },
  {
    probability: 15,
    value: 4,
  },
]
export const SHAPE_VARIANTS: ShapeVariant[] = [
  {
    name: 'Triangle',
    probability: 25,
    value: Shape.TRIANGLE,
  },
  {
    name: 'Square',
    probability: 25,
    value: Shape.SQUARE,
  },
  {
    name: 'Pentagon',
    probability: 25,
    value: Shape.PENTAGON,
  },
  {
    name: 'Hexagon',
    probability: 25,
    value: Shape.HEXAGON,
  },
  {
    name: 'Heptagon',
    probability: 25,
    value: Shape.HEPTAGON,
  },
  {
    name: 'Octagon',
    probability: 25,
    value: Shape.OCTAGON,
  },
]

export const OUTLINE_WIDTH_VARIANT_COUNTS: PropertyVariantCount[] = [
  {
    probability: 40,
    value: 1,
  },
  {
    probability: 35,
    value: 2,
  },
  {
    probability: 25,
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
    probability: 35,
    value: 1,
  },
  {
    probability: 30,
    value: 2,
  },
  {
    probability: 25,
    value: 3,
  },
]

export const FILL_COLOR_VARIANT_COUNTS: PropertyVariantCount[] = [
  {
    probability: 35,
    value: 1,
  },
  {
    probability: 30,
    value: 2,
  },
  {
    probability: 25,
    value: 3,
  },
]

export const COLOR_PALETTE_VARIANTS: ColorPaletteVariant[] = [
  {
    name: 'Cream',
    probability: 5,
    value: [
      '#fec5bb',
      '#fcd5ce',
      '#fae1dd',
      '#e8e8e4',
      '#e8e8e4',
      '#d8e2dc',
      '#ece4db',
      '#ffe5d9',
      '#ffd7ba',
      '#fec89a',
    ],
  },
  {
    name: 'Summer',
    probability: 5,
    value: ['#264653', '#2a9d8f', '#e9c46a', '#f4a261', '#e76f51', '#d8e2dc', '#e63946'],
  },
  {
    name: 'Ocean',
    probability: 5,
    value: [
      '#03045e',
      '#023e8a',
      '#0077b6',
      '#0096c7',
      '#00b4d8',
      '#48cae4',
      '#90e0ef',
      '#ade8f4',
      '#caf0f8',
    ],
  },
  {
    name: 'Light Rainbow',
    probability: 5,
    value: [
      '#ffadad',
      '#ffd6a5',
      '#fdffb6',
      '#caffbf',
      '#9bf6ff',
      '#a0c4ff',
      '#bdb2ff',
      '#ffc6ff',
      '#fffffc',
    ],
  },
  {
    name: 'Military',
    probability: 5,
    value: ['#606c38', '#283618', '#fefae0', '#dda15e', '#865C2D', '#bc6c25'],
  },
  {
    name: 'Neon',
    probability: 5,
    value: [
      '#f72585',
      '#b5179e',
      '#7209b7',
      '#560bad',
      '#480ca8',
      '#3a0ca3',
      '#3f37c9',
      '#4361ee',
      '#4895ef',
      '#4cc9f0',
    ],
  },
  {
    name: 'Pop',
    probability: 5,
    value: ['#e63946', '#f1faee', '#afb7b7', '#a8dadc', '#457b9d', '#1d3557', '#122239'],
  },
  {
    name: 'Nature',
    probability: 5,
    value: [
      '#d9ed92',
      '#b5e48c',
      '#99d98c',
      '#76c893',
      '#52b69a',
      '#34a0a4',
      '#168aad',
      '#1a759f',
      '#1e6091',
      '#184e77',
    ],
  },
  {
    name: 'Hot & Cold',
    probability: 5,
    value: [
      '#001219',
      '#005f73',
      '#0a9396',
      '#94d2bd',
      '#e9d8a6',
      '#ee9b00',
      '#ca6702',
      '#bb3e03',
      '#ae2012',
      '#9b2226',
    ],
  },
  {
    name: 'Day & Night',
    probability: 5,
    value: ['#000000', '#000814', '#001d3d', '#003566', '#ffc300', '#ffd60a'],
  },
  {
    name: 'Cotton Candy',
    probability: 5,
    value: [
      '#ffcbf2',
      '#f3c4fb',
      '#ecbcfd',
      '#e2afff',
      '#e2afff',
      '#deaaff',
      '#d8bbff',
      '#d0d1ff',
      '#c8e7ff',
      '#c0fdff',
    ],
  },
  {
    name: 'Shades Of Gray',
    probability: 5,
    value: [
      '#f8f9fa',
      '#e9ecef',
      '#dee2e6',
      '#ced4da',
      '#adb5bd',
      '#6c757d',
      '#495057',
      '#343a40',
      '#212529',
    ],
  },
  {
    name: 'Pink Lemonade',
    probability: 5,
    value: [
      '#ff0a54',
      '#ff477e',
      '#ff5c8a',
      '#ff7096',
      '#ff85a1',
      '#fbb1bd',
      '#f9bec7',
      '#f7cad0',
      '#fae0e4',
    ],
  },
  {
    name: 'Wine',
    probability: 5,
    value: [
      '#641220',
      '#6e1423',
      '#85182a',
      '#a11d33',
      '#a71e34',
      '#b21e35',
      '#bd1f36',
      '#c71f37',
      '#da1e37',
      '#e01e37',
    ],
  },
  {
    name: 'Peach',
    probability: 5,
    value: ['#ffcdb2', '#ffb4a2', '#e5989b', '#ff8b8e', '#b5838d', '#6d6875'],
  },
  {
    name: 'Coffee',
    probability: 5,
    value: ['#6f1d1b', '#bb9457', '#432818', '#99582a', '#ffe6a7', '#583a33', '#452f2f'],
  },
  {
    name: 'Cartoon',
    probability: 5,
    value: ['#50514f', '#f25f5c', '#ffe066', '#247ba0', '#70c1b3', '#C67624'],
  },
  {
    name: 'Unicorn',
    probability: 5,
    value: ['#9f8900', '#f0a6ca', '#efc3e6', '#f0e6ef', '#b8bedd', '#603f8f'],
  },
  {
    name: 'Warehouse',
    probability: 5,
    value: ['#fffcf2', '#ccc5b9', '#403d39', '#252422', '#eb5e28', '#f18904'],
  },
  {
    name: 'Lost Songs',
    probability: 5,
    value: ['#0c274a', '#251e3e', '#451e3e', '#651e3e', '#851e3e', '#0C274A'],
  },
  {
    name: 'Luxurious',
    probability: 1,
    value: ['#454f5e', '#b19a33', '#968331', '#968331', '#333132', '#ffffff'],
  },
]

export const SCALE_OFFSET_VARIANT_COUNTS: PropertyVariantCount[] = [
  {
    probability: 20,
    value: 2,
  },
  {
    probability: 18,
    value: 3,
  },
  {
    probability: 16,
    value: 4,
  },
  {
    probability: 14,
    value: 5,
  },
  {
    probability: 12,
    value: 6,
  },
  {
    probability: 10,
    value: 7,
  },
  {
    probability: 8,
    value: 8,
  },
  {
    probability: 6,
    value: 9,
  },
  {
    probability: 4,
    value: 10,
  },
]
