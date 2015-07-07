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
    winners: WinnerName[] = [];
    isRunning: boolean = false;
    winnerDraw: WinnerDraw;


    preload() {
        this.game.load.image('platform', 'src/img/platform.png');
        this.game.load.spritesheet('kong', 'src/img/kong.png', 48, 34);
        this.game.load.image('barrel', 'src/img/barrel.png');
        this.game.load.spritesheet('mario', 'src/img/mario.png', 34, 28);
        this.game.load.bitmapFont('winnerFont', 'src/img/font.png', 'src/img/font.fnt');
    }

    create() {
        this.winnerDraw = new WinnerDraw(212);
        this.platform = new Platform(this.game);

        this.kong = new Kong(this.game, this.platform.kongRowHeight);
        this.game.add.existing(this.kong);

        this.winnerCount = new WinnerCount(this.game, this.platform.gameRowHeights.length);
        this.game.add.existing(this.winnerCount);

        this.mario = new Mario(this.game);
        this.game.add.existing(this.mario);

        this.game.physics.startSystem(Phaser.Physics.P2JS);
        this.game.physics.p2.setImpactEvents(true);

        this.spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.winners = [];
    }

    update() {
        this.game.physics.arcade.collide(this.kong, this.platform);
        this.game.physics.arcade.collide(this.mario, this.platform);
        this.game.physics.arcade.collide(this.barrels, this.platform);
        this.game.physics.arcade.collide(this.mario, this.barrels, col, null, null);
        this.winnerCount.CheckKeys();

        this.mario.update();

        if (this.spaceKey.justDown) {
            if (this.isRunning) {
                return;
            }

            for (var i = 0; i < this.winners.length; i++) {
                this.game.world.remove(this.winners[i]);
            }
            this.winners = [];

            this.isRunning = true;
            var drawnWinners = this.winnerDraw.PickWinners(this.winnerCount.numberOfWinnersToGet);

            var heightsForBarrels = [];
            for (var i = 0; i < drawnWinners.length; i++) {
                this.winners.push(new WinnerName(this.platform.gameRowHeights[i], this.game, drawnWinners[i]));
                heightsForBarrels.push(this.platform.gameRowHeights[i]);
            }

            this.barrels = new Barrels(this.game, heightsForBarrels);

            this.mario.StartSmash(heightsForBarrels, () => {

                this.isRunning = false;
            });

        }
    }
}

function col(marrio: Phaser.Sprite, barrels: Phaser.Sprite ):void {
    barrels.destroy();
}

window.onload = () => {
    var stageWidth = $('#stage').width();
    var game = new WinnerPicker(stageWidth);
};