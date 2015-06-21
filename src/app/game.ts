///<reference path="../../tools/typings/tsd.d.ts" />
///<reference path="../../tools/typings/typescriptApp.d.ts" />

class SimpleGame {

    constructor() {
        this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'stage', { preload: this.preload, create: this.create });
    }

    game: Phaser.Game;
    platform : Platform;

    preload() {
        this.game.load.image('platform', 'src/img/platform.png');
    }

    create() {
        this.platform = new Platform(this.game);
    }

}

window.onload = () => {

    var game = new SimpleGame();

};