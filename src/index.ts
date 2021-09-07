import * as P5 from 'p5'

import { COLOR_BACKGROUND, FRAME_RATE } from './constants'
import { TunnelManager } from './classes/TunnelManager'

import './style.css'

let tunnelManager: TunnelManager
const sketch = (p5: P5) => {
  p5.setup = () => {
    let dimension = Math.min(p5.windowWidth, p5.windowHeight)
    p5.createCanvas(dimension, dimension)
    p5.frameRate(FRAME_RATE)

    tunnelManager = new TunnelManager(p5)
  }

  p5.windowResized = () => {
    let dimension = Math.min(1000, Math.min(p5.windowWidth, p5.windowHeight))
    p5.createCanvas(dimension, dimension)

    tunnelManager.refreshSize()
  }

  p5.draw = () => {
    tunnelManager.drawTunnel()
  }
}

new P5(sketch)
