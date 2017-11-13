import Phaser from 'phaser'
import Turret from '../sprites/turret'

export default class extends Phaser.Sprite {
  constructor({ game, x, y, asset }) {
    super(game, x, y, asset);
    this.anchor.setTo(0.5);

    this.hp = 100;

    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.drag.set(300);
    this.body.maxVelocity.set(200);
    this.body.immovable = false;

    this.turret = new Turret({
      game: this.game,
      x: 10,
      asset: 'turret'
    });

    //  Our ships bullets
    this.weapon = game.add.weapon(40, 'ball');
    //  The bullets will be automatically killed when they are 2000ms old
    this.weapon.bulletKillType = Phaser.Weapon.KILL_LIFESPAN;
    this.weapon.bulletLifespan = 2000;
    this.weapon.fireRate = 10; // One bullet every one second

    //  The speed at which the bullet is fired
    this.weapon.bulletSpeed = 600;
    this.weapon.trackSprite(this.turret, 0, 0, true);
    //this.weapon.bulletCollideWorldBounds = true;

    this.weapon.bullets.setAll('body.bounce.x', 1);
    this.weapon.bullets.setAll('body.bounce.y', 1);

    this.addChild(this.turret);

    this.chain = game.add.tileSprite(this.centerX, (12 * 4), 8, game.height - (18 * 4), 'chain');
    this.chain.anchor.setTo(0.5, 0);
    // game.input.keyboard.onUpCallback = (function (e) {
    //   if (e.keyCode == Phaser.Keyboard.UP) {
    //     this.chain.stopScroll();
    //   }
    // }).bind(this);
  }

  doDamage(damage) {
    this.hp -= damage;
  }

  fire() {
    this.weapon.fire();
  }

  update() {
    // Move ship up and down
    if (game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
      this.body.velocity.y = -100;
      this.chain.tilePosition.y = this.body.y;
    }
    if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
      this.body.velocity.y = 100;
      this.chain.tilePosition.y = this.body.y;
    }

    // Move turret
    if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
      if (this.turret.angle < -80)
        this.turret.angle = -80;
      else
        this.turret.angle -= 0.5;
    }

    if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
      if (this.turret.angle > 80)
        this.turret.angle = 80;
      else
        this.turret.angle += 0.5;
    }
  }
}
