var Customer = (function () {
    function Customer(name) {
        this.name = name;
    }
    Customer.prototype.getName = function () {
        return this.name;
    };
    return Customer;
})();
var c = new Customer('bob');
c.getName();
///<reference path="../../tools/typings/tsd.d.ts" />
///<reference path="../../tools/typings/typescriptApp.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Platform = (function (_super) {
    __extends(Platform, _super);
    function Platform(game) {
        _super.call(this, game);
        this.platformHeight = 24;
        this.spaceBetweenPlatforms = 120;
        this.kongPlatformSpace = 200;
        this.rowHeightOffset = this.game.height - this.platformHeight;
        this.enableBody = true;
        this.createMainPlaforms();
        this.createKongPlatform();
    }
    Platform.prototype.calculateTotalRows = function () {
        return (this.game.height - this.platformHeight - this.kongPlatformSpace) / this.spaceBetweenPlatforms;
    };
    Platform.prototype.calculateTotalColumns = function () {
        return this.game.width / (15 * 3);
    };
    Platform.prototype.createMainPlaforms = function () {
        console.log('adding platform Rows : ' + this.calculateTotalRows());
        for (var row = 0; row < this.calculateTotalRows(); row++) {
            for (var column = 0; column < this.calculateTotalColumns(); column++) {
                var ground = this.create(column * (15 * 3), this.rowHeightOffset, 'platform');
                ground.scale.setTo(3, 3);
                ground.body.immovable = true;
            }
            this.rowHeightOffset -= this.spaceBetweenPlatforms;
        }
    };
    Platform.prototype.createKongPlatform = function () {
        for (var column = 0; column < 6; column++) {
            var ground = this.create(column * (15 * 3), this.rowHeightOffset, 'platform');
            ground.scale.setTo(3, 3);
            ground.body.immovable = true;
        }
    };
    return Platform;
})(Phaser.Group);
///<reference path="../../tools/typings/tsd.d.ts" />
///<reference path="../../tools/typings/typescriptApp.d.ts" />
var SimpleGame = (function () {
    function SimpleGame() {
        this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'stage', { preload: this.preload, create: this.create });
    }
    SimpleGame.prototype.preload = function () {
        this.game.load.image('platform', 'src/img/platform.png');
    };
    SimpleGame.prototype.create = function () {
        this.platform = new Platform(this.game);
    };
    return SimpleGame;
})();
window.onload = function () {
    var game = new SimpleGame();
};

//# sourceMappingURL=kong.js.map