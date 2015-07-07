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
var Barrels = (function (_super) {
    __extends(Barrels, _super);
    function Barrels(game, platformHeights) {
        var _this = this;
        _super.call(this, game);
        this.game = game;
        platformHeights.forEach(function (x) {
            console.log(_this.calculateNumberOfBarrels());
            for (var column = 0; column < _this.calculateNumberOfBarrels(); column++) {
                var barrel = _this.create(column * (14 * 2.5) + 200, x - 40, 'barrel');
                game.physics.arcade.enable(barrel);
                barrel.body.bounce.y = 0.1;
                barrel.body.gravity.y = 100;
                barrel.body.collideWorldBounds = true;
                _this.game.physics.arcade.enableBody(barrel);
                barrel.scale.setTo(2.5, 2.5);
            }
        });
    }
    Barrels.prototype.calculateNumberOfBarrels = function () {
        return (this.game.width - 400) / (14 * 2.5);
    };
    return Barrels;
})(Phaser.Group);
///<reference path="../../tools/typings/tsd.d.ts" />
///<reference path="../../tools/typings/typescriptApp.d.ts" />
var Mario = (function (_super) {
    __extends(Mario, _super);
    function Mario(game) {
        _super.call(this, game, 50, game.height - 80, 'mario');
        this.game = game;
        this.scale.set(3, 3);
        this.game.physics.arcade.enableBody(this);
        this.body.setSize(34, 28, -30, 0);
        this.game.physics.arcade.enable;
        this.arcadeBody = this.body;
        this.arcadeBody.gravity.y = 300;
        this.animations.add('hammer', [5, 7, 6, 8], 8, true);
        this.animations.add('ready', [5], 8, true);
        this.animations.play('ready', 8, true);
        this.anchor.setTo(.5, .5);
        this.scale.x *= -1;
        this.isSmashing = false;
        this.checkWorldBounds = true;
        this.events.onOutOfBounds.add(this.ReachedEndOfPlatform, this);
    }
    Mario.prototype.StartSmash = function (platformHeights, reachedEnd) {
        this.reachedEnd = reachedEnd;
        this.platformHights = platformHeights;
        if (this.isSmashing) {
            return;
        }
        this.isSmashing = true;
        this.animations.play('hammer', 8, true);
    };
    Mario.prototype.update = function () {
        if (!this.isSmashing) {
            return;
        }
        this.body.velocity.x = 250;
    };
    Mario.prototype.ReachedEndOfPlatform = function () {
        var nextRowHeight = this.getNextRowHeight(this.y) - 50;
        console.log('Next Row Height: ' + nextRowHeight + ' this.y:' + this.y);
        if (nextRowHeight + 8 >= this.y) {
            console.log('resetting');
            this.resetMario();
        }
        else {
            this.x = 1;
            this.y = nextRowHeight;
        }
    };
    Mario.prototype.resetMario = function () {
        this.y = this.game.height - 80;
        this.x = 50;
        this.isSmashing = false;
        this.reachedEnd();
        this.animations.play('ready', 8, true);
        this.body.velocity.x = 0;
    };
    Mario.prototype.getNextRowHeight = function (currentHeight) {
        for (var j = 0; j < this.platformHights.length; j++) {
            if (currentHeight > this.platformHights[j]) {
                return this.platformHights[j];
            }
        }
        return this.platformHights[0];
    };
    return Mario;
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
var WinnerCount = (function (_super) {
    __extends(WinnerCount, _super);
    function WinnerCount(game, maxWinners) {
        this.helpText = 'Up/Down to chose number of Winners. \n  Space to draw Winners. \n # of Winners to draw = ';
        var locationY = 10;
        var locationX = game.width - 300;
        _super.call(this, game, locationX, locationY, this.helpText + '01', { font: '15px Arial', fill: '#ffffff', align: 'right' });
        this.numberOfWinnersToGet = 1;
        this.UpdateNumber(0);
        this.maxWinners = maxWinners;
        this.upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
        this.downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    }
    WinnerCount.prototype.UpdateNumber = function (updateAmount) {
        var newNumberOfWinnersToGet = this.numberOfWinnersToGet + updateAmount;
        if (newNumberOfWinnersToGet <= this.maxWinners && newNumberOfWinnersToGet >= 1) {
            this.numberOfWinnersToGet = newNumberOfWinnersToGet;
            if (this.numberOfWinnersToGet <= 9) {
                this.text = this.helpText + '0' + this.numberOfWinnersToGet.toString();
            }
            else {
                this.text = this.helpText + this.numberOfWinnersToGet.toString();
            }
        }
    };
    WinnerCount.prototype.CheckKeys = function () {
        if (this.upKey.justDown) {
            this.UpdateNumber(1);
        }
        else if (this.downKey.justDown) {
            this.UpdateNumber(-1);
        }
    };
    return WinnerCount;
})(Phaser.Text);
///<reference path="../../tools/typings/tsd.d.ts" />
///<reference path="../../tools/typings/typescriptApp.d.ts" />
//gets random winners.  And Saves users that have already been drawn.
var WinnerDraw = (function () {
    function WinnerDraw(eventId) {
        var _this = this;
        this.eventId = eventId;
        this.ajaxSuccess = function (data) {
            _this.rsvpUsers = _this.shuffle(data);
        };
        $.ajax({
            url: 'http://www.omahamtg.com/Admin/WinnerPicker/GetRsvps?eventid=212',
            dataType: 'jsonp',
            async: false,
            success: this.ajaxSuccess
        });
    }
    WinnerDraw.prototype.PickWinners = function (numberToPick) {
        var results = this.rsvpUsers.slice(0, numberToPick);
        this.rsvpUsers.splice(0, numberToPick);
        return results;
    };
    WinnerDraw.prototype.shuffle = function (o) {
        for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x) {
        }
        ;
        return o;
    };
    return WinnerDraw;
})();
///<reference path="../../tools/typings/tsd.d.ts" />
///<reference path="../../tools/typings/typescriptApp.d.ts" />
var WinnerName = (function (_super) {
    __extends(WinnerName, _super);
    function WinnerName(platformHeight, game, winnerName) {
        _super.call(this, game, game.width / 2, platformHeight - 45, 'winnerFont', winnerName, 40);
        this.x = (game.width / 2) - this.width / 2;
        console.log(this.z);
        game.add.existing(this);
    }
    return WinnerName;
})(Phaser.BitmapText);
///<reference path="../../tools/typings/tsd.d.ts" />
///<reference path="../../tools/typings/typescriptApp.d.ts" />
var WinnerPicker = (function () {
    function WinnerPicker(width) {
        this.winners = [];
        this.isRunning = false;
        this.game = new Phaser.Game(width, 600, Phaser.AUTO, 'stage', { preload: this.preload, create: this.create, update: this.update });
    }
    WinnerPicker.prototype.preload = function () {
        this.game.load.image('platform', 'src/img/platform.png');
        this.game.load.spritesheet('kong', 'src/img/kong.png', 48, 34);
        this.game.load.image('barrel', 'src/img/barrel.png');
        this.game.load.spritesheet('mario', 'src/img/mario.png', 34, 28);
        this.game.load.bitmapFont('winnerFont', 'src/img/font.png', 'src/img/font.fnt');
    };
    WinnerPicker.prototype.create = function () {
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
    };
    WinnerPicker.prototype.update = function () {
        var _this = this;
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
            this.mario.StartSmash(heightsForBarrels, function () {
                _this.isRunning = false;
            });
        }
    };
    return WinnerPicker;
})();
function col(marrio, barrels) {
    barrels.destroy();
}
window.onload = function () {
    var stageWidth = $('#stage').width();
    var game = new WinnerPicker(stageWidth);
};

//# sourceMappingURL=kong.js.map