import Phaser from 'phaser'

export default class extends Phaser.State {
    init(levelData) {
        this.levelData = levelData;
    }

    preload() {

    }

    create() {
        var style = { font: "41px Arial", fill: "#fff", align: "center" };
        var text = game.add.text(game.world.centerX, game.world.centerY, this.levelData.level, style);
        text.anchor.set(0.5);
        text.alpha = 0.1;

        var tween = game.add.tween(text).to({ alpha: 1 }, 500, "Linear", true);
        tween.onComplete.add(this.onComplete, this);
    }

    onComplete() {
        game.time.events.add(Phaser.Timer.SECOND * 1, function () {
            this.state.start('Game', true, false, this.levelData);
        }, this);
    }
}