import { GameObjects, Physics, Scene } from 'phaser'
import { IGameObjectAnims } from '../initialization'

export class AnimatedObject extends Physics.Arcade.Sprite {
  public light!: GameObjects.Light;
  private animsObjects!: IGameObjectAnims[] | undefined;

  constructor (
    scene: Scene,
    x: number,
    y: number,
    texture: string,
    animsObjects?: IGameObjectAnims[],
    frame?: string | number
  ) {
    super(scene, x, y, texture, frame)
    scene.add.existing(this)
    this.initLight()
    this.animsObjects = animsObjects
    this.initAnimations()
  }

  public getBody (): Physics.Arcade.Body {
    return this.body as Physics.Arcade.Body
  }

  private initLight () {
    this.light = this.scene.lights.addLight(this.x, this.y, this.height * 2)
    this.light.color.set(176, 81, 223)
    this.light.setIntensity(0.01)
  }

  public initAnimations (): void {
    if (this.animsObjects) {
      this.animsObjects.forEach(({ key, framesName, prefix, end, frameRate }) => {
        this.scene.anims.create({
          key,
          frames: this.scene.anims.generateFrameNames(framesName, {
            prefix,
            end
          }),
          frameRate
        })
      })
    }
  }

  public runDefaultAnim (): void {
    const defaultAnims = this.animsObjects?.filter((anim) => anim.default)
    defaultAnims?.forEach((anim) => {
      !this.anims.isPlaying && this.anims.play(anim.key, true)
    })
  }

  public handleLight (): void {
    this.light.x = this.x
    this.light.y = this.y
  }

  public update () {
    super.update()
    this.handleLight()
    this.runDefaultAnim()
  }

  public destroy () {
    super.destroy()
    this.light.setIntensity(0)
  }
}
