import * as P5 from 'p5'
import {
  ColorPaletteVariant,
  OutlineWidthVariant,
  PropertyVariant,
  PropertyVariantCount,
  Shape,
  ShapeVariant,
  SpeedVariant,
} from '../interfaces'
import {
  COLOR_PALETTE_VARIANTS,
  FILL_COLOR_VARIANT_COUNTS,
  MAX_ANGLE_GAP,
  MAX_DOOR_NUMBER,
  MAX_SCALE_OFFSET,
  MIN_ANGLE_GAP,
  MIN_DOOR_NUMBER,
  MIN_SCALE_OFFSET,
  OUTLINE_COLOR_VARIANT_COUNTS,
  OUTLINE_WIDTH_VARIANT_COUNTS,
  OUTLINE_WIDTH_VARIANTS,
  SCALE_OFFSET_VARIANT_COUNTS,
  SHAPE_VARIANT_COUNTS,
  SHAPE_VARIANTS,
  SPEED_VARIANTS,
} from '../constants'
import { drawPolygon } from '../helpers/generic/geometry'

interface Door {
  angle: number
  shape: Shape
  fillColor: string
  outlineColor: string
  outlineWidth: number
  scaleOffset: number
  image: P5.Image
}

export class TunnelManager {
  private readonly p5!: P5
  private graphics!: any

  private travelledDoorsCount: number = 0
  private doors: Door[] = []

  private readonly MIN_PROGRESS_RENDER = 0.04
  private readonly MIN_PROGRESS_FADE_IN = 0.04
  private readonly MAX_PROGRESS_FADE_IN = 0.05
  private readonly MIN_PROGRESS_FADE_OUT = 0.99
  private readonly MAX_PROGRESS_FADE_OUT = 1.0

  // Scale of the shapes that cuts the door images relative to the door image size
  private readonly DOOR_SHAPE_SCALE = 0.35

  // Scale of the saved door images relative to the canvas size
  // This is to compensate for how slow the tint function is
  private readonly DOOR_IMAGE_SCALE = 1

  private readonly RENDER_ZOOM = 2.0

  private speed!: SpeedVariant
  private shapes!: ShapeVariant[]
  private outlineWidths!: OutlineWidthVariant[]
  private colorPalette!: ColorPaletteVariant

  private doorNumber!: number
  private angleGap!: number
  private scaleOffsets!: number[]
  private fillColors!: string[]
  private outlineColors!: string[]

  public constructor(p5: P5) {
    this.p5 = p5
    this.graphics = this.p5.createGraphics(
      this.p5.width * this.DOOR_IMAGE_SCALE,
      this.p5.height * this.DOOR_IMAGE_SCALE
    )
    this.generateTunnelProperties()
    this.createDoors()
  }

  public refreshSize() {
    this.graphics = this.p5.createGraphics(
      this.p5.width * this.DOOR_IMAGE_SCALE,
      this.p5.height * this.DOOR_IMAGE_SCALE
    )
    this.createDoors()
  }

  public drawTunnel() {
    let framesPerDoor = Math.round(this.speed.value / this.doorNumber)
    if (this.p5.frameCount % framesPerDoor === 0) {
      this.travelledDoorsCount += 1
      let newDoor = this.createDoor(0)
      this.doors.splice(this.doors.length - 1, 1)
      this.doors.splice(0, 0, newDoor)
    }

    let fillColor = this.fillColors[0]
    this.p5.background(fillColor)
    this.p5.imageMode(this.p5.CENTER)
    for (let i = 0; i < this.doorNumber; i++) {
      this.drawDoor(i, framesPerDoor)
    }
  }

  private drawDoor(localDoorIndex: number, framesPerDoor: number) {
    let draw = (scale: number = 1, alpha?: number) => {
      let door = this.doors[localDoorIndex]

      if (alpha) this.p5.tint(255, alpha)

      let imageScale = (scale / this.DOOR_SHAPE_SCALE) * this.RENDER_ZOOM
      if (door.scaleOffset) imageScale *= 1 - door.scaleOffset

      this.p5.translate(this.p5.width / 2, this.p5.width / 2)
      this.p5.scale(imageScale)
      this.p5.image(door.image, 0, 0)
      this.p5.scale(1 / imageScale)
      this.p5.translate(-this.p5.width / 2, -this.p5.width / 2)

      let outlineScale = scale * this.RENDER_ZOOM
      if (door.scaleOffset) outlineScale *= 1 - door.scaleOffset

      let strokeColor = this.p5.color(door.outlineColor)
      if (alpha) strokeColor.setAlpha(alpha)

      this.p5.fill(0, 0, 0, 0)
      this.p5.strokeWeight(door.outlineWidth)
      this.p5.stroke(strokeColor)
      this.drawDoorShape(door.shape, outlineScale, door.angle)
      this.p5.noStroke()

      if (alpha) this.p5.noTint()
    }

    let gapSize = 1 / this.doorNumber
    let gapProgress = (this.p5.frameCount % framesPerDoor) / framesPerDoor
    let progress = (localDoorIndex % this.doorNumber) / this.doorNumber + gapSize * gapProgress

    if (progress > this.MIN_PROGRESS_RENDER) {
      if (progress > this.MIN_PROGRESS_FADE_IN && progress < this.MAX_PROGRESS_FADE_IN) {
        let tintProgress =
          (progress - this.MIN_PROGRESS_FADE_IN) /
          (this.MAX_PROGRESS_FADE_IN - this.MIN_PROGRESS_FADE_IN)
        draw(progress, tintProgress * 255)
      } else if (progress > this.MIN_PROGRESS_FADE_OUT && progress < this.MAX_PROGRESS_FADE_OUT) {
        let tintProgress =
          (progress - this.MIN_PROGRESS_FADE_OUT) /
          (this.MAX_PROGRESS_FADE_OUT - this.MIN_PROGRESS_FADE_OUT)
        draw(progress, (1 - tintProgress) * 255)
      } else {
        draw(progress)
      }
    }
  }

  private createDoors() {
    this.doors.splice(0)
    if (this.doors.length < this.doorNumber) {
      for (let i = 0; i < this.doorNumber; i++) {
        this.doors.push(this.createDoor(i))
      }
    }
  }

  private createDoor(localDoorIndex: number): Door {
    let globalDoorIndex = localDoorIndex + this.travelledDoorsCount
    let angle = globalDoorIndex * this.angleGap
    let scaleOffset = this.scaleOffsets[globalDoorIndex % this.outlineWidths.length]
    let shape = this.shapes[globalDoorIndex % this.shapes.length].value
    let fillColor = this.fillColors[globalDoorIndex % this.fillColors.length]
    let outlineColor = this.outlineColors[globalDoorIndex % this.outlineColors.length]
    let outlineWidth =
      this.outlineWidths[globalDoorIndex % this.outlineWidths.length].value * this.p5.width

    return {
      angle,
      shape,
      scaleOffset,
      fillColor,
      outlineColor,
      outlineWidth,
      image: this.createDoorImage(angle, shape, fillColor),
    }
  }

  private createDoorImage(angle: number, shape: Shape, fillColor: string) {
    let backgroundColor = this.p5.color(fillColor)
    this.graphics.background(backgroundColor)
    this.graphics.erase()
    this.graphics.fill(255, 255, 255, 255)
    this.drawDoorShape(shape, this.DOOR_SHAPE_SCALE, angle, this.graphics)
    this.graphics.noErase()

    let image = this.p5.createImage(this.graphics.width, this.graphics.height)
    image.copy(
      this.graphics,
      0,
      0,
      this.graphics.width,
      this.graphics.height,
      0,
      0,
      this.graphics.width,
      this.graphics.height
    )

    this.graphics.clear()
    return image
  }

  private drawDoorShape(shape: Shape, scale: number, angle: number, graphics?: P5.Graphics) {
    let drawShape = () => {
      switch (shape) {
        case Shape.TRIANGLE:
          drawPolygon(this.p5, 0, 0, this.p5.width / 2, 3, graphics)
          break
        case Shape.SQUARE:
          drawPolygon(this.p5, 0, 0, this.p5.width / 2, 4, graphics)
          break
        case Shape.PENTAGON:
          drawPolygon(this.p5, 0, 0, this.p5.width / 2, 5, graphics)
          break
        case Shape.HEXAGON:
          drawPolygon(this.p5, 0, 0, this.p5.width / 2, 6, graphics)
          break
        case Shape.HEPTAGON:
          drawPolygon(this.p5, 0, 0, this.p5.width / 2, 7, graphics)
          break
        case Shape.OCTAGON:
          drawPolygon(this.p5, 0, 0, this.p5.width / 2, 8, graphics)
          break
      }
    }

    let target: any = graphics || this.p5
    target.angleMode(this.p5.DEGREES)
    target.translate(target.width / 2, target.height / 2)
    target.scale(scale)
    target.rotate(angle)
    drawShape()
    target.rotate(-angle)
    target.scale(1 / scale)
    target.translate(-target.width / 2, -target.height / 2)
  }

  private generateTunnelProperties() {
    this.doorNumber = Math.round(this.p5.random(MIN_DOOR_NUMBER, MAX_DOOR_NUMBER))
    let angleSign = Math.round(this.p5.random(0, 1)) ? 1 : -1
    this.angleGap = angleSign * Math.round(this.p5.random(MIN_ANGLE_GAP, MAX_ANGLE_GAP))
    this.speed = <SpeedVariant>this.getRandomPropertyVariant(SPEED_VARIANTS)
    this.shapes = <ShapeVariant[]>(
      this.getRandomPropertyVariant(SHAPE_VARIANTS, SHAPE_VARIANT_COUNTS)
    )
    this.outlineWidths = <OutlineWidthVariant[]>(
      this.getRandomPropertyVariant(OUTLINE_WIDTH_VARIANTS, OUTLINE_WIDTH_VARIANT_COUNTS)
    )
    this.colorPalette = <ColorPaletteVariant>this.getRandomPropertyVariant(COLOR_PALETTE_VARIANTS)

    this.fillColors = []
    this.outlineColors = []
    let colorsListCopy = [...this.colorPalette.value]
    let fillColorsCount = <PropertyVariantCount>(
      this.handleProbabilityList(FILL_COLOR_VARIANT_COUNTS)
    )
    let outlineColorsCount = <PropertyVariantCount>(
      this.handleProbabilityList(OUTLINE_COLOR_VARIANT_COUNTS)
    )
    for (let i = 0; i < fillColorsCount.value + outlineColorsCount.value; i++) {
      let randomIndex = Math.round(this.p5.random(0, colorsListCopy.length - 1))

      if (i < fillColorsCount.value) {
        this.fillColors.push(colorsListCopy[randomIndex])
      } else {
        this.outlineColors.push(colorsListCopy[randomIndex])
      }
      colorsListCopy.splice(randomIndex, 1)
    }

    this.scaleOffsets = []
    let scaleOffsetCountVariant = <PropertyVariantCount>(
      this.handleProbabilityList(SCALE_OFFSET_VARIANT_COUNTS)
    )
    for (let i = 0; i < scaleOffsetCountVariant.value; i++) {
      this.scaleOffsets.push(this.p5.random(MIN_SCALE_OFFSET, MAX_SCALE_OFFSET))
    }
  }

  private getRandomPropertyVariant(
    variantList: PropertyVariant[],
    propertyVariantCountProbabilityList?: PropertyVariantCount[]
  ): PropertyVariant | PropertyVariant[] | undefined {
    if (propertyVariantCountProbabilityList) {
      let variantListCopy = [...variantList]
      let selectedVariants: PropertyVariant[] = []
      let variantCount = <PropertyVariantCount>(
        this.handleProbabilityList(propertyVariantCountProbabilityList)
      )

      for (let i = 0; i < variantCount.value; i++) {
        let selectedItem = this.handleProbabilityList(variantListCopy)
        if (selectedItem) {
          selectedVariants.push(selectedItem)
        }

        variantListCopy.splice(
          variantListCopy.findIndex((item) => {
            return item === selectedItem
          }),
          1
        )
      }

      return selectedVariants
    } else {
      return this.handleProbabilityList(variantList)
    }
  }

  private handleProbabilityList(list: PropertyVariant[]): PropertyVariant | undefined {
    let totalProbability = list.reduce((accumulator, item) => {
      return accumulator + item.probability
    }, 0)

    let random = this.p5.random(0, totalProbability)
    let traveledProbability = 0
    return list.find((item) => {
      if (random >= traveledProbability && random <= traveledProbability + item.probability) {
        return true
      } else {
        traveledProbability += item.probability
        return false
      }
    })
  }
}
