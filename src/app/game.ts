///<reference path="../../tools/typings/tsd.d.ts" />
///<reference path="../../tools/typings/typescriptApp.d.ts" />

class SimpleGame {

    constructor() {
        this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'content', { preload: this.preload, create: this.create });
        this.platform = new Platform(this.game);
    }

    game: Phaser.Game;
    platform : Platform;

    preload() {
        this.game.load.image('platform', 'dist/img/platform.png');
    }

    create() {

    }

}

window.onload = () => {

    var game = new SimpleGame();

};