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
    barrels: Phaser.Group;
    winners: WinnerName;

    preload() {
        this.game.load.image('platform', 'src/img/platform.png');
        this.game.load.spritesheet('kong', 'src/img/kong.png', 48, 34);
        this.game.load.image('barrel', 'src/img/barrel.png');
        this.game.load.spritesheet('mario', 'src/img/mario.png', 34, 28);
        this.game.load.bitmapFont('winnerFont', 'src/img/desyrel.png', 'src/img/desyrel.xml');
    }

    create() {
        this.platform = new Platform(this.game);

        this.kong = new Kong(this.game, this.platform.kongRowHeight);
        this.game.add.existing(this.kong);

        this.winnerCount = new WinnerCount(this.game, this.platform.gameRowHeights.length);
        this.game.add.existing(this.winnerCount);

        this.mario = new Mario(this.game, this.platform.gameRowHeights);
        this.game.add.existing(this.mario);

        this.game.physics.startSystem(Phaser.Physics.P2JS);
        this.game.physics.p2.setImpactEvents(true);

        this.spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        this.winners = new WinnerName(576, this.game, 'chaussures louboutin bleu chaussures louboutin bleu');
        this.game.add.existing(this.winners);

        this.barrels = new Barrels(this.game, this.platform.gameRowHeights, this.mario);
    }

    update() {
        this.game.debug.spriteInfo(<Phaser.Sprite>this.mario, 32, 32);
        this.game.physics.arcade.collide(this.kong, this.platform);
        this.game.physics.arcade.collide(this.mario, this.platform);
        this.game.physics.arcade.collide(this.barrels, this.platform);
        this.game.physics.arcade.collide(this.mario, this.barrels, col, null, null);
        this.winnerCount.CheckKeys();

        this.mario.update();

        if (this.spaceKey.justDown) {
            this.mario.StartSmash();
        }
    }
}

function col(marrio: Phaser.Sprite, barrels: Phaser.Sprite ):void {
    console.log(barrels);
    barrels.destroy();
}

window.onload = () => {
    var stageWidth = $('#stage').width();
    var game = new WinnerPicker(stageWidth);
};