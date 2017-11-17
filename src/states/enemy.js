import Phaser from 'phaser'

export default class Enemy {
    constructor(game, asset) {
        this.game = game;

        this.enemiesLeft = 2;
        this.minVelocityX = 10;
        this.minVelocityY = 0;
        this.maxVelocityX = 50;
        this.maxVelocityY = 0;

        this.enemies = this.game.add.group();
        this.enemies.enableBody = true;
        this.enemies.physicsBodyType = Phaser.Physics.ARCADE;
        this.enemies.createMultiple(5, asset);

        this.enemies.callAll('animations.add', 'animations', 'default', [0, 1], 2, true);
        this.enemies.callAll('play', null, 'default');

        this.enemies.setAll('anchor.x', 0.5);
        this.enemies.setAll('anchor.y', 0.5);
        this.enemies.setAll('angle', 0);
        this.enemies.setAll('outOfBoundsKill', true);
        this.enemies.setAll('checkWorldBounds', true);

        //  An explosion pool
        this.explosions = game.add.group();
        this.explosions.createMultiple(20, 'kaboom');
        this.explosions.forEach(this.setupEnemy, this);

        //this.enemies.setAll('animations.add', 'kaboom');
    }

    advanceLevel() {
        this.enemiesLeft = 10;
    }

    setupEnemy(enemy) {
        enemy.anchor.x = 0.5;
        enemy.anchor.y = 0.5;
        enemy.animations.add('kaboom');
    }

    sendAnotherEnemy() {
        this.launch();

        var MIN_ENEMY_SPACING = 300;
        var MAX_ENEMY_SPACING = 3000;

        //  Send another enemy soon
        this.game.time.events.add(this.game.rnd.integerInRange(MIN_ENEMY_SPACING, MAX_ENEMY_SPACING), this.sendAnotherEnemy, this);
    }

    launch() {
        var ENEMY_SPEED = 300;

        var enemy = this.enemies.getFirstExists(false);
        if (enemy) {
            enemy.reset(50, game.rnd.integerInRange(100, game.height - 50));
            enemy.body.velocity.x = game.rnd.integerInRange(this.minVelocityX, this.maxVelocityX);
            enemy.body.velocity.y = game.rnd.integerInRange(this.minVelocityY, this.maxVelocityY);;
        }
    }

    destroy(enemy) {
        enemy.kill();
        this.enemiesLeft -= 1;
        //  And create an explosion :)
        var explosion = this.explosions.getFirstExists(false);
        explosion.reset(enemy.body.x, enemy.body.y);
        explosion.play('kaboom', 30, false, true);
    }
}