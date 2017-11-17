import Phaser from 'phaser'
import Panel from '../sprites/panel'
import State from './Config.js';

export default class extends Phaser.State {
    init() { }

    preload() { }

    create() {
        var style = { font: "41px Arial", fill: "#fff", align: "center" };
        var text = game.add.text(game.world.centerX, game.world.centerY, State.CurrentGame.level, style);
        text.anchor.set(0.5);
        text.alpha = 0.1;

        var tween = game.add.tween(text).to({ alpha: 1 }, 500, "Linear", true);
        tween.onComplete.add(this.onComplete, this);

        // this.panel = new Panel({
        //     game: this.game,
        //     x: 1000,
        //     y: this.world.centerY,
        //     asset: 'panel'
        // });
        // this.game.add.existing(this.panel);
        // this.panel.start();
    }

    onComplete() {
        game.time.events.add(Phaser.Timer.SECOND * 1, function () {
            this.state.start('Game', true, false);
        }, this);
    }
}