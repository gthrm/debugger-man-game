type GameObjType = 'ANIMATED_OBJECTS' | 'SPRITES' | 'PLAYER';

export interface IGameObjectAnims {
  key: string;
  framesName: string;
  prefix: string;
  end: number;
  frameRate: number;
  default?: boolean;
}

export interface IAnimationObject {
  name: string;
  type: GameObjType;
  anims: IGameObjectAnims[];
}

export const animatedObjects: IAnimationObject[] = [
  {
    type: 'ANIMATED_OBJECTS',
    name: 'Torch',
    anims: [
      {
        key: 'burn',
        framesName: 'Torch',
        prefix: 'burn-',
        end: 5,
        frameRate: 8,
        default: true
      }
    ]
  },
  {
    type: 'PLAYER',
    name: 'HellBotDark',
    anims: [
      {
        key: 'run',
        framesName: 'HellBotDark',
        prefix: 'run-',
        end: 6,
        frameRate: 12
      },
      {
        key: 'attack',
        framesName: 'HellBotDark',
        prefix: 'attack-',
        end: 5,
        frameRate: 15
      },
      {
        key: 'idle',
        framesName: 'HellBotDark',
        prefix: 'idle-',
        end: 5,
        frameRate: 8
      },
      {
        key: 'hit',
        framesName: 'HellBotDark',
        prefix: 'hit-',
        end: 1,
        frameRate: 8
      },
      {
        key: 'schoot',
        framesName: 'HellBotDark',
        prefix: 'schoot-',
        end: 5,
        frameRate: 8
      },
      {
        key: 'death',
        framesName: 'HellBotDark',
        prefix: 'death-',
        end: 10,
        frameRate: 8
      }
    ]
  }
]
