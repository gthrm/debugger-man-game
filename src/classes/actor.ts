import { Scene } from 'phaser'
import { IGameObjectAnims } from 'src/initialization'
import { AnimatedObject } from './animated-object'

const INITIAL_HP = 100

export class Actor extends AnimatedObject {
  protected hp = INITIAL_HP;

  constructor (
    scene: Scene,
    x: number,
    y: number,
    texture: string,
    animsObjects?: IGameObjectAnims[],
    frame?: string | number
  ) {
    super(scene, x, y, texture, animsObjects, frame)
    scene.physics.add.existing(this)
    this.getBody().setCollideWorldBounds(true)
  }

  public getDamage (value?: number): void {
    this.scene.tweens.add({
      targets: this,
      duration: 100,
      repeat: 3,
      yoyo: true,
      alpha: 0.5,
      onStart: () => {
        if (value) {
          this.hp = this.hp - value
        }
      },
      onComplete: () => {
        this.setAlpha(1)
      }
    })
  }

  public getHealth (value?: number): void {
    if (value && this.hp < INITIAL_HP) {
      this.hp = this.hp + value
    }
  }

  public getHPValue (): number {
    return this.hp
  }

  protected checkFlip (): void {
    if (this.body.velocity.x < 0) {
      this.scaleX = -1
    } else {
      this.scaleX = 1
    }
  }
}
