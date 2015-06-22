///<reference path="../../tools/typings/tsd.d.ts" />
///<reference path="../../tools/typings/typescriptApp.d.ts" />
class WinnerPicker {

    constructor(width: number ) {
        this.game = new Phaser.Game(width, 600, Phaser.AUTO, 'stage',
            { preload: this.preload, create: this.create, update: this.update});
    }

    game: Phaser.Game;
    platform : Platform;
    kong : Kong;

    preload() {
        this.game.load.image('platform', 'src/img/platform.png');
        this.game.load.spritesheet('kong', 'src/img//kong.png', 48, 34);
    }

    create() {
        this.platform = new Platform(this.game);
        this.kong = new Kong(this.game, this.platform.kongRowHeight);
        this.game.add.existing(this.kong);
    }

    update() {
        this.game.physics.arcade.collide(this.kong, this.platform);
       // this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
    }
}


window.onload = () => {
    var stageWidth = $('#stage').width();
    // var game = new SimpleGame(stageWidth, () => {
    //     alert('done'); 
    //     console.log(game.platform)
    // });
    var game = new WinnerPicker(stageWidth);




};