import { Scale, Types, AUTO } from 'phaser'

import { LoadingScene, Level1 } from '../scenes'
import { isProd } from '../utils'

export const gameConfig: Types.Core.GameConfig = {
  title: 'Debugger Man',
  type: AUTO,
  parent: 'game',
  banner: !isProd,
  backgroundColor: '#000000',
  scale: {
    mode: Scale.ScaleModes.NONE,
    width: 800,
    height: 600
  },
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
      gravity: {
        x: 0,
        y: 100
      }
    }
  },
  render: {
    antialiasGL: false,
    pixelArt: true
  },
  canvasStyle: 'display: block; height: 100%;',
  autoFocus: true,
  audio: {
    disableWebAudio: false
  },
  scene: [LoadingScene, Level1]
}
