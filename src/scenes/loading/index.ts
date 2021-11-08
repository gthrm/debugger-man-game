import { Scene } from 'phaser'

export class LoadingScene extends Scene {
  constructor () {
    super('loading-scene')
  }

  preload (): void {
    this.load.baseURL = 'assets/'

    this.load.image({
      key: 'DARK-Tileset',
      url: 'tileset/DARK-Tileset.png'
    })
    this.load.tilemapTiledJSON('DARK-Tileset', 'tileset/level1-map.json')

    this.load.atlas('Torch', 'animated-objects/Torch/TorchMap.png', 'animated-objects/Torch/TorchMap.json')
    this.load.atlas('HellBotDark', 'sprites/hell-bot-dark/HellBotDark.png', 'sprites/hell-bot-dark/HellBotDark.json')
  }

  create (): void {
    console.log('Loading scene was created')
    this.scene.start('level-1-scene')
  }
}
