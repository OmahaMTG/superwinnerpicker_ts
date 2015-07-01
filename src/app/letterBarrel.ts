///<reference path="../../tools/typings/tsd.d.ts" />
///<reference path="../../tools/typings/typescriptApp.d.ts" />

class Barrels extends Phaser.Group{
	
	    constructor(game: Phaser.Game, platformHeights: number[], mario: Mario) {
        	super(game);
			
			platformHeights.forEach(x => {
				for (var column = 0; column < 25; column++) {
	                var barrel = this.create(column * (10 * 2.5) + 100,  x - 40, 'barrel');
					game.physics.arcade.enable(barrel);
					barrel.body.bounce.y = 0.1;
	    barrel.body.gravity.y = 100;
	    barrel.body.collideWorldBounds = true
	  				this.game.physics.arcade.enableBody(barrel);
					  barrel.scale.setTo(2.5, 2.5);
	            }
			})
		}
}