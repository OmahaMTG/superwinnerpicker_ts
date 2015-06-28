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
    winnerCount : WinnerCount;
    mario: Mario;
    spaceKey: Phaser.Key;

    preload() {
        this.game.load.image('platform', 'src/img/platform.png');
        this.game.load.spritesheet('kong', 'src/img/kong.png', 48, 34);
        this.game.load.image('barrel', 'src/img/barrel.png');
        this.game.load.spritesheet('mario', 'src/img/mario.png', 34, 28);
    }

    create() {
        this.platform = new Platform(this.game);
        this.kong = new Kong(this.game, this.platform.kongRowHeight);
        this.game.add.existing(this.kong);

        this.winnerCount = new WinnerCount(this.game, this.platform.gameRowHeights.length);
        this.game.add.existing(this.winnerCount);

        console.log('adding marrio : ');
        console.log(this.game);
        this.mario = new Mario(this.game, this.platform.gameRowHeights);
        this.game.add.existing(this.mario);

        this.spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    }

    update() {
        this.game.physics.arcade.collide(this.kong, this.platform);
        this.game.physics.arcade.collide(this.mario, this.platform);
        this.winnerCount.CheckKeys();

        this.mario.update();

        if (this.spaceKey.justDown) {
            this.mario.StartSmash();
        }

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