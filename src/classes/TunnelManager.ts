import * as P5 from 'p5'
import {
  MultiPolygonShape,
  OutlineColorVariant,
  OutlineWidthVariant,
  PropertyVariant,
  PropertyVariantCount,
  Shape,
  ShapeVariant,
  SpeedVariant,
  Vertex,
} from '../interfaces'
import {
  FILL_COLOR_VARIANT_COUNTS,
  FILL_COLOR_VARIANTS,
  MAX_ANGLE_GAP,
  MAX_DOOR_NUMBER,
  MIN_ANGLE_GAP,
  MIN_DOOR_NUMBER,
  OUTLINE_COLOR_VARIANT_COUNTS,
  OUTLINE_COLOR_VARIANTS,
  OUTLINE_WIDTH_VARIANT_COUNTS,
  OUTLINE_WIDTH_VARIANTS,
  SHAPE_VARIANT_COUNTS,
  SHAPE_VARIANTS,
  SPEED_VARIANTS,
} from '../constants'

interface LayerItem {
  image?: P5.Image
  uvShape: MultiPolygonShape
  uvPosition: Vertex
}

interface Layer {
  items: LayerItem[]
}

export class TunnelManager {
  private graphics!: P5.Graphics

  private firstDoorIndex: number = 0
  private doorImages: P5.Image[] = []

  private readonly MIN_PROGRESS_RENDER = 0.04
  private readonly MIN_PROGRESS_FADE_IN = 0.04
  private readonly MAX_PROGRESS_FADE_IN = 0.05
  private readonly MIN_PROGRESS_FADE_OUT = 0.99
  private readonly MAX_PROGRESS_FADE_OUT = 1.00

  private readonly SHAPE_SCALE_COMPENSATION = 1
  private readonly BACKGROUND_SCALE_COMPENSATION = 2
  private readonly RENDER_SCALE_COMPENSATION = 1.5

  private doorNumber!: number
  private angleGap!: number
  private speed!: SpeedVariant
  private shapes!: ShapeVariant[]
  private outlineWidths!: OutlineWidthVariant[]
  private fillColors!: OutlineColorVariant[]
  private outlineColors!: OutlineColorVariant[]

  public constructor(p5: P5) {
    this.graphics = p5.createGraphics(p5.width * this.BACKGROUND_SCALE_COMPENSATION, p5.height * this.BACKGROUND_SCALE_COMPENSATION)

    this.generateProperties(p5)
    this.createImages(p5)
  }

  public refreshSize(p5: P5) {
    this.graphics = p5.createGraphics(p5.width * this.BACKGROUND_SCALE_COMPENSATION, p5.height * this.BACKGROUND_SCALE_COMPENSATION)
    this.doorImages.splice(0)
    this.createImages(p5)
  }

  public renderTunnel(p5: P5) {
    let framesPerDoor = Math.round(this.speed.value / this.doorNumber)
    if (p5.frameCount % framesPerDoor === 0) {
      this.firstDoorIndex += 1
      let newImage = this.createTunnelLayerImage(p5, this.firstDoorIndex)
      this.doorImages.splice(this.doorImages.length - 1, 1)
      this.doorImages.splice(0, 0, newImage)
    }

    let fillColor = this.fillColors[0].value
    p5.background(fillColor[0], fillColor[1], fillColor[2], fillColor[3])
    p5.imageMode(p5.CENTER)
    p5.translate(p5.width / 2, p5.height / 2)
    for (let i = 0; i < this.doorNumber; i++) {
      let gapSize = 1 / this.doorNumber
      let gapProgress = (p5.frameCount % framesPerDoor) / framesPerDoor
      let progress =
        (i % this.doorNumber) / this.doorNumber + gapSize * gapProgress
      let scale = progress * this.RENDER_SCALE_COMPENSATION

      if (progress > this.MIN_PROGRESS_RENDER) {
        if (progress > this.MIN_PROGRESS_FADE_IN && progress < this.MAX_PROGRESS_FADE_IN) {
          let tintProgress = (progress - this.MIN_PROGRESS_FADE_IN) / (this.MAX_PROGRESS_FADE_IN - this.MIN_PROGRESS_FADE_IN)

          p5.tint(255, tintProgress * 255)
          p5.scale(scale)
          p5.image(this.doorImages[i], 0, 0)
          p5.scale(1 / scale)
          p5.noTint()
        }
        else if (progress > this.MIN_PROGRESS_FADE_OUT && progress < this.MAX_PROGRESS_FADE_OUT) {
          let tintProgress = (progress - this.MIN_PROGRESS_FADE_OUT) / (this.MAX_PROGRESS_FADE_OUT - this.MIN_PROGRESS_FADE_OUT)

          p5.tint(255, (1 - tintProgress) * 255)
          p5.scale(scale)
          p5.image(this.doorImages[i], 0, 0)
          p5.scale(1 / scale)
          p5.noTint()
        }
        else {
          p5.scale(scale)
          p5.image(this.doorImages[i], 0, 0)
          p5.scale(1 / scale)
        }
      }

    }
  }

  private createImages(p5: P5) {
    if (this.doorImages.length < this.doorNumber) {
      for (let i = 0; i < this.doorNumber; i++) {
        let doorIndex = this.firstDoorIndex + i
        this.doorImages.push(this.createTunnelLayerImage(p5, doorIndex))
      }
    }
  }

  private createTunnelLayerImage(p5: P5, doorIndex: number) {
    let angle = doorIndex * this.angleGap
    let shape = this.shapes[doorIndex % this.shapes.length].value
    let fillColor = this.fillColors[doorIndex % this.fillColors.length].value
    let outlineColor =
      this.outlineColors[doorIndex % this.outlineColors.length].value
    let outlineWidth =
      this.outlineWidths[doorIndex % this.outlineWidths.length].value * p5.width

    this.graphics.background(...fillColor)
    this.graphics.erase()
    this.graphics.fill(255, 255, 255, 255)
    this.graphics.strokeWeight(outlineWidth)
    this.graphics.stroke(...outlineColor)
    this.drawTunnelShape(p5, shape, angle, this.graphics)
    this.graphics.noErase()
    this.graphics.fill(0, 0, 0, 0)
    this.drawTunnelShape(p5, shape, angle, this.graphics)

    let image = p5.createImage(this.graphics.width, this.graphics.height)
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

  private drawTunnelShape(p5: P5, shape: Shape, angle: number, graphics?: P5.Graphics) {
    switch (shape) {
      case Shape.SQUARE:
        this.drawSquare(p5, angle, graphics)
        break
      case Shape.TRIANGLE:
        this.drawTriangle(p5, angle, graphics)
    }
  }

  private drawSquare(p5: P5, angle: number, graphics?: P5.Graphics) {
    let target = graphics || p5
    target.angleMode(p5.DEGREES)
    target.rectMode(p5.CENTER)
    target.translate(target.width / 2, target.height / 2)
    target.scale(this.SHAPE_SCALE_COMPENSATION)
    target.rotate(angle)
    target.rect(0, 0, p5.width, p5.width)
    target.rotate(-angle)
    target.scale(1 / this.SHAPE_SCALE_COMPENSATION)
    target.translate(-target.width / 2, -target.height / 2)
  }

  private drawTriangle(p5: P5, angle: number, graphics?: P5.Graphics) {
    let target = graphics || p5

    let len = p5.width / 2
    let triV1x=0
    let triV1y=-len
    let triV2x=len
    let triV2y=len
    let triV3x=-len
    let triV3y=len
    target.angleMode(p5.DEGREES)
    target.translate(target.width / 2, target.height / 2)
    target.scale(this.SHAPE_SCALE_COMPENSATION)
    target.rotate(angle)
    target.beginShape(p5.TRIANGLES)
    target.vertex(triV1x,triV1y)
    target.vertex(triV2x,triV2y)
    target.vertex(triV3x,triV3y)
    target.endShape()
    target.rotate(-angle)
    target.scale(1 / this.SHAPE_SCALE_COMPENSATION)
    target.translate(-target.width / 2, -target.height / 2)
  }

  private generateProperties(p5: P5) {
    this.doorNumber = Math.round(p5.random(MIN_DOOR_NUMBER, MAX_DOOR_NUMBER))
    this.angleGap = Math.round(p5.random(MIN_ANGLE_GAP, MAX_ANGLE_GAP))
    this.speed = <SpeedVariant>this.getRandomPropertyVariant(p5, SPEED_VARIANTS)
    this.shapes = <ShapeVariant[]>this.getRandomPropertyVariant(p5, SHAPE_VARIANTS, SHAPE_VARIANT_COUNTS)
    this.outlineWidths = <OutlineWidthVariant[]>this.getRandomPropertyVariant(p5, OUTLINE_WIDTH_VARIANTS, OUTLINE_WIDTH_VARIANT_COUNTS)
    this.fillColors = <OutlineColorVariant[]>this.getRandomPropertyVariant(p5, FILL_COLOR_VARIANTS, FILL_COLOR_VARIANT_COUNTS)
    this.outlineColors = <OutlineColorVariant[]>this.getRandomPropertyVariant(p5, OUTLINE_COLOR_VARIANTS, OUTLINE_COLOR_VARIANT_COUNTS)
  }

  private getRandomPropertyVariant(
    p5: P5,
    variantList: PropertyVariant[],
    propertyVariantCountProbabilityList?: PropertyVariantCount[]
  ): PropertyVariant | PropertyVariant[] | undefined {
    if (propertyVariantCountProbabilityList) {
      let variantListCopy = [...variantList]
      let selectedVariants: PropertyVariant[] = []
      let variantCount = <PropertyVariantCount>this.handleProbabilityList(p5, propertyVariantCountProbabilityList)

      for (let i = 0; i < variantCount.value; i++) {
        let selectedItem: PropertyVariant = this.handleProbabilityList(p5, variantListCopy)
        selectedVariants.push(selectedItem)

        variantListCopy.splice(variantListCopy.findIndex((item) => {return item === selectedItem}),1)
      }

    return selectedVariants
    } else {
      return this.handleProbabilityList(p5, variantList)
    }
  },

  private handleProbabilityList(p5: P5, list: PropertyVariant[]): PropertyVariant | undefined {
    let totalProbability = list.reduce((accumulator, item) => {
      return accumulator + item.probability
    }, 0)

    let random = p5.random(0, totalProbability)
    let traveledProbability = 0
    return list.find((item) => {
      if (
        random >= traveledProbability &&
        random <= traveledProbability + item.probability
      ) {
        return true
      } else {
        traveledProbability += item.probability
        return false
      }
    })
  }
}
