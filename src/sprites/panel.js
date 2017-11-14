import Phaser from 'phaser'

export default class extends Phaser.Sprite {
  constructor({ game, x, y, asset }) {
    super(game, x, y, asset);
    this.anchor.setTo(0.5);

    this.tweenA = this.game.add.tween(this).to({ x: this.game.world.centerX }, 500, "Quart.easeOut");
    this.tweenB = this.game.add.tween(this).to({ x: -256 }, 500, "Quart.easeIn");

    this.tweenA.chain(this.tweenB);
  }

  start() {
    this.tweenA.start();
  }

  update() {

  }
}
