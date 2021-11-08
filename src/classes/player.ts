import { Input, Scene } from 'phaser'
import { EVENTS_NAME, GAME_STATUS } from 'src/consts'
import { IGameObjectAnims } from 'src/initialization'
import { Actor } from './actor'
import { Text } from './text'

export class Player extends Actor {
  private keyW: Input.Keyboard.Key;
  private keyA: Input.Keyboard.Key;
  private keyS: Input.Keyboard.Key;
  private keyD: Input.Keyboard.Key;
  private keySpace: Input.Keyboard.Key;
  private hpValue: Text;

  constructor (
    scene: Scene,
    x: number,
    y: number,
    texture: string,
    animsObjects?: IGameObjectAnims[]
  ) {
    super(scene, x, y, texture, animsObjects)

    // KEYS
    this.keyW = this.scene.input.keyboard.addKey('W')
    this.keyA = this.scene.input.keyboard.addKey('A')
    this.keyS = this.scene.input.keyboard.addKey('S')
    this.keyD = this.scene.input.keyboard.addKey('D')
    this.keySpace = this.scene.input.keyboard.addKey(32)

    this.hpValue = new Text(
      this.scene,
      this.x,
      this.y - this.height * 0.4,
      this.hp.toString()
    )
      .setFontSize(12)
      .setOrigin(0.5, 0.5)
      .setDepth(1)
    // PHYSICS
    this.getBody().setSize(15, 28).setOffset(10, 8)
    this.setOrigin(0.25, 0.5)
    this.initAnimations()
    this.light.color.set(25, 160, 251)
  }

  public getDamage (value?: number): void {
    super.getDamage(value)
    this.hpValue.setText(this.hp.toString())
    if (this.hp <= 0) {
      this.scene.game.events.emit(EVENTS_NAME.gameEnd, GAME_STATUS.LOSE)
    }
  }

  public getHealth (value?: number): void {
    super.getHealth(value)
    this.hpValue.setText(this.hp.toString())
  }

  checkFlip (): void {
    super.checkFlip()
    if (this.body.velocity.x < 0) {
      this.getBody().setOffset(25, 8)
    } else {
      this.getBody().setOffset(10, 8)
    }
  }

  run (): void {
    this.anims.play('run', true)
  }

  move (): void {
    this.getBody().setVelocity(0)
    if (this.keySpace.isDown) {
      this.anims.play('attack', true)
      this.scene.game.events.emit(EVENTS_NAME.attack)
    } else if (this.keyA.isDown) {
      this.run()
      this.body.velocity.x = -110
      this.checkFlip()
    } else if (this.keyD.isDown) {
      this.run()
      this.body.velocity.x = 110
      this.checkFlip()
    } else {
      this.anims.play('idle', true)
    }
  }

  update (): void {
    super.update()
    this.move()
    this.hpValue.setPosition(this.x, this.y - this.height * 0.4)
    this.hpValue.setOrigin(0.5, 0.5)
  }
}
