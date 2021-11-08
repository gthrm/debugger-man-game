import { Display, Scene, Tilemaps } from 'phaser'
import { Player } from '../../classes/player'
import { AnimatedObject } from '../../classes/animated-object'
import { animatedObjects } from '../../initialization'

export class Level1 extends Scene {
  private objects!: AnimatedObject[];
  private map!: Tilemaps.Tilemap;
  private tileset!: Tilemaps.Tileset;
  private wallsLayer!: Tilemaps.TilemapLayer;
  private viewsLayer!: Tilemaps.TilemapLayer;
  private player!: Player;

  constructor () {
    super('level-1-scene')
    this.objects = []
  }

  private initMap () {
    this.map = this.make.tilemap({
      key: 'DARK-Tileset',
      tileWidth: 16,
      tileHeight: 16
    })
    this.tileset = this.map.addTilesetImage('DARK-Tileset', 'DARK-Tileset')
    this.wallsLayer = this.map
      .createLayer('Walls', this.tileset, 0, 0)
      .setPipeline('Light2D')
    this.viewsLayer = this.map
      .createLayer('Views', this.tileset, 0, 0)
      .setPipeline('Light2D')
    this.wallsLayer.setCollisionByProperty({ collides: true })
    this.lights.enable().setAmbientColor(0x555555)
    this.physics.world.setBounds(
      0,
      0,
      this.wallsLayer.width,
      this.wallsLayer.height
    )
    // this.showDebugWalls()
  }

  private showDebugWalls (): void {
    const debugGraphics = this.add.graphics().setAlpha(0.7)
    this.wallsLayer.renderDebug(debugGraphics, {
      tileColor: null,
      collidingTileColor: new Display.Color(243, 234, 48, 255)
    })
  }

  private initAnimatedObjects () {
    animatedObjects.forEach((obj) => {
      if (obj.type === 'ANIMATED_OBJECTS') {
        this.map.findObject('Torch', (playerMapObj: any) => {
          const newAnimatedObjects = new AnimatedObject(
            this,
            playerMapObj.x,
            playerMapObj.y,
            obj.name,
            obj.anims
          )
          newAnimatedObjects.light.color.set(235, 75, 67)
          newAnimatedObjects.light.setRadius(newAnimatedObjects.width * 2.8)
          newAnimatedObjects.light.setIntensity(0.03)
          this.objects.push(newAnimatedObjects)
        })
      }

      // if (obj.type === 'SPRITES') {

      // }

      if (obj.type === 'PLAYER') {
        this.map.findObject('Player', (playerMapObj: any) => {
          this.player = new Player(
            this,
            playerMapObj.x,
            playerMapObj.y - playerMapObj.height * 0.4,
            obj.name,
            obj.anims
          )
        })
      }
    })
  }

  private initCamera (): void {
    const { main: mainCamera } = this.cameras
    mainCamera.setZoom(3)
    mainCamera.startFollow(this.player, true, 0.09, 0.09)
    mainCamera.setViewport(0, 0, this.scale.width, this.scale.height)
    mainCamera.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels)
  }

  create (): void {
    console.log('level-1 scene was created')

    this.initMap()
    this.initAnimatedObjects()
    this.initCamera()
    this.physics.add.collider(this.player, this.wallsLayer)
  }

  update () {
    this.player.update()
    this.objects.forEach((animatedObject) => {
      animatedObject.update()
    })
  }
}
