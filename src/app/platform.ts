///<reference path="../../tools/typings/tsd.d.ts" />
///<reference path="../../tools/typings/typescriptApp.d.ts" />

class Platform extends Phaser.Group{
    private platformHeight = 24;
    private spaceBetweenPlatforms = 120;
    private kongPlatformSpace = 200;
    private rowHeightOffset: number;

    calculateTotalRows() : number {
        return (this.game.height - this.platformHeight - this.kongPlatformSpace) / this.spaceBetweenPlatforms;
    }

    calculateTotalColumns() : number {
        return  this.game.width / (15 * 3);
    }

    constructor(game: Phaser.Game) {
        super(game);
        this.rowHeightOffset =  this.game.height - this.platformHeight;
        this.enableBody = true;
        this.createMainPlaforms();
        this.createKongPlatform();
    }

    createMainPlaforms() {
             console.log('adding platform Rows : ' + this.calculateTotalRows());
            for (var row = 0; row < this.calculateTotalRows(); row++) {

                for (var column = 0; column < this.calculateTotalColumns(); column++) {
                    var ground = this.create(column * (15 * 3),  this.rowHeightOffset, 'platform');
                    ground.scale.setTo(3, 3);
                    ground.body.immovable = true;
                }
                this.rowHeightOffset -= this.spaceBetweenPlatforms;
            }
    }

    createKongPlatform() {
        for (var column = 0; column < 6; column++) {
            var ground = this.create(column * (15 * 3), this.rowHeightOffset, 'platform');
            ground.scale.setTo(3, 3);
            ground.body.immovable = true;
        }
    }
}