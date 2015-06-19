///<reference path="../../tools/typings/tsd.d.ts" />
///<reference path="../../tools/typings/typescriptApp.d.ts" />

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

class Platform extends Phaser.Sprite
{
    constructor(game: Phaser.Game)
    {
        super(game, 1, 2, "")
        {
                    
        }
    }
}