import Phaser from 'phaser'

export default class extends Phaser.Sprite {
  constructor({ game, x, y, asset }) {
    super(game, x, y, asset)
    this.anchor.setTo(0.5)
  }

  fire() {
    game.physics.arcade.accelerationFromRotation(this.rotation, 200, this.body.acceleration);
  }

  update() {

  }
}
