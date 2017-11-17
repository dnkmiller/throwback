/* globals __DEV__ */
import Phaser from 'phaser';
import Ship from '../sprites/ship';
import Enemy from './enemy';
import State from './Config.js';

export default class extends Phaser.State {
  init() { }

  preload() { }

  create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);


    this.ship = new Ship({
      game: this.game,
      x: this.world.centerX + 100,
      y: this.world.centerY,
      asset: 'ship'
    });

    this.style = { font: "24px Arial", fill: "#ffffff", align: "center" };

    this.scoreText = game.add.text(10, 10, "Score: " + State.CurrentGame.score, this.style);
    this.levelText = game.add.text(250, 10, "Level: " + State.CurrentGame.level, this.style);
    this.hpText = game.add.text(450, 10, "HP: " + this.ship.hp, this.style);

    this.game.add.existing(this.ship);

    this.createBoundaryWalls();

    // keep the spacebar from propogating up to the browser
    this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);

    // add keyboard controls
    var fireKey = this.input.keyboard.addKey(Phaser.Keyboard.Z);
    fireKey.onDown.add(() => {
      this.ship.fire();
    });

    this.enemies = new Enemy(this.game, 'falafla');
    this.enemies.sendAnotherEnemy();

    this.enemies2 = new Enemy(this.game, 'oculus');
    this.enemies2.sendAnotherEnemy();

    this.enemies3 = new Enemy(this.game, 'spacehorse');
    this.enemies3.sendAnotherEnemy();

    //this.game.paused = true;

  }

  createBoundaryWalls() {
    this.wallTop = game.add.tileSprite((8 * 4), (12 * 4), game.width - (16 * 4), 8, 'empty');
    this.wallRight = game.add.tileSprite(game.width - (8 * 4), (12 * 4), 8, game.height - (18 * 4), 'empty');
    this.wallBottom = game.add.tileSprite((8 * 4), game.height - (8 * 4), game.width - (16 * 4), 8, 'empty');

    game.physics.enable([this.wallTop, this.wallRight, this.wallBottom], Phaser.Physics.ARCADE);

    this.wallTop.body.immovable = true;
    this.wallTop.body.moves = false;
    this.wallTop.body.allowGravity = false;

    this.wallRight.body.immovable = true;
    this.wallRight.body.allowGravity = false;

    this.wallBottom.body.immovable = true;
    this.wallBottom.body.allowGravity = false;
  }

  hitEnemy(bullet, enemy) {
    this.enemies.destroy(enemy);
    bullet.kill();

    State.CurrentGame.score += 10;
    this.scoreText.setText("Score: " + State.CurrentGame.score);
  }

  shipBulletHitShip(ship, bullet) {
    ship.doDamage(10);
    this.hpText.setText("HP: " + this.ship.hp);
  }

  enemyHitShip(ship, enemy) {
    game.camera.shake(0.008, 200);
    ship.doDamage(20);
    this.enemies.destroy(enemy);
    this.hpText.setText("HP: " + this.ship.hp);
  }

  advanceLevel() {
    State.CurrentGame.level++;
    this.enemies.advanceLevel();

    var l = "Level: " + State.CurrentGame.level;
    this.levelText.setText(l);

    this.state.start('NextLevel', true, false);
  }

  update() {
    game.physics.arcade.collide(this.ship, this.wallTop);
    game.physics.arcade.collide(this.ship, this.wallBottom);

    game.physics.arcade.collide(this.ship.weapon.bullets, this.wallTop);
    game.physics.arcade.collide(this.ship.weapon.bullets, this.wallRight);
    game.physics.arcade.collide(this.ship.weapon.bullets, this.wallBottom);

    this.ship.body.immovable = true;
    game.physics.arcade.collide(this.ship.weapon.bullets, this.ship, this.shipBulletHitShip, null, this);
    this.ship.body.immovable = false;

    game.physics.arcade.overlap(this.ship.weapon.bullets, this.enemies.enemies, this.hitEnemy, null, this);
    game.physics.arcade.overlap(this.ship.weapon.bullets, this.enemies2.enemies, this.hitEnemy, null, this);
    game.physics.arcade.overlap(this.ship.weapon.bullets, this.enemies3.enemies, this.hitEnemy, null, this);

    game.physics.arcade.collide(this.ship, this.enemies.enemies, this.enemyHitShip, null, this);

    this.ship.update();

    if (this.enemies.enemiesLeft == 0) {
      this.advanceLevel();
    }
  }

  render() {
    if (__DEV__) {
      //this.game.debug.bodyInfo(this.b, 32, 32);
    }
  }
}
