import Phaser from 'phaser'
import { centerGameObjects } from '../utils'

export default class extends Phaser.State {
  init() { }

  preload() {
    this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg')
    this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar')
    centerGameObjects([this.loaderBg, this.loaderBar])

    this.load.setPreloadSprite(this.loaderBar)
    //
    // load your assets
    //
    this.load.image('ship', 'assets/images/ship.png');
    this.load.image('turret', 'assets/images/turret.png');
    this.load.image('bullet', 'assets/images/bullet.png');
    this.load.image('ball', 'assets/images/ball.png');
    this.load.image('empty', 'assets/images/empty.png');
    this.load.image('enemy', 'assets/images/enemy.png');
    this.load.image('smoke-puff', 'assets/images/smoke-puff.png');
    this.load.spritesheet('kaboom', 'assets/images/explode.png', 128, 128);
    this.load.image('chain', 'assets/images/chain_link.png');
    this.load.spritesheet('falafla', 'assets/images/falafla.png', 32, 32);
    this.load.spritesheet('oculus', 'assets/images/oculus.png', 32, 32);
    this.load.spritesheet('spacehorse', 'assets/images/spacehorse.png', 32, 32);
    this.load.image('panel', 'assets/images/panel.png');
  }

  create() {
    this.state.start('Game')
  }
}
