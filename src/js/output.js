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
// 
// class Platform {
// 
//     constructor(game: Phaser.Game) {
//         
//     }
// 
//     game: Phaser.Game;
//     
// 
//     preload() {
//         this.game.load.image('logo', 'phaser2.png');
//     }
// 
//     create() {
//         var logo = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
//         logo.anchor.setTo(0.5, 0.5);
//     }
// 
// }
var Platform = (function (_super) {
    __extends(Platform, _super);
    function Platform(game) {
        _super.call(this, game, 1, 2, "");
        {
        }
    }
    return Platform;
})(Phaser.Sprite);
///<reference path="../../tools/typings/tsd.d.ts" />
///<reference path="../../tools/typings/typescriptApp.d.ts" />
var SimpleGame = (function () {
    function SimpleGame() {
        this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'content', { preload: this.preload, create: this.create });
        this.platform = new Platform(this.game);
    }
    SimpleGame.prototype.preload = function () {
        this.game.load.image('platform', 'dist/img/platform.png');
    };
    SimpleGame.prototype.create = function () {
    };
    return SimpleGame;
})();
window.onload = function () {
    var game = new SimpleGame();
};

//# sourceMappingURL=output.js.map