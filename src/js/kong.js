///<reference path="../../tools/typings/tsd.d.ts" />
///<reference path="../../tools/typings/typescriptApp.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Kong = (function (_super) {
    __extends(Kong, _super);
    function Kong(game, kongRowHeight) {
        _super.call(this, game, 125, kongRowHeight - (34 * 3), 'kong');
        this.scale.set(3, 3);
        this.game.physics.arcade.enableBody(this);
        this.game.physics.arcade.enable;
        this.arcadeBody = this.body;
        this.arcadeBody.collideWorldBounds = true;
        this.arcadeBody.gravity.y = 300;
        this.animations.add('wait', [2, 3], 1, true);
        this.animations.add('angry', [0, 1], 2, true);
        this.animations.play('wait', null, true);
    }
    return Kong;
})(Phaser.Sprite);
///<reference path="../../tools/typings/tsd.d.ts" />
///<reference path="../../tools/typings/typescriptApp.d.ts" />
var Platform = (function (_super) {
    __extends(Platform, _super);
    function Platform(game) {
        _super.call(this, game);
        this.platformHeight = 24;
        this.spaceBetweenPlatforms = 120;
        this.kongPlatformSpace = 200;
        this.gameRowHeights = [];
        this.rowHeightOffset = this.game.height - this.platformHeight;
        this.enableBody = true;
        this.createMainPlaforms();
        this.createKongPlatform();
    }
    Platform.prototype.calculateTotalRows = function () {
        return Math.floor((this.game.height - this.platformHeight - this.kongPlatformSpace) / this.spaceBetweenPlatforms);
    };
    Platform.prototype.calculateTotalColumns = function () {
        return this.game.width / (15 * 3);
    };
    Platform.prototype.createMainPlaforms = function () {
        console.log('adding %s platform Rows', this.calculateTotalRows());
        for (var row = 0; row < this.calculateTotalRows(); row++) {
            for (var column = 0; column < this.calculateTotalColumns(); column++) {
                var ground = this.create(column * (15 * 3), this.rowHeightOffset, 'platform');
                ground.scale.setTo(3, 3);
                ground.body.immovable = true;
            }
            this.gameRowHeights.push(this.rowHeightOffset);
            this.rowHeightOffset -= this.spaceBetweenPlatforms;
        }
    };
    Platform.prototype.createKongPlatform = function () {
        for (var column = 0; column < 6; column++) {
            var ground = this.create(column * (15 * 3), this.rowHeightOffset, 'platform');
            ground.scale.setTo(3, 3);
            ground.body.immovable = true;
        }
        console.log('setting kongRowHeight to %s', this.rowHeightOffset);
        this.kongRowHeight = this.rowHeightOffset;
    };
    return Platform;
})(Phaser.Group);
///<reference path="../../tools/typings/tsd.d.ts" />
///<reference path="../../tools/typings/typescriptApp.d.ts" />
var WinnerPicker = (function () {
    function WinnerPicker(width) {
        this.game = new Phaser.Game(width, 600, Phaser.AUTO, 'stage', { preload: this.preload, create: this.create, update: this.update });
    }
    WinnerPicker.prototype.preload = function () {
        this.game.load.image('platform', 'src/img/platform.png');
        this.game.load.spritesheet('kong', 'src/img//kong.png', 48, 34);
    };
    WinnerPicker.prototype.create = function () {
        this.platform = new Platform(this.game);
        this.kong = new Kong(this.game, this.platform.kongRowHeight);
        this.game.add.existing(this.kong);
    };
    WinnerPicker.prototype.update = function () {
        this.game.physics.arcade.collide(this.kong, this.platform);
        // this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
    };
    return WinnerPicker;
})();
window.onload = function () {
    var stageWidth = $('#stage').width();
    // var game = new SimpleGame(stageWidth, () => {
    //     alert('done'); 
    //     console.log(game.platform)
    // });
    var game = new WinnerPicker(stageWidth);
};

//# sourceMappingURL=kong.js.map